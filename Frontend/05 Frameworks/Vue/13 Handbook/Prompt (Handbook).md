```md
＃＃ 角色 ：
Vue/Nuxt 前端开发专家

＃＃ 背景 ：
作为一个在 js/ts 和 Nuxt 方面有多年经验的人。作为一名有js/ts开发经验的前端工程师，熟悉最新的前端架构和最佳实践。我了解 SPA（单页应用程序）和 SSR（服务器端渲染）的优点和实现技术，并可以根据项目要求提出最合适的解决方案。

## 偏好设置：
我更喜欢使用 Vue 和 Nuxt。 js 生态系统中最新的工具和技术，例如用于状态管理的 Pinia、用于导航的 Vue Router 和用于打字的 TypeScipt。我还对逐步改进和提高代码质量特别感兴趣。我使用 setup 和 lang="ts" 编写 SFC 组件。 SFC 块的顺序如下：脚本 -> 模板 -> 样式。

＃＃ 轮廓 ：
-语言：俄语
-描述：为Vue/Nuxt提供专业的咨询和技术支持，帮助开发者高效地使用和应用该技术。

## 目标：
提高 Web 应用程序的性能和可用性。帮助开发人员了解 Vue 生态系统并应用最佳实践。帮助解决复杂的技术问题并加快开发进程

＃＃ 限制 ：
仅适用于 Vue 和 Nuxt，还提供与 JavaScipt 和 TypeScript 相关的信息和技术支持。
及时了解最新动态，并确保所提供的信息基于最新的技术和实践。
不要引用vue-cli、webpack等过时技术的使用。

## 技能：
精通 Vue 3.x、Nuxt 3.x 和 TypeScript。
深入了解Vue的内部工作原理。
熟悉Vite构建器的设置和优化。
能够解释和推荐现代界面架构设计，以及高质量的代码重构

## 示例：
- 为在 Nuxt 项目中集成和设置 Pinia 商店提供建议
-分享如何使用Composition API来提高代码重用
-如何正确安排模型的打字（TypeScript）。

## 输出格式：
首先，了解用户当前面临的问题或设计需求。其次，根据我的经验提供定制的建议或解决方案。最后，如果有需要我可以提供相关的代码示例。
你应该用俄语回答。

## 初始化：
作为 Vue/Nuxt 前端开发专家，我随时准备帮助您应对各种前端开发挑战，请告诉我您的项目需求或具体问题，我将尽力提供帮助。

```

---

## ui-kit

Я занимаюсь переносом комопнентов из проекта в ui-kit и его структура выглядит следующим образом:
```
...
├── index.ts
└── p-info-banner-picture
    ├── index.ts
    ├── p-info-banner-picture.scss
    ├── p-info-banner-picture.tsx
    └── types
        └── index.ts
...
```
Описание  кода `p-info-banner-picture`
> p-info-banner-picture.scss
```
.p-info-banner-picture {
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  &-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-align: inherit;
  }
  &-image {
    margin-bottom: 24px;

    > img {
      max-width: 200px;
      max-height: 200px;
      width: 200px;
      height: 200px;
      object-fit: contain;
    }
  }
  &-title {
    font-family: 'Euclid Circular A';
    font-size: 28px;
    font-weight: 600;
    line-height: 32px;
    color: var(--fg-primary-color);
    text-align: inherit;
    margin-bottom: 16px;
  }
  &-body {
    font-family: 'Euclid Circular A';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--fg-secondary-color);
    text-align: inherit;
    margin-bottom: 16px;
  }
}
```
>p-info-banner-picture.tsx
```
// Utilities
import type { CSSProperties, PropType } from 'vue'
import type { IObjectInfoBannerPicture } from './types'
import { useRender } from '@mentalhealth/ui-kit/helpers'
import { computed, defineComponent } from 'vue'

// Styles
import './p-info-banner-picture.scss'

export const PInfoBannerPicture = defineComponent({
  name: 'PInfoBannerPicture',

  props: {
    object: {
      type: Object as PropType<IObjectInfoBannerPicture>,
      required: true,
    },
  },

  setup(props) {
    const { object } = props

    const styles = computed<CSSProperties>(() => ({
      ...object.textProps,
    }))

    useRender(() => (
      <div class="p-info-banner-picture" style={styles.value}>
        <div class="p-info-banner-picture-content">
          <div class="p-info-banner-picture-image">
            <img src={object.value} />
          </div>
          {object.title && (
            <p class="p-info-banner-picture-title" innerHTML={object.title} />
          )}
          {object.body && (
            <p class="p-info-banner-picture-body" innerHTML={object.body} />
          )}
        </div>
      </div>
    ))
  },
})

export type TPInfoBannerPicture = InstanceType<typeof PInfoBannerPicture>
```
> types/index.ts
```
import type { IMultipageContentObjectInfoBannerPicture } from '@mentalhealth/api/cms'
import type { PureMultpageObject } from '~/types/utils'

type IObjectInfoBannerPicture = PureMultpageObject<IMultipageContentObjectInfoBannerPicture>

export type { IObjectInfoBannerPicture }
```
Также есть story для примера использования:
> stories/p-info-banner-picture/p-info-banner-picture.stories.ts
```
import type { Meta, StoryObj } from '@storybook/vue3'
import { PViewWrapper } from '@mentalhealth/ui-kit'
import { PInfoBannerPicture } from '~/components/p-info-banner-picture/p-info-banner-picture'

interface InfoBannerPictureArgs {
  value: string
  title: string
  body: string
  textAlign: 'center' | 'left' | 'right'
}

const meta = {
  title: 'CMS/Info Banner Picture',
  component: PInfoBannerPicture,
  argTypes: {
    value: {
      control: 'text',
      description: 'Ссылка на картинку',
    },
    title: {
      control: 'text',
      description: 'Заголовок',
    },
    body: {
      control: 'text',
      description: 'Основной текст',
    },
    textAlign: {
      control: 'select',
      options: ['center', 'left', 'right'],
      description: 'Выравнивание текста',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Компонент \`PInfoBannerPicture\` используется для отображения баннера с изображением, заголовком и текстом.

У данной компоненты есть следующие свойства:
- \`value\` — ссылка на картинку.
- \`title\` — заголовок.
- \`body\` — основной текст.
- \`textProps\` — настройки стилей текста, такие как \`textAlign\`.
        `,
      },
    },
  },
} as Meta<InfoBannerPictureArgs>

export default meta
type Story = StoryObj<typeof meta>

function createObject(args: InfoBannerPictureArgs) {
  return {
    value: args.value,
    title: args.title,
    body: args.body,
    textProps: {
      textAlign: args.textAlign,
    },
  }
}

export const Default: Story = {
  args: {
    value: '/webview/file/rencms_skilllevel.png',
    title: 'Заголовок',
    body: 'Основной текст',
    textAlign: 'center',
  },
  render: args => ({
    components: { PInfoBannerPicture, PViewWrapper },
    setup() {
      return { args, createObject }
    },
    template: `
      <PViewWrapper>
        <PInfoBannerPicture :key="createObject(args)" :object="createObject(args)" />
      </PViewWrapper>
    `,
  }),
}
```
> stories/p-info-banner-picture/p-info-banner-picture.mdx
```
import { Meta, Title, Canvas, Description } from '@storybook/blocks';
import * as Stories from './p-info-banner-picture.stories';

<Meta of={Stories} title="Usage guide" />

<Title>Info Banner Picture Component</Title>
<Description of={Stories} />

```tsx
<script setup lang="ts">
import { PInfoBannerPicture } from '@mentalhealth/ui-kit-cms';
</script>

<template>
  <PInfoBannerPicture
    :object="{
      value: '/webview/file/rencms_skilllevel.png',
      title: 'Заголовок',
      body: 'Основной текст',
      textProps: {
        textAlign: 'center',
      },
    }"
  />
</template>
```

Хочу перенести компоненту `staticprogressbar.vue` по той логике что я описал выше:
```

```
