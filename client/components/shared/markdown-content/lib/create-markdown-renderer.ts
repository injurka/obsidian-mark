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
import { markdownItWikiImages } from './markdownIt-wiki-images'

interface CreateMarkdownRendererParams {
  imageBasePath: string
  shikiTheme: string
}

export async function createMarkdownRenderer(params: CreateMarkdownRendererParams): Promise<MarkdownIt> {
  const { imageBasePath, shikiTheme } = params

  const highlighter: Highlighter = await createHighlighter({
    themes: [catppuccinMocha, catppuccinMacchiato, catppuccinFrappe, catppuccinLatte],
    langs: ['c++', 'javascript', 'typescript', 'html', 'css', 'scss', 'json', 'bash', 'python', 'vue', 'markdown', 'go', 'rust'],
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
