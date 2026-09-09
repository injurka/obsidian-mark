# Архитектура изоляции карты от UI-фреймворка (Adapter Bridge)

> [!info] Навигация
> Родительский раздел: [[Web GIS MOC]]

## Что это такое и какую боль решает

В большинстве проектов интеграция карты начинается просто: в React или Vue компоненте импортируется `maplibregl` или `L`, и прямо в обработчиках кликов пишется логика:
```typescript
// ❌ ГРУБАЯ СВЯЗАННОСТЬ (TIGHT COUPLING):
map.on('click', (e) => {
  dispatch(setSelectedOrder(e.features[0].properties.id));
  map.setPaintProperty('route', 'line-color', '#ff0000');
});
```

Через год приложение разрастается до 50 компонентов, взаимодействующих с картой (боковые панели заказов, фильтры водителей, графики, модалки).

И тут бизнес говорит:
1. *"Мы переходим с коммерческого Mapbox на бесплатный MapLibre + PMTiles"* — или наоборот: *"Для заказчика в РФ нужна интеграция с Яндекс.Картами"*.
2. *"Нужно написать Unit и E2E тесты на бизнес-логику без поднятия реального WebGL-холста в CI"*.

Если карта размазана по коду UI, переезд занимает месяцы мучительного переписывания.
Решение — **Архитектурный паттерн Map Adapter / Bridge (Гексагональная архитектура / Порты и Адаптеры)**.

```mermaid
flowchart TD
    subgraph UI["UI Слой (React / Vue / Redux / Pinia)"]
        Sidebar["Sidebar заказов"]
        SearchInput["Инпут поиска адреса"]
        FilterPanel["Фильтр курьеров"]
    end

    subgraph Domain["Доменный интерфейс (Порт)"]
        IMapService["<<Interface>> IMapService<br/>• setCenter(coords)<br/>• setMarkers(data)<br/>• highlightZone(id)<br/>• onMarkerClick(cb)"]
    end

    subgraph Adapters["Конкретные реализации (Адаптеры)"]
        MapLibreAdapter["MapLibreGLAdapter (WebGL)"]
        LeafletAdapter["LeafletAdapter (DOM)"]
        MockAdapter["MockMapAdapter (Для Jest / Vitest тестов)"]
    end

    UI --> IMapService
    IMapService <|.. MapLibreAdapter
    IMapService <|.. LeafletAdapter
    IMapService <|.. MockAdapter
```

---

## 1. Проектирование доменного порта (`IMapService`)

Интерфейс формулируется в терминах **бизнес-задач приложения**, а не низкоуровневых слоев и шейдеров:

```typescript
export interface GeoCoordinate {
  lon: number;
  lat: number;
}

export interface MapMarkerItem {
  id: string;
  coords: GeoCoordinate;
  title: string;
  category: 'store' | 'courier' | 'warehouse';
}

export interface IMapService {
  init(container: HTMLElement): Promise<void>;
  destroy(): void;
  flyTo(coords: GeoCoordinate, zoom?: number): void;
  setMarkers(items: MapMarkerItem[]): void;
  highlightZone(polygonCoords: GeoCoordinate[]): void;
  onMarkerSelected(callback: (id: string) => void): () => void; // Возвращает функцию отписки
}
```

---

## 2. Реализация адаптера для MapLibre GL JS

Адаптер инкапсулирует все грязные детали работы с WebGL, `addSource`, `addLayer` и спецификацией стилей:

```typescript
import maplibregl, { Map } from 'maplibre-gl';
import { IMapService, GeoCoordinate, MapMarkerItem } from './IMapService';

export class MapLibreAdapter implements IMapService {
  private map: Map | null = null;
  private markerClickListeners: ((id: string) => void)[] = [];

  constructor(private readonly styleUrl: string) {}

  public async init(container: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      this.map = new maplibregl.Map({
        container,
        style: this.styleUrl,
        center: [37.61, 55.75],
        zoom: 11
      });

      this.map.on('style.load', () => {
        this.setupLayers();
        resolve();
      });

      this.map.on('click', 'business-markers', (e) => {
        if (!e.features?.length) return;
        const id = e.features[0].properties.id;
        this.markerClickListeners.forEach(cb => cb(id));
      });
    });
  }

  private setupLayers(): void {
    if (!this.map) return;
    this.map.addSource('markers-source', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] }
    });

    this.map.addLayer({
      id: 'business-markers',
      type: 'circle',
      source: 'markers-source',
      paint: {
        'circle-radius': 8,
        'circle-color': '#2563eb'
      }
    });
  }

  public setMarkers(items: MapMarkerItem[]): void {
    const geojson: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: items.map(item => ({
        type: 'Feature',
        id: item.id,
        geometry: {
          type: 'Point',
          coordinates: [item.coords.lon, item.coords.lat]
        },
        properties: { id: item.id, title: item.title, category: item.category }
      }))
    };

    const src = this.map?.getSource('markers-source') as maplibregl.GeoJSONSource;
    src?.setData(geojson);
  }

  public flyTo(coords: GeoCoordinate, zoom = 14): void {
    this.map?.flyTo({ center: [coords.lon, coords.lat], zoom, speed: 1.2 });
  }

  public highlightZone(coords: GeoCoordinate[]): void {
    // Внутренняя реализация полигона в терминах MapLibre
  }

  public onMarkerSelected(callback: (id: string) => void): () => void {
    this.markerClickListeners.push(callback);
    return () => {
      this.markerClickListeners = this.markerClickListeners.filter(cb => cb !== callback);
    };
  }

  public destroy(): void {
    this.map?.remove();
    this.map = null;
    this.markerClickListeners = [];
  }
}
```

---

## Профит для архитектуры

1. **Мгновенное тестирование:** В Unit-тестах компонентов вместо тяжелого WebGL передается `MockMapAdapter`, где все методы — простые шпионы `vitest.fn()`.
2. **Свобода замены движка:** Переезд с MapLibre на Leaflet или Яндекс.Карты требует написания всего одного нового файла-адаптера `YandexMapAdapter.ts`. Ни один UI-компонент или стор не меняется ни на строчку.
3. **Строгая типизация:** Кодовая база приложения оперирует чистыми интерфейсами TypeScript, избавляясь от специфических типов сторонних SDK.
