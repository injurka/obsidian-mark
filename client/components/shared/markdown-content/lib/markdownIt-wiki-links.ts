import type MarkdownIt from 'markdown-it';
// import type StateInline from 'markdown-it/lib/rules_inline/state_inline'; // Removed
// import type Token from 'markdown-it/lib/token'; // Removed

// Regex to capture the [text](url) structure.
// Group 1: Link Text (non-greedy)
// Group 2: Link URL (non-greedy)
// It avoids matching escaped brackets/parentheses within the parts.
const EXPLICIT_LINK_REGEX = /\[((?:\\.|[^\]\\])+?)\]\(((?:\\.|[^)\\])+?)\)/;

// Типы state и token будут выведены TypeScript из контекста использования
// или можно использовать any, если вывод не сработает.
// В сигнатуре md.inline.ruler.before типы обычно передаются.
function explicitLinkRule(state: any, silent: boolean): boolean {
  const pos = state.pos;
  const max = state.posMax;

  // Quick check for starting character '['
  if (state.src.charCodeAt(pos) !== 0x5B /* [ */) {
    return false;
  }

  // Try to match the regex starting from the current position
  const match = EXPLICIT_LINK_REGEX.exec(state.src.slice(pos));

  if (!match || match.index !== 0) {
    // Regex didn't match at the beginning of the current position
    return false;
  }

  const fullMatch = match[0]; // The entire matched string "[text](url)"
  const linkText = match[1]; // The captured text part
  const linkHref = match[2]; // The captured URL part

  // If silent, we only care if it matches. Return true.
  if (silent) {
    return true;
  }

  // If not silent, create the tokens
  let token: any; // Используем any или TypeScript выведет тип Token

  // 1. Create link_open token
  token = state.push('link_open', 'a', 1);
  token.attrSet('href', linkHref);
  token.markup = 'link';
  token.map = [pos, pos + fullMatch.length];

  // 2. Create inline token for the link text content
  token = state.push('text', '', 0);
  token.content = linkText;
  token.map = [pos + 1, pos + 1 + linkText.length];

  // 3. Create link_close token
  token = state.push('link_close', 'a', -1);
  token.markup = 'link';
  token.map = [pos, pos + fullMatch.length];

  // Advance the parser position past the entire matched link
  state.pos += fullMatch.length;
  return true;
}


export function markdownItWikiLinks(md: MarkdownIt /*, options: any */): void {
  // Add the rule to the inline ruler.
  md.inline.ruler.before('link', 'explicit_link', explicitLinkRule);
  // Fallback if 'link' rule is missing
  // md.inline.ruler.before('emphasis', 'explicit_link', explicitLinkRule);
} 
