# Паттерн Extension Points (Точки расширения UI)

Когда приложение перерастает стандартную плагинную систему с «кнопкой в боковом меню», продукт неизбежно сталкивается с требованием внедрять пользовательскую логику прямо в сердце имеющихся экранов. Если плагин хочет добавить кастомный режим запоминания карточек в раздел словаря или встроить кнопку быстрой заметки в шапку ридера, жесткое кодирование условий вида `if (plugin.enabled)` разрушает архитектуру хост-приложения.

Паттерн **Extension Points (Точки расширения)** решает эту проблему за счет декупажа: ядро приложения декларирует именованные UI-слоты или точки внедрения, а зарегистрированные плагины динамически поставляют туда свои виджеты и обработчики, ничего не меняя в исходном коде хост-компонентов.

```mermaid
flowchart TD
    subgraph "Host Core View (e.g. DictionaryView.vue)"
        HV[Dictionary Header]
        EP["<ExtensionSlot position='dictionary:training-modes' />"]
        HV --> EP
    end

    subgraph "Plugin Manager Registry"
        PMR[Registry: Map<Position, Widget[]>]
    end

    subgraph "Dynamic Plugins"
        P1[Plugin A: Quizzi Widget] -- registers --> PMR
        P2[Plugin B: SpacedRep Widget] -- registers --> PMR
    end

    PMR -- "provides active widgets" --> EP
    EP -- "renders dynamic components" --> DynamicUI[Vue <component :is="widget.component" />]
```

## Как это работает на практике

Ядро приложения описывает контракты типов доступных позиций в реестре (`UIPosition`). При инициализации плагина ему передается контекст, содержащий метод `registerUIWidget(position, id, component, props)`.

Внутри Vue 3 UI-слот запрашивает динамические виджеты у центрального `pluginManager` и рендерит их с помощью мета-компонента `<component :is="...">`.

### Антипаттерн: Жесткая связность и прокидывание флагов

```vue
<!-- Антипаттерн: Хост-компонент знает про каждый плагин вручную -->
<script setup>
import CustomQuizMode from '@/plugins/quizzi/CustomQuizMode.vue';
import { usePluginStore } from '@/stores/plugins';

const pluginStore = usePluginStore();
</script>

<template>
  <div class="modes-grid">
    <div class="standard-mode">Карточки</div>
    <!-- Каждая новая фича плагина требует правки исходника View -->
    <CustomQuizMode v-if="pluginStore.isPluginActive('quizzi')" />
  </div>
</template>
```

### Как надо: Декларативные динамические UI-слоты

```typescript
// 1. Определение контракта точек расширения (packages/plugin-api)
export type UIPosition = 
  | 'dictionary:training-modes' 
  | 'reader:header-actions' 
  | 'settings:custom-tab';

export interface UIWidget {
  id: string;
  component: Component;
  props?: Record<string, any>;
}

// 2. Регистрация плагином своего UI при старте
export default definePlugin({
  setup(ctx) {
    ctx.registerUIWidget('dictionary:training-modes', 'quizzi-mode', QuizziModeWidget, {
      theme: 'dark'
    });
  }
});
```

```vue
<!-- 3. Декларативный рендеринг внутри хоста (DictionaryView.vue) -->
<script setup>
import { computed } from 'vue';
import { pluginManager } from '~/shared/plugins/plugin-manager';

const customTrainingModes = computed(() => 
  pluginManager.getWidgets('dictionary:training-modes')
);
</script>

<template>
  <div class="modes-grid">
    <div class="mode-card">Стандартный режим</div>
    
    <!-- Динамический рендеринг виджетов плагинов -->
    <component 
      v-for="widget in customTrainingModes" 
      :key="widget.id"
      :is="widget.component" 
      v-bind="widget.props"
    />
  </div>
</template>
```

## Неочевидные нюансы и границы применимости

1. **Протекание CSS и стилей:** Динамически отрендеренный компонент плагина может сломать верстку контейнера или переопределить глобальные CSS-классы хоста. Необходимы строгие правила инкапсуляции стилей (Scoped CSS, CSS Modules или Shadow DOM wrappers).
2. **Жизненный цикл и утечки памяти:** Если плагин выключается пользователем в рантайме, `pluginManager` обязан корректно размонтировать Vue-компоненты и очистить подписки на события. Иначе ссылочный граф отгруженного плагина останется в памяти браузера.
3. **Отсутствие строгого компилируемого Prop-contract:** При передачи `v-bind="widget.props"` хост-приложение не может гарантировать безопасность типов между пропсами, которые ждет компонент плагина, и объектом, переданным при регистрации.
4. **Когда не стоит использовать:** Если у вас монолитное продуктовое приложение с фиксированным набором экранов и единой продуктовой командой, внедрение Extension Points создаст избыточную абстракцию и затруднит сквозной поиск по кодовой базе (IDE «не увидит», где именно рендерится данный виджет).
