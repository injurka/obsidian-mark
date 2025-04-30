<script setup lang="ts">
import type MarkdownIt from 'markdown-it'
import ImageViewer from '@luohc92/vue3-image-viewer'
import { PageLoader } from '~/components/shared/page-loader'
import { useChangeTheme } from '~/shared/composables/change-theme'
import { createMarkdownRenderer } from '../lib'
import '@luohc92/vue3-image-viewer/dist/style.css'

interface Props {
  content: string
  imageBasePath: string
}

const props = defineProps<Props>()

const { theme } = useChangeTheme()

const renderedContent = ref<string>('')
const mdInstance = ref<MarkdownIt | null>(null)
const isLoading = ref<boolean>(true)
const currentImages = ref<string[]>([])

function getShikiTheme() {
  // const isCustom = 'catppuccin-mocha'

  switch (theme.value) {
    case ThemesVariant.Dark:
      return 'catppuccin-mocha'
    case ThemesVariant.Rainy:
      return 'catppuccin-macchiato'
    case ThemesVariant.Light:
      return 'catppuccin-latte'
    default:
      return 'catppuccin-frappe'
  }

  // return shikiTheme
}

function openImageViewer() {
  document.documentElement.style.overflow = 'hidden'
  ImageViewer({
    images: currentImages.value,
    showThumbnail: true,
    showDownload: true,
    handlePosition: 'bottom',
    onClose: () => {
      document.documentElement.style.overflow = 'auto'
    },
    maskBgColor: 'rgba(0,0,0,0.7)',
  })
}

watch(
  () => theme.value,
  async () => {
    mdInstance.value = await createMarkdownRenderer({
      imageBasePath: props.imageBasePath, 
      shikiTheme: getShikiTheme() 
    })
  },
)

watch(
  [() => props.content, mdInstance],
  ([newContent, md]) => {
    if (md && !isLoading.value) {
      renderedContent.value = md.render(newContent || '')
    }
    else if (!isLoading.value && !newContent) {
      renderedContent.value = ''
    }
  },
  { immediate: false },
)

onMounted(async () => {
  try {
    mdInstance.value = await createMarkdownRenderer({
      imageBasePath: props.imageBasePath,
      shikiTheme: getShikiTheme(),
    })
    if (mdInstance.value && props.content) {
      renderedContent.value = mdInstance.value.render(props.content)
    }

    nextTick(() => {
      const callouts = document.querySelectorAll('.callout')

      callouts.forEach((callout) => {
        const imagesInCallout = callout.querySelectorAll<HTMLImageElement>('.callout-content img')

        if (imagesInCallout.length > 0) {
          const imageUrls: string[] = Array.from(imagesInCallout).map(img => img.src)

          Array.from(imagesInCallout).forEach((img) => {
            img.addEventListener('click', (event) => {
              event.stopPropagation()
              const clickedImageUrl = (img as HTMLImageElement).src

              const reorderedImages = [
                clickedImageUrl,
                ...imageUrls.filter(url => url !== clickedImageUrl),
              ]

              currentImages.value = reorderedImages
              openImageViewer()
            })
            img.style.cursor = 'pointer'
          })
        }
      })
    })
  }
  catch (error) {
    console.error('Failed to create markdown renderer:', error)
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <PageLoader v-if="isLoading" />
  <div v-else class="markdown-body" v-html="renderedContent" />
</template>

<style lang="scss">
.markdown-body {
  padding: 0;
  background-color: transparent;
  color: var(--fg-primary-color);
  @include default-font();

  em {
    color: var(--fg-accent-color);
  }

  code:not(pre > code) {
    background-color: var(--bg-tertiary-color);
    padding: 0.2em 0.4em;
    margin: 10px 0;
    font-size: 1rem;
    border-radius: 3px;
    font-family: Roboto, 'Andale Mono', 'Ubuntu Mono', monospace;
  }

  pre:not(.shiki) > code {
    display: flex;
    margin: 10px 0;
    position: relative;
    background-color: var(--bg-secondary-color);
    padding-left: 4px;
    word-wrap: break-word;
    white-space: break-spaces;
  }

  .shiki {
    padding: 1em;
    border-radius: 4px;
    font-size: 0.9rem;
    border: 2px solid var(--border-secondary-color);
    margin-top: 6px;
    margin-bottom: 12px;
    overflow-x: auto;
  }
  .shiki-fallback {
    background: var(--bg-tertiary-color);
    color: var(--fg-secondary-color);
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
    font-family: Roboto, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-style: italic;
    opacity: 0.7;
    code {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }

  blockquote {
    border-left: 3px solid var(--border-accent-color);
    padding-left: 16px;
    padding-top: 4px;

    ol {
      margin-left: 32px;
      color: var(--fg-secondary-color);
      font-size: 0.9rem;
    }
    p {
      color: var(--fg-secondary-color);
      font-weight: 300;
    }
  }

  p {
    img {
      object-fit: cover;
      max-width: 100%;
      border-radius: 8px;
      overflow: hidden;
    }
  }

  > ul > li > strong,
  > ul > li > p > strong {
    padding: 2px 6px;
    border: 1px solid var(--border-primary-color);
    background-color: var(--bg-secondary-color);
    border-radius: 2px;
  }

  ul {
    list-style-type: disc;

    ::marker {
      color: var(--bg-overlay-secondary-color);
    }
    > li {
      color: var(--fg-secondary-color);
      position: relative;
      margin: 12px 0;

      @include mobile {
        margin: 4px 0;
      }

      ul {
        padding-right: 0;
      }

      > ul {
        &:first-of-type {
          padding-top: 0px;
          padding-bottom: 8px;
        }
      }

      > p {
        margin: 0;
      }
    }

    &::before {
      position: absolute;
      content: '';
      border-left: 1px solid var(--border-primary-color);
      left: -12px;
      top: 0;
      margin-top: 30px;
      height: calc(100% - 35px);
      opacity: 0.5;
    }
  }

  details {
    p {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(370px, 2fr));
      gap: 10px;

      br {
        display: none;
      }

      img {
        object-fit: cover;
        max-width: 600px;
        min-height: 200px;
        height: 100%;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
      }

      @include mobile() {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    font-size: 1em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--fg-primary-color);
    line-height: 1.6;
  }

  table thead th {
    text-align: left;
    padding: 10px 8px;
    font-weight: 600;
    border-bottom: 2px solid var(--border-secondary-color);
    background-color: var(--bg-secondary-color);
  }

  table td {
    text-align: left;
    padding: 12px 8px;
    border-bottom: 1px solid var(--border-secondary-color);
  }

  table tbody tr:last-child td {
    border-bottom: none;
  }

  a,
  a:visited {
    color: var(--fg-accent-color);
  }

  a:hover,
  a:focus,
  a:active {
    color: var(--fg-accent-color);
  }

  .modest-no-decoration {
    text-decoration: none;
  }

  p,
  .modest-p {
    font-size: 1rem;
    margin-bottom: 1.3rem;
  }

  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }

  h1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-left: 3px solid var(--border-accent-color);
    padding-left: 16px;
  }

  h2,
  h3 {
    border-bottom: 2px solid var(--border-secondary-color);
    margin-top: 0.9rem;
    margin-bottom: 1.15rem;
    padding: 0.5rem;
  }

  h4,
  h5 {
    border-bottom: 2px solid var(--border-secondary-color);
    padding: 0.25rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    background-color: var(--bg-secondary-color);
    border-bottom: 2px solid var(--border-accent-color);
    border-top: 2px solid var(--border-accent-color);
  }
}

:root {
  --line-height-tight: 1;
  --callout-border-width: 0px;
  --callout-border-opacity: 0.25;
  --callout-padding: 6px 6px 6px 12px;
  --callout-radius: 4px;
  --callout-title-color: inherit;
  --callout-title-padding: 0;
  --callout-title-size: inherit;
  --callout-title-weight: 500;
  --callout-content-padding: 0;
  --callout-content-background: transparent;
  --callout-blend-mode: var(darken);
  --callout-info: 8, 109, 221;
  --callout-todo: 8, 109, 221;
  --callout-default: 8, 109, 221;
  --callout-bug: 233, 49, 71;
  --callout-error: 233, 49, 71;
  --callout-fail: 233, 49, 71;
  --callout-success: 8, 185, 78;
  --callout-example: 120, 82, 238;
  --callout-important: 0, 191, 188;
  --callout-summary: 0, 191, 188;
  --callout-tip: 0, 191, 188;
  --callout-question: 236, 117, 0;
  --callout-warning: 236, 117, 0;
  --callout-quote: 158, 158, 158;
  --callout-collapse-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0ibTkgMThsNi02bC02LTYiLz48L3N2Zz4=');
}

.theme-light {
  --callout-blend-mode: var(darken);
}

.theme-dark {
  --callout-blend-mode: var(lighten);
}

html[data-theme='light'] #app {
  --callout-blend-mode: var(darken);
}

html[data-theme='dark'] #app {
  --callout-blend-mode: var(lighten);
}

/**
 * Obsidian callout about
 *
 * The following style is exactly the same as in obsidian
 */
.callout {
  overflow: hidden;
  border-style: solid;
  border-color: rgba(var(--callout-color), var(--callout-border-opacity));
  border-width: var(--callout-border-width);
  border-radius: var(--callout-radius);
  margin-bottom: 16px;
  mix-blend-mode: var(--callout-blend-mode);
  background-color: rgba(var(--callout-color), 0.1);
  padding: var(--callout-padding);
  --callout-color: var(--callout-default);
  --callout-icon: lucide-pencil;
}

.callout .callout-title {
  padding: var(--callout-title-padding);
  display: flex;
  justify-content: space-between;
  gap: 4px;
  font-size: var(--callout-title-size);
  color: rgb(var(--callout-color));
  line-height: var(--line-height-tight);
  align-items: center;
}

details.callout .callout-title {
  margin: 0;
  cursor: pointer;
  font-size: 0.85rem;
}

.callout .callout-title .callout-title-icon {
  display: none;
}

.callout .callout-title .callout-title-inner {
  --font-weight: var(--callout-title-weight);
  font-weight: var(--font-weight);
  color: var(--callout-title-color);
}

.callout .callout-title .callout-fold {
  background-color: rgb(var(--callout-color));
  mask-image: var(--callout-collapse-icon);
  mask-size: 100%;
  -webkit-mask-image: var(--callout-collapse-icon);
  -webkit-mask-size: 100%;
  height: 24px;
  width: 24px;
  transition: 100ms ease-in-out;
}

details[close].callout > .callout-title > .callout-fold {
  transform: rotate(-90deg);
}

details[open].callout > .callout-title > .callout-fold {
  transform: rotate(90deg);
}

.callout .callout-content {
  overflow-x: auto;
  padding: var(--callout-content-padding);
  background-color: var(--callout-content-background);
}

.callout[data-callout='todo'] {
  --callout-color: var(--callout-todo);
  --callout-icon: lucide-check-circle-2;
}

.callout[data-callout='success'],
.callout[data-callout='check'],
.callout[data-callout='done'] {
  --callout-color: var(--callout-success);
  --callout-icon: lucide-check;
}

.callout[data-callout='warning'],
.callout[data-callout='caution'],
.callout[data-callout='attention'] {
  --callout-color: var(--callout-warning);
  --callout-icon: lucide-alert-triangle;
}

.callout[data-callout='danger'],
.callout[data-callout='error'] {
  --callout-color: var(--callout-error);
  --callout-icon: lucide-zap;
}

.callout[data-callout='tip'],
.callout[data-callout='hint'] {
  --callout-color: var(--callout-tip);
  --callout-icon: lucide-flame;
}

.callout[data-callout='example'] {
  --callout-color: var(--callout-example);
  --callout-icon: lucide-list;
}

.callout[data-callout='abstract'],
.callout[data-callout='summary'],
.callout[data-callout='tldr'] {
  --callout-color: var(--callout-summary);
  --callout-icon: lucide-clipboard-list;
}

.callout[data-callout='quote'],
.callout[data-callout='cite'] {
  --callout-color: var(--callout-quote);
  --callout-icon: quote-glyph;
}
</style>
