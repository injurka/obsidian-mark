import type MarkdownIt from 'markdown-it'

interface WikiImageOptions {
  baseURL?: string
  defaultAlt?: string
}

function markdownItWikiImages(md: MarkdownIt, options: WikiImageOptions = {}) {
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

export { markdownItWikiImages }
