# Web GIS & Картография во Frontend MOC

> [!info] Карта знаний (Map of Content)
> Полная база знаний по веб-картографии, Web GIS, тайлингу, пространственным вычислениям и WebGL/GPU рендерингу для Frontend-инженеров.

---

## 00. Навигация и мета
- [[Карта компетенций Web GIS]]
- [[Глоссарий терминов и сокращений]]

## 01. Геодезия и картографический фундамент
- [[Системы координат и проекции (WGS84 vs Web Mercator)]]
- [[Искажения проекций и почему северные страны кажутся гигантскими]]
- [[Тайловая сетка (XYZ, TMS, Quadkeys) и понятие Zoom Levels]]

## 02. Форматы геоданных и протоколы
- [[Векторные форматы (GeoJSON, TopoJSON, FlatGeobuf)]]
- [[Векторные тайлы MVT (Mapbox Vector Tiles, Protocol Buffers)]]
- [[Растровые тайлы и COG (Cloud Optimized GeoTIFF)]]
- [[OGC-стандарты (WMS, WMTS, WFS, WCS)]]

## 03. Источники данных, тайлинг и хостинг
- [[OpenStreetMap (OSM) — модель данных (Nodes, Ways, Relations, Tags)]]
- [[Генераторы тайлов (Planetiler, Tilemaker, Tippecanoe)]]
- [[Современный Serverless стек (PMTiles + HTTP Range Requests + Cloudflare R2)]]
- [[Self-hosted серверы тайлов (Martin, TileServer GL, Tegola)]]
- [[Коммерческие провайдеры (Mapbox, MapTiler, Stadia, Jawg, Carto)]]

## 04. Клиентские движки и рендеринг
- [[Сравнение и выбор движка (Leaflet vs MapLibre vs OpenLayers vs Deck.gl)]]
- [[MapLibre GL JS — архитектура, WebGL-пайплайн и жизненный цикл карты]]
- [[Leaflet — когда классический DOM и Canvas все еще лучший выбор]]
- [[OpenLayers — швейцарский нож для сложных корпоративных ГИС]]
- [[Интеграция с React, Vue, Svelte (управление инстансом и памятью)]]

## 05. Картографический дизайн и стилизация
- [[Mapbox Style Specification — анатомия стиля (Sources, Layers, Expressions)]]
- [[Дехламминг и визуальная иерархия (как сделать карту дорогой)]]
- [[Палитры, типографика, Text Halo и адаптивные фильтры по зумам]]
- [[Визуальные редакторы стилей (Maputnik, Mapbox Studio)]]
- [[Динамическая тема (Dark Light mode, смена стиля без перезагрузки тайлов)]]

## 06. Слои данных, геометрия и вычисления
- [[Клиентские гео-вычисления с Turf.js (буферы, пересечения, расстояния)]]
- [[Кластеризация больших объемов точек (Supercluster, K-D trees)]]
- [[Пространственные индексы (RBush, Flatbush, R-Tree)]]
- [[Редактирование геометрии пользователем (Draw tools, snapping, валидация)]]

## 07. Big Data, 3D и визуализация
- [[Deck.gl и Luma.gl — визуализация миллионов точек через GPU]]
- [[3D-рельеф (Terrain-RGB, DEM-тайлы, Hillshade)]]
- [[3D-здания и экструзия (Fill-extrusion, 3D Tiles, CesiumJS)]]
- [[Анимация треков, изохроны и тепловые карты (Heatmaps)]]

## 08. Геосервисы (Routing, Geocoding, Search)
- [[Геокодинг и автокомплит адресов (Nominatim, Photon, Pelias)]]
- [[Маршрутизация и графы дорог (OSRM, Valhalla, GraphHopper)]]
- [[Обратное геокодирование и определение полигона под курсором]]

## 09. Производительность, кэширование и оффлайн
- [[Оффлайн-карты (Service Worker, Cache API, IndexedDB)]]
- [[Профилирование WebGL (утечки контекста, Canvas Memory Leak)]]
- [[Оптимизация сетевых запросов тайлов и префетчинг]]

## 10. Архитектурные паттерны и Production
- [[Архитектура изоляции карты от UI-фреймворка (Adapter Bridge)]]
- [[Доступность (A11y) интерактивных карт]]
- [[Чеклист безопасности (API-ключи, Rate Limiting, Referrer Restrictions)]]
