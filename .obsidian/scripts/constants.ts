export const NAV_FILENAME = 'nav.json'
export const TREE_FILENAME = 'tree.json'
export const IMAGE_DEST_FOLDER = '_'

// Regex to match the entire front matter block
export const FRONT_MATTER_REGEX = /^---\s*([\s\S]*?)\s*---/

// Regex to extract sysname specifically from the front matter content
export const SYSNAME_REGEX = /^\s*sysname:\s*"?([^"\s]+)"?\s*$/m

// Regex for Obsidian links (excluding image links like ![[...]])
export const OBSIDIAN_LINK_REGEX = /(?<!!)\[\[([^|\]\n]+)(?:\|([^\]\n]+))?\]\]/g

// Regex to extract inline tags (e.g. #tag or #tag/nested)
// Supports Cyrillic, Latin, numbers, underscores, hyphens, and forward slashes
// Looks for # preceded by start of line or whitespace
export const INLINE_TAG_REGEX = /(?<=^|\s)#([a-zA-Zа-яА-Я0-9_\-\/]+)/g

export const IMAGE_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.tiff',
])
