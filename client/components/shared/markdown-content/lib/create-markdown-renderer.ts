import type { Highlighter } from 'shiki'
import catppuccinFrappe from '@shikijs/themes/catppuccin-frappe'
import catppuccinLatte from '@shikijs/themes/catppuccin-latte'
import catppuccinMacchiato from '@shikijs/themes/catppuccin-macchiato'
import catppuccinMocha from '@shikijs/themes/catppuccin-mocha'
import MarkdownIt from 'markdown-it'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItCollapsible from 'markdown-it-collapsible'
import MarkdownItContainer from 'markdown-it-container'
// @ts-expect-error no dts
import MarkdownItObsidianCallouts from 'markdown-it-obsidian-callouts'
import { createHighlighter } from 'shiki'

interface WikiImageOptions {
  baseURL?: string
  defaultAlt?: string
}

export function markdownItWikiImages(md: MarkdownIt, options: WikiImageOptions = {}) {
  const {
    baseURL = '/personal/img/',
    defaultAlt = '',
  } = options

  md.inline.ruler.before('emphasis', 'wiki_image', (state, silent) => {
    const pos = state.pos
    const max = state.posMax
    const ch = state.src.charCodeAt(pos)

    if (ch !== 0x21/* ! */)
      return false
    if (state.src.charCodeAt(pos + 1) !== 0x5B/* [ */)
      return false
    if (state.src.charCodeAt(pos + 2) !== 0x5B/* [ */)
      return false

    let end = pos + 3
    while (end < max && state.src.charCodeAt(end) !== 0x5D/* ] */) {
      end++
    }
    if (end >= max)
      return false
    if (state.src.charCodeAt(end + 1) !== 0x5D/* ] */)
      return false

    if (silent)
      return true

    const filename = state.src.slice(pos + 3, end).trim()
    const imgSrc = `${baseURL}${filename}`

    const token = state.push('html_inline', '', 0)
    token.content = `<img src="${imgSrc}" alt="${defaultAlt}" />`

    state.pos = end + 2

    return true
  })
}

interface CreateMarkdownRendererParams {
  imageBasePath?: string
  shikiTheme: string
}

export async function createMarkdownRenderer(params: CreateMarkdownRendererParams): Promise<MarkdownIt> {
  const { imageBasePath = '/personal/img/', shikiTheme } = params

  const highlighter: Highlighter = await createHighlighter({
    themes: [catppuccinMocha, catppuccinMacchiato, catppuccinFrappe, catppuccinLatte],
    langs: ['javascript', 'typescript', 'html', 'css', 'scss', 'json', 'bash', 'python', 'vue', 'markdown', 'go', 'rust'],
  })

  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    highlight: (str: string, lang: string, _attrs: string): string => {
      if (lang && highlighter.getLoadedLanguages().includes(lang)) {
        try {
          return highlighter.codeToHtml(str, { lang, theme: shikiTheme })
        }
        catch (error) {
          console.error(`Shiki highlighting error for lang ${lang}:`, error)
          return `<pre class="shiki-fallback"><code>${md.utils.escapeHtml(str)}</code></pre>`
        }
      }
      return `<pre class="shiki-fallback"><code>${md.utils.escapeHtml(str)}</code></pre>`
    },
  })

  md
    .use(markdownItWikiImages, {
      baseURL: imageBasePath,
      defaultAlt: '',
    })
    .use(MarkdownItObsidianCallouts)
    .use(MarkdownItAttrs)
    .use(MarkdownItCollapsible)
    .use(MarkdownItContainer)

  return md
}
