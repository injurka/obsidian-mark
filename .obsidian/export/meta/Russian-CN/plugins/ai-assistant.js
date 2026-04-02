var _e = Object.defineProperty;
var re = (a) => {
  throw TypeError(a);
};
var Se = (a, e, n) => e in a ? _e(a, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : a[e] = n;
var x = (a, e, n) => Se(a, typeof e != "symbol" ? e + "" : e, n), ze = (a, e, n) => e.has(a) || re("Cannot " + n);
var se = (a, e, n) => e.has(a) ? re("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, n);
var M = (a, e, n) => (ze(a, e, "access private method"), n);
function U() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let C = U();
function we(a) {
  C = a;
}
const he = /[&<>"']/, Be = new RegExp(he.source, "g"), ge = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, Ie = new RegExp(ge.source, "g"), Pe = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, ae = (a) => Pe[a];
function V(a, e) {
  if (e) {
    if (he.test(a))
      return a.replace(Be, ae);
  } else if (ge.test(a))
    return a.replace(Ie, ae);
  return a;
}
const Me = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function Ae(a) {
  return a.replace(Me, (e, n) => (n = n.toLowerCase(), n === "colon" ? ":" : n.charAt(0) === "#" ? n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1)) : ""));
}
const Re = /(^|[^\[])\^/g;
function b(a, e) {
  let n = typeof a == "string" ? a : a.source;
  e = e || "";
  const t = {
    replace: (o, r) => {
      let i = typeof r == "string" ? r : r.source;
      return i = i.replace(Re, "$1"), n = n.replace(o, i), t;
    },
    getRegex: () => new RegExp(n, e)
  };
  return t;
}
function le(a) {
  try {
    a = encodeURI(a).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return a;
}
const S = { exec: () => null };
function ce(a, e) {
  const n = a.replace(/\|/g, (r, i, l) => {
    let c = !1, w = i;
    for (; --w >= 0 && l[w] === "\\"; )
      c = !c;
    return c ? "|" : " |";
  }), t = n.split(/ \|/);
  let o = 0;
  if (t[0].trim() || t.shift(), t.length > 0 && !t[t.length - 1].trim() && t.pop(), e)
    if (t.length > e)
      t.splice(e);
    else
      for (; t.length < e; )
        t.push("");
  for (; o < t.length; o++)
    t[o] = t[o].trim().replace(/\\\|/g, "|");
  return t;
}
function A(a, e, n) {
  const t = a.length;
  if (t === 0)
    return "";
  let o = 0;
  for (; o < t && a.charAt(t - o - 1) === e; )
    o++;
  return a.slice(0, t - o);
}
function De(a, e) {
  if (a.indexOf(e[1]) === -1)
    return -1;
  let n = 0;
  for (let t = 0; t < a.length; t++)
    if (a[t] === "\\")
      t++;
    else if (a[t] === e[0])
      n++;
    else if (a[t] === e[1] && (n--, n < 0))
      return t;
  return -1;
}
function de(a, e, n, t) {
  const o = e.href, r = e.title ? V(e.title) : null, i = a[1].replace(/\\([\[\]])/g, "$1");
  if (a[0].charAt(0) !== "!") {
    t.state.inLink = !0;
    const l = {
      type: "link",
      raw: n,
      href: o,
      title: r,
      text: i,
      tokens: t.inlineTokens(i)
    };
    return t.state.inLink = !1, l;
  }
  return {
    type: "image",
    raw: n,
    href: o,
    title: r,
    text: V(i)
  };
}
function Le(a, e) {
  const n = a.match(/^(\s+)(?:```)/);
  if (n === null)
    return e;
  const t = n[1];
  return e.split(`
`).map((o) => {
    const r = o.match(/^\s+/);
    if (r === null)
      return o;
    const [i] = r;
    return i.length >= t.length ? o.slice(t.length) : o;
  }).join(`
`);
}
class D {
  // set by the lexer
  constructor(e) {
    x(this, "options");
    x(this, "rules");
    // set by the lexer
    x(this, "lexer");
    this.options = e || C;
  }
  space(e) {
    const n = this.rules.block.newline.exec(e);
    if (n && n[0].length > 0)
      return {
        type: "space",
        raw: n[0]
      };
  }
  code(e) {
    const n = this.rules.block.code.exec(e);
    if (n) {
      const t = n[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: n[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? t : A(t, `
`)
      };
    }
  }
  fences(e) {
    const n = this.rules.block.fences.exec(e);
    if (n) {
      const t = n[0], o = Le(t, n[3] || "");
      return {
        type: "code",
        raw: t,
        lang: n[2] ? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : n[2],
        text: o
      };
    }
  }
  heading(e) {
    const n = this.rules.block.heading.exec(e);
    if (n) {
      let t = n[2].trim();
      if (/#$/.test(t)) {
        const o = A(t, "#");
        (this.options.pedantic || !o || / $/.test(o)) && (t = o.trim());
      }
      return {
        type: "heading",
        raw: n[0],
        depth: n[1].length,
        text: t,
        tokens: this.lexer.inline(t)
      };
    }
  }
  hr(e) {
    const n = this.rules.block.hr.exec(e);
    if (n)
      return {
        type: "hr",
        raw: n[0]
      };
  }
  blockquote(e) {
    const n = this.rules.block.blockquote.exec(e);
    if (n) {
      let t = n[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, `
    $1`);
      t = A(t.replace(/^ *>[ \t]?/gm, ""), `
`);
      const o = this.lexer.state.top;
      this.lexer.state.top = !0;
      const r = this.lexer.blockTokens(t);
      return this.lexer.state.top = o, {
        type: "blockquote",
        raw: n[0],
        tokens: r,
        text: t
      };
    }
  }
  list(e) {
    let n = this.rules.block.list.exec(e);
    if (n) {
      let t = n[1].trim();
      const o = t.length > 1, r = {
        type: "list",
        raw: "",
        ordered: o,
        start: o ? +t.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      t = o ? `\\d{1,9}\\${t.slice(-1)}` : `\\${t}`, this.options.pedantic && (t = o ? t : "[*+-]");
      const i = new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let l = "", c = "", w = !1;
      for (; e; ) {
        let d = !1;
        if (!(n = i.exec(e)) || this.rules.block.hr.test(e))
          break;
        l = n[0], e = e.substring(l.length);
        let p = n[2].split(`
`, 1)[0].replace(/^\t+/, (H) => " ".repeat(3 * H.length)), u = e.split(`
`, 1)[0], h = 0;
        this.options.pedantic ? (h = 2, c = p.trimStart()) : (h = n[2].search(/[^ ]/), h = h > 4 ? 1 : h, c = p.slice(h), h += n[1].length);
        let f = !1;
        if (!p && /^ *$/.test(u) && (l += u + `
`, e = e.substring(u.length + 1), d = !0), !d) {
          const H = new RegExp(`^ {0,${Math.min(3, h - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), ne = new RegExp(`^ {0,${Math.min(3, h - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), oe = new RegExp(`^ {0,${Math.min(3, h - 1)}}(?:\`\`\`|~~~)`), ie = new RegExp(`^ {0,${Math.min(3, h - 1)}}#`);
          for (; e; ) {
            const j = e.split(`
`, 1)[0];
            if (u = j, this.options.pedantic && (u = u.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), oe.test(u) || ie.test(u) || H.test(u) || ne.test(e))
              break;
            if (u.search(/[^ ]/) >= h || !u.trim())
              c += `
` + u.slice(h);
            else {
              if (f || p.search(/[^ ]/) >= 4 || oe.test(p) || ie.test(p) || ne.test(p))
                break;
              c += `
` + u;
            }
            !f && !u.trim() && (f = !0), l += j + `
`, e = e.substring(j.length + 1), p = u.slice(h);
          }
        }
        r.loose || (w ? r.loose = !0 : /\n *\n *$/.test(l) && (w = !0));
        let g = null, $;
        this.options.gfm && (g = /^\[[ xX]\] /.exec(c), g && ($ = g[0] !== "[ ] ", c = c.replace(/^\[[ xX]\] +/, ""))), r.items.push({
          type: "list_item",
          raw: l,
          task: !!g,
          checked: $,
          loose: !1,
          text: c,
          tokens: []
        }), r.raw += l;
      }
      r.items[r.items.length - 1].raw = l.trimEnd(), r.items[r.items.length - 1].text = c.trimEnd(), r.raw = r.raw.trimEnd();
      for (let d = 0; d < r.items.length; d++)
        if (this.lexer.state.top = !1, r.items[d].tokens = this.lexer.blockTokens(r.items[d].text, []), !r.loose) {
          const p = r.items[d].tokens.filter((h) => h.type === "space"), u = p.length > 0 && p.some((h) => /\n.*\n/.test(h.raw));
          r.loose = u;
        }
      if (r.loose)
        for (let d = 0; d < r.items.length; d++)
          r.items[d].loose = !0;
      return r;
    }
  }
  html(e) {
    const n = this.rules.block.html.exec(e);
    if (n)
      return {
        type: "html",
        block: !0,
        raw: n[0],
        pre: n[1] === "pre" || n[1] === "script" || n[1] === "style",
        text: n[0]
      };
  }
  def(e) {
    const n = this.rules.block.def.exec(e);
    if (n) {
      const t = n[1].toLowerCase().replace(/\s+/g, " "), o = n[2] ? n[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = n[3] ? n[3].substring(1, n[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : n[3];
      return {
        type: "def",
        tag: t,
        raw: n[0],
        href: o,
        title: r
      };
    }
  }
  table(e) {
    const n = this.rules.block.table.exec(e);
    if (!n || !/[:|]/.test(n[2]))
      return;
    const t = ce(n[1]), o = n[2].replace(/^\||\| *$/g, "").split("|"), r = n[3] && n[3].trim() ? n[3].replace(/\n[ \t]*$/, "").split(`
`) : [], i = {
      type: "table",
      raw: n[0],
      header: [],
      align: [],
      rows: []
    };
    if (t.length === o.length) {
      for (const l of o)
        /^ *-+: *$/.test(l) ? i.align.push("right") : /^ *:-+: *$/.test(l) ? i.align.push("center") : /^ *:-+ *$/.test(l) ? i.align.push("left") : i.align.push(null);
      for (const l of t)
        i.header.push({
          text: l,
          tokens: this.lexer.inline(l)
        });
      for (const l of r)
        i.rows.push(ce(l, i.header.length).map((c) => ({
          text: c,
          tokens: this.lexer.inline(c)
        })));
      return i;
    }
  }
  lheading(e) {
    const n = this.rules.block.lheading.exec(e);
    if (n)
      return {
        type: "heading",
        raw: n[0],
        depth: n[2].charAt(0) === "=" ? 1 : 2,
        text: n[1],
        tokens: this.lexer.inline(n[1])
      };
  }
  paragraph(e) {
    const n = this.rules.block.paragraph.exec(e);
    if (n) {
      const t = n[1].charAt(n[1].length - 1) === `
` ? n[1].slice(0, -1) : n[1];
      return {
        type: "paragraph",
        raw: n[0],
        text: t,
        tokens: this.lexer.inline(t)
      };
    }
  }
  text(e) {
    const n = this.rules.block.text.exec(e);
    if (n)
      return {
        type: "text",
        raw: n[0],
        text: n[0],
        tokens: this.lexer.inline(n[0])
      };
  }
  escape(e) {
    const n = this.rules.inline.escape.exec(e);
    if (n)
      return {
        type: "escape",
        raw: n[0],
        text: V(n[1])
      };
  }
  tag(e) {
    const n = this.rules.inline.tag.exec(e);
    if (n)
      return !this.lexer.state.inLink && /^<a /i.test(n[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(n[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(n[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: n[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: n[0]
      };
  }
  link(e) {
    const n = this.rules.inline.link.exec(e);
    if (n) {
      const t = n[2].trim();
      if (!this.options.pedantic && /^</.test(t)) {
        if (!/>$/.test(t))
          return;
        const i = A(t.slice(0, -1), "\\");
        if ((t.length - i.length) % 2 === 0)
          return;
      } else {
        const i = De(n[2], "()");
        if (i > -1) {
          const c = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + i;
          n[2] = n[2].substring(0, i), n[0] = n[0].substring(0, c).trim(), n[3] = "";
        }
      }
      let o = n[2], r = "";
      if (this.options.pedantic) {
        const i = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);
        i && (o = i[1], r = i[3]);
      } else
        r = n[3] ? n[3].slice(1, -1) : "";
      return o = o.trim(), /^</.test(o) && (this.options.pedantic && !/>$/.test(t) ? o = o.slice(1) : o = o.slice(1, -1)), de(n, {
        href: o && o.replace(this.rules.inline.anyPunctuation, "$1"),
        title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
      }, n[0], this.lexer);
    }
  }
  reflink(e, n) {
    let t;
    if ((t = this.rules.inline.reflink.exec(e)) || (t = this.rules.inline.nolink.exec(e))) {
      const o = (t[2] || t[1]).replace(/\s+/g, " "), r = n[o.toLowerCase()];
      if (!r) {
        const i = t[0].charAt(0);
        return {
          type: "text",
          raw: i,
          text: i
        };
      }
      return de(t, r, t[0], this.lexer);
    }
  }
  emStrong(e, n, t = "") {
    let o = this.rules.inline.emStrongLDelim.exec(e);
    if (!o || o[3] && t.match(/[\p{L}\p{N}]/u))
      return;
    if (!(o[1] || o[2] || "") || !t || this.rules.inline.punctuation.exec(t)) {
      const i = [...o[0]].length - 1;
      let l, c, w = i, d = 0;
      const p = o[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (p.lastIndex = 0, n = n.slice(-1 * e.length + i); (o = p.exec(n)) != null; ) {
        if (l = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !l)
          continue;
        if (c = [...l].length, o[3] || o[4]) {
          w += c;
          continue;
        } else if ((o[5] || o[6]) && i % 3 && !((i + c) % 3)) {
          d += c;
          continue;
        }
        if (w -= c, w > 0)
          continue;
        c = Math.min(c, c + w + d);
        const u = [...o[0]][0].length, h = e.slice(0, i + o.index + u + c);
        if (Math.min(i, c) % 2) {
          const g = h.slice(1, -1);
          return {
            type: "em",
            raw: h,
            text: g,
            tokens: this.lexer.inlineTokens(g)
          };
        }
        const f = h.slice(2, -2);
        return {
          type: "strong",
          raw: h,
          text: f,
          tokens: this.lexer.inlineTokens(f)
        };
      }
    }
  }
  codespan(e) {
    const n = this.rules.inline.code.exec(e);
    if (n) {
      let t = n[2].replace(/\n/g, " ");
      const o = /[^ ]/.test(t), r = /^ /.test(t) && / $/.test(t);
      return o && r && (t = t.substring(1, t.length - 1)), t = V(t, !0), {
        type: "codespan",
        raw: n[0],
        text: t
      };
    }
  }
  br(e) {
    const n = this.rules.inline.br.exec(e);
    if (n)
      return {
        type: "br",
        raw: n[0]
      };
  }
  del(e) {
    const n = this.rules.inline.del.exec(e);
    if (n)
      return {
        type: "del",
        raw: n[0],
        text: n[2],
        tokens: this.lexer.inlineTokens(n[2])
      };
  }
  autolink(e) {
    const n = this.rules.inline.autolink.exec(e);
    if (n) {
      let t, o;
      return n[2] === "@" ? (t = V(n[1]), o = "mailto:" + t) : (t = V(n[1]), o = t), {
        type: "link",
        raw: n[0],
        text: t,
        href: o,
        tokens: [
          {
            type: "text",
            raw: t,
            text: t
          }
        ]
      };
    }
  }
  url(e) {
    var t;
    let n;
    if (n = this.rules.inline.url.exec(e)) {
      let o, r;
      if (n[2] === "@")
        o = V(n[0]), r = "mailto:" + o;
      else {
        let i;
        do
          i = n[0], n[0] = ((t = this.rules.inline._backpedal.exec(n[0])) == null ? void 0 : t[0]) ?? "";
        while (i !== n[0]);
        o = V(n[0]), n[1] === "www." ? r = "http://" + n[0] : r = n[0];
      }
      return {
        type: "link",
        raw: n[0],
        text: o,
        href: r,
        tokens: [
          {
            type: "text",
            raw: o,
            text: o
          }
        ]
      };
    }
  }
  inlineText(e) {
    const n = this.rules.inline.text.exec(e);
    if (n) {
      let t;
      return this.lexer.state.inRawBlock ? t = n[0] : t = V(n[0]), {
        type: "text",
        raw: n[0],
        text: t
      };
    }
  }
}
const Oe = /^(?: *(?:\n|$))+/, qe = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/, He = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, I = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, je = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, fe = /(?:[*+-]|\d{1,9}[.)])/, me = b(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, fe).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), J = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Fe = /^[^\n]+/, Y = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Ze = b(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", Y).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Ke = b(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, fe).getRegex(), q = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", W = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Qe = b("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", W).replace("tag", q).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), be = b(J).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex(), Ue = b(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", be).getRegex(), G = {
  blockquote: Ue,
  code: qe,
  def: Ze,
  fences: He,
  heading: je,
  hr: I,
  html: Qe,
  lheading: me,
  list: Ke,
  newline: Oe,
  paragraph: be,
  table: S,
  text: Fe
}, ue = b("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex(), Je = {
  ...G,
  table: ue,
  paragraph: b(J).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ue).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex()
}, Ye = {
  ...G,
  html: b(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", W).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: S,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: b(J).replace("hr", I).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", me).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, xe = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, We = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, ke = /^( {2,}|\\)\n(?!\s*$)/, Ge = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, P = "\\p{P}\\p{S}", Xe = b(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, P).getRegex(), et = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g, tt = b(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, P).getRegex(), nt = b("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, P).getRegex(), ot = b("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, P).getRegex(), it = b(/\\([punct])/, "gu").replace(/punct/g, P).getRegex(), rt = b(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), st = b(W).replace("(?:-->|$)", "-->").getRegex(), at = b("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", st).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), L = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, lt = b(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", L).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ve = b(/^!?\[(label)\]\[(ref)\]/).replace("label", L).replace("ref", Y).getRegex(), ye = b(/^!?\[(ref)\](?:\[\])?/).replace("ref", Y).getRegex(), ct = b("reflink|nolink(?!\\()", "g").replace("reflink", Ve).replace("nolink", ye).getRegex(), X = {
  _backpedal: S,
  // only used for GFM url
  anyPunctuation: it,
  autolink: rt,
  blockSkip: et,
  br: ke,
  code: We,
  del: S,
  emStrongLDelim: tt,
  emStrongRDelimAst: nt,
  emStrongRDelimUnd: ot,
  escape: xe,
  link: lt,
  nolink: ye,
  punctuation: Xe,
  reflink: Ve,
  reflinkSearch: ct,
  tag: at,
  text: Ge,
  url: S
}, dt = {
  ...X,
  link: b(/^!?\[(label)\]\((.*?)\)/).replace("label", L).getRegex(),
  reflink: b(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", L).getRegex()
}, Z = {
  ...X,
  escape: b(xe).replace("])", "~|])").getRegex(),
  url: b(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, ut = {
  ...Z,
  br: b(ke).replace("{2,}", "*").getRegex(),
  text: b(Z.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, R = {
  normal: G,
  gfm: Je,
  pedantic: Ye
}, _ = {
  normal: X,
  gfm: Z,
  breaks: ut,
  pedantic: dt
};
class y {
  constructor(e) {
    x(this, "tokens");
    x(this, "options");
    x(this, "state");
    x(this, "tokenizer");
    x(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || C, this.options.tokenizer = this.options.tokenizer || new D(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      block: R.normal,
      inline: _.normal
    };
    this.options.pedantic ? (n.block = R.pedantic, n.inline = _.pedantic) : this.options.gfm && (n.block = R.gfm, this.options.breaks ? n.inline = _.breaks : n.inline = _.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: R,
      inline: _
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, n) {
    return new y(n).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, n) {
    return new y(n).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(/\r\n|\r/g, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const t = this.inlineQueue[n];
      this.inlineTokens(t.src, t.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = []) {
    this.options.pedantic ? e = e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e = e.replace(/^( *)(\t+)/gm, (l, c, w) => c + "    ".repeat(w.length));
    let t, o, r, i;
    for (; e; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((l) => (t = l.call({ lexer: this }, e, n)) ? (e = e.substring(t.raw.length), n.push(t), !0) : !1))) {
        if (t = this.tokenizer.space(e)) {
          e = e.substring(t.raw.length), t.raw.length === 1 && n.length > 0 ? n[n.length - 1].raw += `
` : n.push(t);
          continue;
        }
        if (t = this.tokenizer.code(e)) {
          e = e.substring(t.raw.length), o = n[n.length - 1], o && (o.type === "paragraph" || o.type === "text") ? (o.raw += `
` + t.raw, o.text += `
` + t.text, this.inlineQueue[this.inlineQueue.length - 1].src = o.text) : n.push(t);
          continue;
        }
        if (t = this.tokenizer.fences(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.heading(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.hr(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.blockquote(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.list(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.html(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.def(e)) {
          e = e.substring(t.raw.length), o = n[n.length - 1], o && (o.type === "paragraph" || o.type === "text") ? (o.raw += `
` + t.raw, o.text += `
` + t.raw, this.inlineQueue[this.inlineQueue.length - 1].src = o.text) : this.tokens.links[t.tag] || (this.tokens.links[t.tag] = {
            href: t.href,
            title: t.title
          });
          continue;
        }
        if (t = this.tokenizer.table(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.lheading(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (r = e, this.options.extensions && this.options.extensions.startBlock) {
          let l = 1 / 0;
          const c = e.slice(1);
          let w;
          this.options.extensions.startBlock.forEach((d) => {
            w = d.call({ lexer: this }, c), typeof w == "number" && w >= 0 && (l = Math.min(l, w));
          }), l < 1 / 0 && l >= 0 && (r = e.substring(0, l + 1));
        }
        if (this.state.top && (t = this.tokenizer.paragraph(r))) {
          o = n[n.length - 1], i && o.type === "paragraph" ? (o.raw += `
` + t.raw, o.text += `
` + t.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = o.text) : n.push(t), i = r.length !== e.length, e = e.substring(t.raw.length);
          continue;
        }
        if (t = this.tokenizer.text(e)) {
          e = e.substring(t.raw.length), o = n[n.length - 1], o && o.type === "text" ? (o.raw += `
` + t.raw, o.text += `
` + t.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = o.text) : n.push(t);
          continue;
        }
        if (e) {
          const l = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(l);
            break;
          } else
            throw new Error(l);
        }
      }
    return this.state.top = !0, n;
  }
  inline(e, n = []) {
    return this.inlineQueue.push({ src: e, tokens: n }), n;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, n = []) {
    let t, o, r, i = e, l, c, w;
    if (this.tokens.links) {
      const d = Object.keys(this.tokens.links);
      if (d.length > 0)
        for (; (l = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null; )
          d.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (l = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; )
      i = i.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (l = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; )
      i = i.slice(0, l.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; e; )
      if (c || (w = ""), c = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((d) => (t = d.call({ lexer: this }, e, n)) ? (e = e.substring(t.raw.length), n.push(t), !0) : !1))) {
        if (t = this.tokenizer.escape(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.tag(e)) {
          e = e.substring(t.raw.length), o = n[n.length - 1], o && t.type === "text" && o.type === "text" ? (o.raw += t.raw, o.text += t.text) : n.push(t);
          continue;
        }
        if (t = this.tokenizer.link(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(t.raw.length), o = n[n.length - 1], o && t.type === "text" && o.type === "text" ? (o.raw += t.raw, o.text += t.text) : n.push(t);
          continue;
        }
        if (t = this.tokenizer.emStrong(e, i, w)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.codespan(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.br(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.del(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (t = this.tokenizer.autolink(e)) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (!this.state.inLink && (t = this.tokenizer.url(e))) {
          e = e.substring(t.raw.length), n.push(t);
          continue;
        }
        if (r = e, this.options.extensions && this.options.extensions.startInline) {
          let d = 1 / 0;
          const p = e.slice(1);
          let u;
          this.options.extensions.startInline.forEach((h) => {
            u = h.call({ lexer: this }, p), typeof u == "number" && u >= 0 && (d = Math.min(d, u));
          }), d < 1 / 0 && d >= 0 && (r = e.substring(0, d + 1));
        }
        if (t = this.tokenizer.inlineText(r)) {
          e = e.substring(t.raw.length), t.raw.slice(-1) !== "_" && (w = t.raw.slice(-1)), c = !0, o = n[n.length - 1], o && o.type === "text" ? (o.raw += t.raw, o.text += t.text) : n.push(t);
          continue;
        }
        if (e) {
          const d = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(d);
            break;
          } else
            throw new Error(d);
        }
      }
    return n;
  }
}
class O {
  constructor(e) {
    x(this, "options");
    this.options = e || C;
  }
  code(e, n, t) {
    var r;
    const o = (r = (n || "").match(/^\S*/)) == null ? void 0 : r[0];
    return e = e.replace(/\n$/, "") + `
`, o ? '<pre><code class="language-' + V(o) + '">' + (t ? e : V(e, !0)) + `</code></pre>
` : "<pre><code>" + (t ? e : V(e, !0)) + `</code></pre>
`;
  }
  blockquote(e) {
    return `<blockquote>
${e}</blockquote>
`;
  }
  html(e, n) {
    return e;
  }
  heading(e, n, t) {
    return `<h${n}>${e}</h${n}>
`;
  }
  hr() {
    return `<hr>
`;
  }
  list(e, n, t) {
    const o = n ? "ol" : "ul", r = n && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + o + r + `>
` + e + "</" + o + `>
`;
  }
  listitem(e, n, t) {
    return `<li>${e}</li>
`;
  }
  checkbox(e) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(e) {
    return `<p>${e}</p>
`;
  }
  table(e, n) {
    return n && (n = `<tbody>${n}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + n + `</table>
`;
  }
  tablerow(e) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e, n) {
    const t = n.header ? "th" : "td";
    return (n.align ? `<${t} align="${n.align}">` : `<${t}>`) + e + `</${t}>
`;
  }
  /**
   * span level renderer
   */
  strong(e) {
    return `<strong>${e}</strong>`;
  }
  em(e) {
    return `<em>${e}</em>`;
  }
  codespan(e) {
    return `<code>${e}</code>`;
  }
  br() {
    return "<br>";
  }
  del(e) {
    return `<del>${e}</del>`;
  }
  link(e, n, t) {
    const o = le(e);
    if (o === null)
      return t;
    e = o;
    let r = '<a href="' + e + '"';
    return n && (r += ' title="' + n + '"'), r += ">" + t + "</a>", r;
  }
  image(e, n, t) {
    const o = le(e);
    if (o === null)
      return t;
    e = o;
    let r = `<img src="${e}" alt="${t}"`;
    return n && (r += ` title="${n}"`), r += ">", r;
  }
  text(e) {
    return e;
  }
}
class ee {
  // no need for block level renderers
  strong(e) {
    return e;
  }
  em(e) {
    return e;
  }
  codespan(e) {
    return e;
  }
  del(e) {
    return e;
  }
  html(e) {
    return e;
  }
  text(e) {
    return e;
  }
  link(e, n, t) {
    return "" + t;
  }
  image(e, n, t) {
    return "" + t;
  }
  br() {
    return "";
  }
}
class v {
  constructor(e) {
    x(this, "options");
    x(this, "renderer");
    x(this, "textRenderer");
    this.options = e || C, this.options.renderer = this.options.renderer || new O(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new ee();
  }
  /**
   * Static Parse Method
   */
  static parse(e, n) {
    return new v(n).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, n) {
    return new v(n).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, n = !0) {
    let t = "";
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
        const i = r, l = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (l !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(i.type)) {
          t += l || "";
          continue;
        }
      }
      switch (r.type) {
        case "space":
          continue;
        case "hr": {
          t += this.renderer.hr();
          continue;
        }
        case "heading": {
          const i = r;
          t += this.renderer.heading(this.parseInline(i.tokens), i.depth, Ae(this.parseInline(i.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const i = r;
          t += this.renderer.code(i.text, i.lang, !!i.escaped);
          continue;
        }
        case "table": {
          const i = r;
          let l = "", c = "";
          for (let d = 0; d < i.header.length; d++)
            c += this.renderer.tablecell(this.parseInline(i.header[d].tokens), { header: !0, align: i.align[d] });
          l += this.renderer.tablerow(c);
          let w = "";
          for (let d = 0; d < i.rows.length; d++) {
            const p = i.rows[d];
            c = "";
            for (let u = 0; u < p.length; u++)
              c += this.renderer.tablecell(this.parseInline(p[u].tokens), { header: !1, align: i.align[u] });
            w += this.renderer.tablerow(c);
          }
          t += this.renderer.table(l, w);
          continue;
        }
        case "blockquote": {
          const i = r, l = this.parse(i.tokens);
          t += this.renderer.blockquote(l);
          continue;
        }
        case "list": {
          const i = r, l = i.ordered, c = i.start, w = i.loose;
          let d = "";
          for (let p = 0; p < i.items.length; p++) {
            const u = i.items[p], h = u.checked, f = u.task;
            let g = "";
            if (u.task) {
              const $ = this.renderer.checkbox(!!h);
              w ? u.tokens.length > 0 && u.tokens[0].type === "paragraph" ? (u.tokens[0].text = $ + " " + u.tokens[0].text, u.tokens[0].tokens && u.tokens[0].tokens.length > 0 && u.tokens[0].tokens[0].type === "text" && (u.tokens[0].tokens[0].text = $ + " " + u.tokens[0].tokens[0].text)) : u.tokens.unshift({
                type: "text",
                text: $ + " "
              }) : g += $ + " ";
            }
            g += this.parse(u.tokens, w), d += this.renderer.listitem(g, f, !!h);
          }
          t += this.renderer.list(d, l, c);
          continue;
        }
        case "html": {
          const i = r;
          t += this.renderer.html(i.text, i.block);
          continue;
        }
        case "paragraph": {
          const i = r;
          t += this.renderer.paragraph(this.parseInline(i.tokens));
          continue;
        }
        case "text": {
          let i = r, l = i.tokens ? this.parseInline(i.tokens) : i.text;
          for (; o + 1 < e.length && e[o + 1].type === "text"; )
            i = e[++o], l += `
` + (i.tokens ? this.parseInline(i.tokens) : i.text);
          t += n ? this.renderer.paragraph(l) : l;
          continue;
        }
        default: {
          const i = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(i), "";
          throw new Error(i);
        }
      }
    }
    return t;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, n) {
    n = n || this.renderer;
    let t = "";
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
        const i = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (i !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
          t += i || "";
          continue;
        }
      }
      switch (r.type) {
        case "escape": {
          const i = r;
          t += n.text(i.text);
          break;
        }
        case "html": {
          const i = r;
          t += n.html(i.text);
          break;
        }
        case "link": {
          const i = r;
          t += n.link(i.href, i.title, this.parseInline(i.tokens, n));
          break;
        }
        case "image": {
          const i = r;
          t += n.image(i.href, i.title, i.text);
          break;
        }
        case "strong": {
          const i = r;
          t += n.strong(this.parseInline(i.tokens, n));
          break;
        }
        case "em": {
          const i = r;
          t += n.em(this.parseInline(i.tokens, n));
          break;
        }
        case "codespan": {
          const i = r;
          t += n.codespan(i.text);
          break;
        }
        case "br": {
          t += n.br();
          break;
        }
        case "del": {
          const i = r;
          t += n.del(this.parseInline(i.tokens, n));
          break;
        }
        case "text": {
          const i = r;
          t += n.text(i.text);
          break;
        }
        default: {
          const i = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(i), "";
          throw new Error(i);
        }
      }
    }
    return t;
  }
}
class z {
  constructor(e) {
    x(this, "options");
    this.options = e || C;
  }
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
}
x(z, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
var T, K, ve;
class pt {
  constructor(...e) {
    se(this, T);
    x(this, "defaults", U());
    x(this, "options", this.setOptions);
    x(this, "parse", M(this, T, K).call(this, y.lex, v.parse));
    x(this, "parseInline", M(this, T, K).call(this, y.lexInline, v.parseInline));
    x(this, "Parser", v);
    x(this, "Renderer", O);
    x(this, "TextRenderer", ee);
    x(this, "Lexer", y);
    x(this, "Tokenizer", D);
    x(this, "Hooks", z);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, n) {
    var o, r;
    let t = [];
    for (const i of e)
      switch (t = t.concat(n.call(this, i)), i.type) {
        case "table": {
          const l = i;
          for (const c of l.header)
            t = t.concat(this.walkTokens(c.tokens, n));
          for (const c of l.rows)
            for (const w of c)
              t = t.concat(this.walkTokens(w.tokens, n));
          break;
        }
        case "list": {
          const l = i;
          t = t.concat(this.walkTokens(l.items, n));
          break;
        }
        default: {
          const l = i;
          (r = (o = this.defaults.extensions) == null ? void 0 : o.childTokens) != null && r[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((c) => {
            const w = l[c].flat(1 / 0);
            t = t.concat(this.walkTokens(w, n));
          }) : l.tokens && (t = t.concat(this.walkTokens(l.tokens, n)));
        }
      }
    return t;
  }
  use(...e) {
    const n = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((t) => {
      const o = { ...t };
      if (o.async = this.defaults.async || o.async || !1, t.extensions && (t.extensions.forEach((r) => {
        if (!r.name)
          throw new Error("extension name required");
        if ("renderer" in r) {
          const i = n.renderers[r.name];
          i ? n.renderers[r.name] = function(...l) {
            let c = r.renderer.apply(this, l);
            return c === !1 && (c = i.apply(this, l)), c;
          } : n.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const i = n[r.level];
          i ? i.unshift(r.tokenizer) : n[r.level] = [r.tokenizer], r.start && (r.level === "block" ? n.startBlock ? n.startBlock.push(r.start) : n.startBlock = [r.start] : r.level === "inline" && (n.startInline ? n.startInline.push(r.start) : n.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (n.childTokens[r.name] = r.childTokens);
      }), o.extensions = n), t.renderer) {
        const r = this.defaults.renderer || new O(this.defaults);
        for (const i in t.renderer) {
          if (!(i in r))
            throw new Error(`renderer '${i}' does not exist`);
          if (i === "options")
            continue;
          const l = i, c = t.renderer[l], w = r[l];
          r[l] = (...d) => {
            let p = c.apply(r, d);
            return p === !1 && (p = w.apply(r, d)), p || "";
          };
        }
        o.renderer = r;
      }
      if (t.tokenizer) {
        const r = this.defaults.tokenizer || new D(this.defaults);
        for (const i in t.tokenizer) {
          if (!(i in r))
            throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i))
            continue;
          const l = i, c = t.tokenizer[l], w = r[l];
          r[l] = (...d) => {
            let p = c.apply(r, d);
            return p === !1 && (p = w.apply(r, d)), p;
          };
        }
        o.tokenizer = r;
      }
      if (t.hooks) {
        const r = this.defaults.hooks || new z();
        for (const i in t.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (i === "options")
            continue;
          const l = i, c = t.hooks[l], w = r[l];
          z.passThroughHooks.has(i) ? r[l] = (d) => {
            if (this.defaults.async)
              return Promise.resolve(c.call(r, d)).then((u) => w.call(r, u));
            const p = c.call(r, d);
            return w.call(r, p);
          } : r[l] = (...d) => {
            let p = c.apply(r, d);
            return p === !1 && (p = w.apply(r, d)), p;
          };
        }
        o.hooks = r;
      }
      if (t.walkTokens) {
        const r = this.defaults.walkTokens, i = t.walkTokens;
        o.walkTokens = function(l) {
          let c = [];
          return c.push(i.call(this, l)), r && (c = c.concat(r.call(this, l))), c;
        };
      }
      this.defaults = { ...this.defaults, ...o };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, n) {
    return y.lex(e, n ?? this.defaults);
  }
  parser(e, n) {
    return v.parse(e, n ?? this.defaults);
  }
}
T = new WeakSet(), K = function(e, n) {
  return (t, o) => {
    const r = { ...o }, i = { ...this.defaults, ...r };
    this.defaults.async === !0 && r.async === !1 && (i.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), i.async = !0);
    const l = M(this, T, ve).call(this, !!i.silent, !!i.async);
    if (typeof t > "u" || t === null)
      return l(new Error("marked(): input parameter is undefined or null"));
    if (typeof t != "string")
      return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
    if (i.hooks && (i.hooks.options = i), i.async)
      return Promise.resolve(i.hooks ? i.hooks.preprocess(t) : t).then((c) => e(c, i)).then((c) => i.hooks ? i.hooks.processAllTokens(c) : c).then((c) => i.walkTokens ? Promise.all(this.walkTokens(c, i.walkTokens)).then(() => c) : c).then((c) => n(c, i)).then((c) => i.hooks ? i.hooks.postprocess(c) : c).catch(l);
    try {
      i.hooks && (t = i.hooks.preprocess(t));
      let c = e(t, i);
      i.hooks && (c = i.hooks.processAllTokens(c)), i.walkTokens && this.walkTokens(c, i.walkTokens);
      let w = n(c, i);
      return i.hooks && (w = i.hooks.postprocess(w)), w;
    } catch (c) {
      return l(c);
    }
  };
}, ve = function(e, n) {
  return (t) => {
    if (t.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
      const o = "<p>An error occurred:</p><pre>" + V(t.message + "", !0) + "</pre>";
      return n ? Promise.resolve(o) : o;
    }
    if (n)
      return Promise.reject(t);
    throw t;
  };
};
const N = new pt();
function m(a, e) {
  return N.parse(a, e);
}
m.options = m.setOptions = function(a) {
  return N.setOptions(a), m.defaults = N.defaults, we(m.defaults), m;
};
m.getDefaults = U;
m.defaults = C;
m.use = function(...a) {
  return N.use(...a), m.defaults = N.defaults, we(m.defaults), m;
};
m.walkTokens = function(a, e) {
  return N.walkTokens(a, e);
};
m.parseInline = N.parseInline;
m.Parser = v;
m.parser = v.parse;
m.Renderer = O;
m.TextRenderer = ee;
m.Lexer = y;
m.lexer = y.lex;
m.Tokenizer = D;
m.Hooks = z;
m.parse = m;
m.options;
m.setOptions;
m.use;
m.walkTokens;
m.parseInline;
v.parse;
y.lex;
const wt = { title: "AI 助手", chat: "聊天", topics: "话题", settings: "设置", openInPage: "在单独页面中打开", fullscreen: "全屏", windowed: "窗口模式", minimize: "最小化到后台", close: "关闭" }, ht = { emptyState: "新对话已开始。写下你的第一个提示！", generating: "生成回应中...", error: "错误", aborted: "已中止", placeholder: "输入消息...", clearChat: "清除聊天", newTopic: "新话题", promptSelect: "选择提示词", promptTitle: "提示词", modelSelect: "选择模型", modelTitle: "模型", cancel: "取消", send: "发送", unknown: "未知", clearConfirm: "清除当前聊天？" }, gt = { title: "你的对话", newChat: "+ 新聊天", empty: "你还没有保存的聊天。", messages: "条消息", delete: "删除" }, ft = { loadConfig: "加载配置", loading: "加载中...", systemPrompts: "你的系统提示词", add: "+ 添加", promptName: "提示词名称", promptPlaceholder: "你是一名专业翻译...", cancel: "取消", save: "保存", configSuccess: "配置加载成功！", configEmpty: "配置为空或格式无效", configError: "加载配置失败: ", newPrompt: "新提示词", apiKeyMissing: "请在“设置”选项卡中提供 API 密钥。" }, mt = { newChat: "新聊天", oldChat: "旧聊天", defaultPromptName: "默认", defaultPromptContent: "你是一个有用的AI助手。简明扼要地回答。用Markdown格式化代码和文本。", abortedRes: "请求已中止。", emptyRes: "空响应" }, bt = {
  ai: wt,
  chat: ht,
  topics: gt,
  settings: ft,
  store: mt
}, xt = { title: "AI Assistant", chat: "Chat", topics: "Topics", settings: "Settings", openInPage: "Open in separate page", fullscreen: "Fullscreen", windowed: "Windowed mode", minimize: "Minimize to background", close: "Close" }, kt = { emptyState: "New dialogue started. Write your first prompt!", generating: "Generating response...", error: "Error", aborted: "Aborted", placeholder: "Type a message...", clearChat: "Clear Chat", newTopic: "New Topic", promptSelect: "Select Prompt", promptTitle: "Prompt", modelSelect: "Select Model", modelTitle: "Model", cancel: "Cancel", send: "Send", unknown: "Unknown", clearConfirm: "Clear current chat?" }, Vt = { title: "Your Dialogues", newChat: "+ New Chat", empty: "You have no saved chats yet.", messages: "messages", delete: "Delete" }, yt = { loadConfig: "Load Config", loading: "Loading...", systemPrompts: "Your System Prompts", add: "+ Add", promptName: "Prompt Name", promptPlaceholder: "You are a professional translator...", cancel: "Cancel", save: "Save", configSuccess: "Config loaded successfully!", configEmpty: "Config is empty or has invalid format", configError: "Failed to load config: ", newPrompt: "New Prompt", apiKeyMissing: "Please provide an API key in the 'Settings' tab." }, vt = { newChat: "New Chat", oldChat: "Old Chat", defaultPromptName: "Default", defaultPromptContent: "You are a helpful AI assistant. Answer briefly and to the point. Format code and text in Markdown.", abortedRes: "Request aborted.", emptyRes: "Empty response" }, $t = {
  ai: xt,
  chat: kt,
  topics: Vt,
  settings: yt,
  store: vt
}, Et = { title: "AI Assistant", chat: "Чат", topics: "Топики", settings: "Настройки", openInPage: "Открыть на отдельной странице", fullscreen: "На весь экран", windowed: "Оконный режим", minimize: "Свернуть в фон", close: "Закрыть" }, Nt = { emptyState: "Новый диалог начат. Напишите первый запрос!", generating: "Генерация ответа...", error: "Ошибка", aborted: "Отменено", placeholder: "Напишите сообщение...", clearChat: "Очистить чат", newTopic: "Новый топик", promptSelect: "Выбор промпта", promptTitle: "Промпт", modelSelect: "Выбор модели", modelTitle: "Модель", cancel: "Отменить", send: "Отправить", unknown: "Неизвестно", clearConfirm: "Очистить текущий чат?" }, Tt = { title: "Ваши диалоги", newChat: "+ Новый чат", empty: "У вас еще нет сохраненных чатов.", messages: "сообщений", delete: "Удалить" }, Ct = { loadConfig: "Загрузить конфиг", loading: "Загрузка...", systemPrompts: "Ваши системные промпты", add: "+ Добавить", promptName: "Название промпта", promptPlaceholder: "Ты профессиональный переводчик...", cancel: "Отмена", save: "Сохранить", configSuccess: "Конфиг успешно загружен!", configEmpty: "Конфиг пуст или имеет неверный формат", configError: "Не удалось загрузить конфиг: ", newPrompt: "Новый промпт", apiKeyMissing: "Пожалуйста, укажите API ключ на вкладке 'Настройки'." }, _t = { newChat: "Новый чат", oldChat: "Старый чат", defaultPromptName: "Стандартный", defaultPromptContent: "Ты полезный AI-ассистент. Отвечай кратко и по делу. Форматируй код и текст в Markdown.", abortedRes: "Запрос отменен.", emptyRes: "Пустой ответ" }, St = {
  ai: Et,
  chat: Nt,
  topics: Tt,
  settings: Ct,
  store: _t
}, $e = { ru: St, en: $t, cn: bt }, Q = window.Vue.ref("ru");
function zt(a) {
  window.Vue.watch(a, (e) => {
    e && $e[e] && (Q.value = e);
  }, { immediate: !0 });
}
function E() {
  return { t: (e) => {
    const n = e.split(".");
    let t = $e[Q.value];
    for (const o of n) {
      if (t == null)
        break;
      t = t[o];
    }
    return typeof t == "string" ? t : e;
  }, locale: Q };
}
const te = [
  "gemini-3.1-flash-lite-preview",
  "gemini-3-flash-preview",
  "gpt-5.4-nano",
  "qwen3.5-397b-a17b"
], s = window.Vue.reactive({
  isOpen: !1,
  isMinimized: !1,
  isFullscreen: !1,
  activeTab: "chat",
  apiKey: "",
  isLoading: !1,
  isInitialized: !1,
  userPrompt: "",
  topics: [],
  currentTopicId: null,
  systemPrompts: [],
  selectedPromptId: "default",
  selectedModel: te[0],
  router: null,
  vaultId: "",
  vaultUrl: "",
  showToast: null,
  confirm: null,
  getFileContent: null
}), k = {
  setContext(a) {
    s.router = a.router, s.vaultId = a.vaultId, s.vaultUrl = a.vaultUrl, s.showToast = a.showToast, s.confirm = a.confirm, s.getFileContent = a.getFileContent;
  },
  open() {
    s.isOpen = !0, s.isMinimized = !1;
  },
  close() {
    s.isOpen = !1, s.isMinimized = !1;
  },
  minimize() {
    s.isMinimized = !0, s.isOpen = !1;
  },
  toggle() {
    s.isOpen ? this.close() : this.open();
  },
  toggleFullscreen() {
    s.isFullscreen = !s.isFullscreen;
  },
  createNewTopic() {
    const { t: a } = E(), e = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`,
      title: a("store.newChat"),
      history: [],
      updatedAt: Date.now()
    };
    s.topics.unshift(e), s.currentTopicId = e.id, s.activeTab = "chat";
  },
  selectTopic(a) {
    s.currentTopicId = a, s.activeTab = "chat";
  },
  deleteTopic(a) {
    s.topics = s.topics.filter((e) => e.id !== a), s.currentTopicId === a && (s.currentTopicId = s.topics.length > 0 ? s.topics[0].id : null);
  },
  async clearCurrentTopic() {
    const { t: a } = E(), e = this.getCurrentTopic();
    let n = !1;
    s.confirm ? n = await s.confirm(a("chat.clearConfirm")) : n = confirm(a("chat.clearConfirm")), e && n && (e.history = [], e.updatedAt = Date.now());
  },
  getCurrentTopic() {
    return s.topics.find((a) => a.id === s.currentTopicId);
  },
  addPrompt(a, e) {
    const n = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
    s.systemPrompts.push({ id: n, name: a, content: e });
  },
  updatePrompt(a, e, n) {
    const t = s.systemPrompts.find((o) => o.id === a);
    t && (t.name = e, t.content = n);
  },
  deletePrompt(a) {
    a !== "default" && (s.systemPrompts = s.systemPrompts.filter((e) => e.id !== a), s.selectedPromptId === a && (s.selectedPromptId = "default"));
  }
};
function Ee() {
  if (s.isInitialized)
    return;
  const { t: a } = E();
  s.apiKey = localStorage.getItem("wm-ai-apikey") || "", s.selectedModel = localStorage.getItem("wm-ai-model") || te[0];
  const e = localStorage.getItem("wm-ai-prompts");
  if (e) {
    const o = JSON.parse(e), r = /* @__PURE__ */ new Set();
    o.forEach((i) => {
      r.has(i.id) && (i.id = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`), r.add(i.id);
    }), s.systemPrompts = o;
  } else {
    const o = localStorage.getItem("wm-ai-sysprompt");
    s.systemPrompts = [{
      id: "default",
      name: a("store.defaultPromptName"),
      content: o || a("store.defaultPromptContent")
    }];
  }
  s.selectedPromptId = localStorage.getItem("wm-ai-selected-prompt") || s.systemPrompts[0].id;
  const n = localStorage.getItem("wm-ai-topics");
  if (n)
    s.topics = JSON.parse(n);
  else {
    const o = localStorage.getItem("wm-ai-history");
    o && (s.topics = [{
      id: `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`,
      title: a("store.oldChat"),
      history: JSON.parse(o),
      updatedAt: Date.now()
    }]);
  }
  const t = localStorage.getItem("wm-ai-current-topic");
  t && s.topics.some((o) => o.id === t) ? s.currentTopicId = t : s.topics.length > 0 && (s.currentTopicId = s.topics[0].id), s.isInitialized = !0, window.Vue.watch(() => s.apiKey, (o) => localStorage.setItem("wm-ai-apikey", o)), window.Vue.watch(() => s.selectedModel, (o) => localStorage.setItem("wm-ai-model", o)), window.Vue.watch(() => s.selectedPromptId, (o) => localStorage.setItem("wm-ai-selected-prompt", o)), window.Vue.watch(() => s.systemPrompts, (o) => localStorage.setItem("wm-ai-prompts", JSON.stringify(o)), { deep: !0 }), window.Vue.watch(() => s.topics, (o) => localStorage.setItem("wm-ai-topics", JSON.stringify(o)), { deep: !0 }), window.Vue.watch(() => s.currentTopicId, (o) => {
    o && localStorage.setItem("wm-ai-current-topic", o);
  });
}
let B = null;
async function Bt(a, e) {
  var l, c, w;
  if (!a.trim() || s.isLoading)
    return;
  const { t: n } = E();
  if (!s.apiKey) {
    s.activeTab = "settings", alert(n("settings.apiKeyMissing"));
    return;
  }
  s.currentTopicId || k.createNewTopic();
  const t = k.getCurrentTopic();
  if (!t)
    return;
  (t.title === n("store.newChat") || t.title === n("store.oldChat")) && (t.title = a.length > 30 ? `${a.slice(0, 30)}...` : a);
  const r = [
    { role: "system", content: (s.systemPrompts.find((d) => d.id === s.selectedPromptId) || s.systemPrompts[0]).content }
  ];
  for (const d of t.history)
    d.status === "success" && (r.push({ role: "user", content: d.prompt }), d.response && r.push({ role: "assistant", content: d.response }));
  r.push({ role: "user", content: a });
  const i = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
  t.history.push({
    id: i,
    prompt: a,
    response: "",
    status: "loading",
    date: Date.now()
  }), t.updatedAt = Date.now(), s.isLoading = !0, B = new AbortController(), e();
  try {
    const d = await fetch("https://api.aihubmix.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${s.apiKey}`
      },
      body: JSON.stringify({
        model: s.selectedModel,
        messages: r
      }),
      signal: B.signal
    });
    if (!d.ok)
      throw new Error(`API Error: ${d.status}`);
    const u = ((w = (c = (l = (await d.json()).choices) == null ? void 0 : l[0]) == null ? void 0 : c.message) == null ? void 0 : w.content) || n("store.emptyRes");
    F(i, { response: u, status: "success" });
  } catch (d) {
    d.name === "AbortError" ? F(i, { response: n("store.abortedRes"), status: "aborted" }) : F(i, { response: `${n("chat.error")}: ${d.message}`, status: "error" });
  } finally {
    s.isLoading = !1, B = null, t.updatedAt = Date.now(), e();
  }
}
function F(a, e) {
  const n = k.getCurrentTopic();
  if (!n)
    return;
  const t = n.history.findIndex((o) => o.id === a);
  t !== -1 && (n.history[t] = { ...n.history[t], ...e });
}
function pe() {
  B && B.abort();
}
const It = {
  key: 0,
  style: { "text-align": "center", color: "var(--fg-muted-color)", "margin-top": "40px" }
}, Pt = { class: "ai-prompt-bubble" }, Mt = {
  key: 0,
  class: "ai-status loading"
}, At = ["innerHTML"], Rt = { class: "ai-input-area" }, Dt = { class: "ai-input-box" }, Lt = ["placeholder", "onKeydown"], Ot = { class: "ai-input-bottom" }, qt = { class: "ai-tools-left" }, Ht = ["title"], jt = ["title"], Ft = { class: "ai-dropdown-wrap" }, Zt = ["title"], Kt = { class: "tool-text" }, Qt = {
  key: 0,
  class: "ai-dropdown"
}, Ut = { class: "dropdown-title" }, Jt = ["onClick"], Yt = { class: "ai-dropdown-wrap" }, Wt = ["title"], Gt = { class: "tool-text" }, Xt = {
  key: 0,
  class: "ai-dropdown"
}, en = { class: "dropdown-title" }, tn = ["onClick"], nn = { class: "ai-tools-right" }, on = ["title"], rn = ["title"], Ne = /* @__PURE__ */ window.Vue.defineComponent({
  __name: "ai-chat",
  setup(a) {
    const { t: e } = E(), n = window.Vue.ref(null), t = window.Vue.ref(!1), o = window.Vue.ref(!1), r = window.Vue.computed(() => k.getCurrentTopic()), i = window.Vue.computed(() => {
      var h;
      return ((h = s.systemPrompts.find((f) => f.id === s.selectedPromptId)) == null ? void 0 : h.name) || e("chat.unknown");
    });
    function l() {
      window.Vue.nextTick(() => {
        n.value && (n.value.scrollTop = n.value.scrollHeight);
      });
    }
    window.Vue.watch(() => s.isOpen, (h) => {
      h && s.activeTab === "chat" && l();
    }), window.Vue.watch(() => s.currentTopicId, () => l());
    function c(h) {
      try {
        return m.parse(h);
      } catch {
        return h;
      }
    }
    function w() {
      const h = s.userPrompt.trim();
      h && (s.userPrompt = "", Bt(h, l));
    }
    function d(h) {
      s.selectedModel = h, o.value = !1;
    }
    function p(h) {
      s.selectedPromptId = h, t.value = !1;
    }
    function u() {
      t.value = !1, o.value = !1;
    }
    return (h, f) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
      class: "ai-tab-view",
      onClick: u
    }, [
      window.Vue.createElementVNode("div", {
        ref_key: "chatBodyRef",
        ref: n,
        class: "ai-body"
      }, [
        !r.value || r.value.history.length === 0 ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", It, window.Vue.toDisplayString(window.Vue.unref(e)("chat.emptyState")), 1)) : window.Vue.createCommentVNode("", !0),
        r.value ? (window.Vue.openBlock(!0), window.Vue.createElementBlock(window.Vue.Fragment, { key: 1 }, window.Vue.renderList(r.value.history, (g) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
          key: g.id,
          class: "ai-history-item"
        }, [
          window.Vue.createElementVNode("div", Pt, window.Vue.toDisplayString(g.prompt), 1),
          g.status === "loading" ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", Mt, window.Vue.toDisplayString(window.Vue.unref(e)("chat.generating")), 1)) : (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
            key: 1,
            class: "ai-response-bubble ai-md-content markdown-body",
            innerHTML: c(g.response)
          }, null, 8, At)),
          window.Vue.createElementVNode("div", {
            class: window.Vue.normalizeClass(["ai-status", g.status])
          }, window.Vue.toDisplayString(g.status === "error" ? window.Vue.unref(e)("chat.error") : g.status === "aborted" ? window.Vue.unref(e)("chat.aborted") : new Date(g.date).toLocaleTimeString()), 3)
        ]))), 128)) : window.Vue.createCommentVNode("", !0)
      ], 512),
      window.Vue.createElementVNode("div", Rt, [
        window.Vue.createElementVNode("div", Dt, [
          window.Vue.withDirectives(window.Vue.createElementVNode("textarea", {
            "onUpdate:modelValue": f[0] || (f[0] = (g) => window.Vue.unref(s).userPrompt = g),
            class: "ai-textarea custom-scrollbar",
            placeholder: window.Vue.unref(e)("chat.placeholder"),
            onKeydown: window.Vue.withKeys(window.Vue.withModifiers(w, ["ctrl", "prevent"]), ["enter"])
          }, null, 40, Lt), [
            [window.Vue.vModelText, window.Vue.unref(s).userPrompt]
          ]),
          window.Vue.createElementVNode("div", Ot, [
            window.Vue.createElementVNode("div", qt, [
              window.Vue.createElementVNode("button", {
                class: "ai-tool-btn shrink-none",
                title: window.Vue.unref(e)("chat.clearChat"),
                onClick: f[1] || (f[1] = window.Vue.withModifiers((g) => window.Vue.unref(k).clearCurrentTopic(), ["stop"]))
              }, [...f[6] || (f[6] = [
                window.Vue.createElementVNode("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  window.Vue.createElementVNode("polyline", { points: "3 6 5 6 21 6" }),
                  window.Vue.createElementVNode("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
                ], -1)
              ])], 8, Ht),
              window.Vue.createElementVNode("button", {
                class: "ai-tool-btn shrink-none",
                title: window.Vue.unref(e)("chat.newTopic"),
                onClick: f[2] || (f[2] = window.Vue.withModifiers((g) => window.Vue.unref(k).createNewTopic(), ["stop"]))
              }, [...f[7] || (f[7] = [
                window.Vue.createElementVNode("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  window.Vue.createElementVNode("rect", {
                    x: "3",
                    y: "3",
                    width: "18",
                    height: "18",
                    rx: "2",
                    ry: "2"
                  }),
                  window.Vue.createElementVNode("line", {
                    x1: "12",
                    y1: "8",
                    x2: "12",
                    y2: "16"
                  }),
                  window.Vue.createElementVNode("line", {
                    x1: "8",
                    y1: "12",
                    x2: "16",
                    y2: "12"
                  })
                ], -1)
              ])], 8, jt),
              window.Vue.createElementVNode("div", Ft, [
                window.Vue.createElementVNode("button", {
                  class: "ai-tool-btn",
                  title: window.Vue.unref(e)("chat.promptSelect"),
                  onClick: f[3] || (f[3] = window.Vue.withModifiers((g) => {
                    t.value = !t.value, o.value = !1;
                  }, ["stop"]))
                }, [
                  f[8] || (f[8] = window.Vue.createElementVNode("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    class: "shrink-none"
                  }, [
                    window.Vue.createElementVNode("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
                  ], -1)),
                  window.Vue.createElementVNode("span", Kt, window.Vue.toDisplayString(i.value), 1)
                ], 8, Zt),
                t.value ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", Qt, [
                  window.Vue.createElementVNode("div", Ut, window.Vue.toDisplayString(window.Vue.unref(e)("chat.promptTitle")), 1),
                  (window.Vue.openBlock(!0), window.Vue.createElementBlock(window.Vue.Fragment, null, window.Vue.renderList(window.Vue.unref(s).systemPrompts, (g) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
                    key: g.id,
                    class: window.Vue.normalizeClass(["dropdown-item", { "is-active": g.id === window.Vue.unref(s).selectedPromptId }]),
                    onClick: window.Vue.withModifiers(($) => p(g.id), ["stop"])
                  }, window.Vue.toDisplayString(g.name), 11, Jt))), 128))
                ])) : window.Vue.createCommentVNode("", !0)
              ]),
              window.Vue.createElementVNode("div", Yt, [
                window.Vue.createElementVNode("button", {
                  class: "ai-tool-btn",
                  title: window.Vue.unref(e)("chat.modelSelect"),
                  onClick: f[4] || (f[4] = window.Vue.withModifiers((g) => {
                    o.value = !o.value, t.value = !1;
                  }, ["stop"]))
                }, [
                  f[9] || (f[9] = window.Vue.createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-none"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>', 1)),
                  window.Vue.createElementVNode("span", Gt, window.Vue.toDisplayString(window.Vue.unref(s).selectedModel), 1)
                ], 8, Wt),
                o.value ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", Xt, [
                  window.Vue.createElementVNode("div", en, window.Vue.toDisplayString(window.Vue.unref(e)("chat.modelTitle")), 1),
                  (window.Vue.openBlock(!0), window.Vue.createElementBlock(window.Vue.Fragment, null, window.Vue.renderList(window.Vue.unref(te), (g) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
                    key: g,
                    class: window.Vue.normalizeClass(["dropdown-item", { "is-active": g === window.Vue.unref(s).selectedModel }]),
                    onClick: window.Vue.withModifiers(($) => d(g), ["stop"])
                  }, window.Vue.toDisplayString(g), 11, tn))), 128))
                ])) : window.Vue.createCommentVNode("", !0)
              ])
            ]),
            window.Vue.createElementVNode("div", nn, [
              window.Vue.unref(s).isLoading ? (window.Vue.openBlock(), window.Vue.createElementBlock("button", {
                key: 0,
                class: "ai-send-btn is-stop",
                title: window.Vue.unref(e)("chat.cancel"),
                onClick: f[5] || (f[5] = window.Vue.withModifiers(
                  //@ts-ignore
                  (...g) => window.Vue.unref(pe) && window.Vue.unref(pe)(...g),
                  ["stop"]
                ))
              }, [...f[10] || (f[10] = [
                window.Vue.createElementVNode("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "currentColor"
                }, [
                  window.Vue.createElementVNode("rect", {
                    x: "6",
                    y: "6",
                    width: "12",
                    height: "12",
                    rx: "2"
                  })
                ], -1)
              ])], 8, on)) : (window.Vue.openBlock(), window.Vue.createElementBlock("button", {
                key: 1,
                class: window.Vue.normalizeClass(["ai-send-btn", { "is-ready": window.Vue.unref(s).userPrompt.trim() }]),
                title: window.Vue.unref(e)("chat.send"),
                onClick: window.Vue.withModifiers(w, ["stop"])
              }, [...f[11] || (f[11] = [
                window.Vue.createElementVNode("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, [
                  window.Vue.createElementVNode("line", {
                    x1: "22",
                    y1: "2",
                    x2: "11",
                    y2: "13"
                  }),
                  window.Vue.createElementVNode("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                ], -1)
              ])], 10, rn))
            ])
          ])
        ])
      ])
    ]));
  }
}), sn = { class: "ai-tab-view" }, an = { class: "ai-body custom-scrollbar" }, ln = { class: "ai-settings" }, cn = { class: "settings-block" }, dn = { class: "topics-header" }, un = ["disabled"], pn = { class: "settings-block" }, wn = { class: "topics-header" }, hn = { style: { margin: "0" } }, gn = {
  key: 0,
  class: "prompt-editor"
}, fn = ["placeholder"], mn = ["placeholder"], bn = { class: "editor-actions" }, xn = { class: "prompts-list" }, kn = { class: "prompt-info" }, Vn = { class: "prompt-name" }, yn = { class: "prompt-preview" }, vn = { class: "prompt-actions" }, $n = ["onClick"], En = ["onClick"], Te = /* @__PURE__ */ window.Vue.defineComponent({
  __name: "ai-settings",
  setup(a) {
    const { t: e } = E(), n = window.Vue.ref(null), t = window.Vue.ref(""), o = window.Vue.ref(""), r = window.Vue.ref(!1);
    function i() {
      n.value = "new", t.value = e("settings.newPrompt"), o.value = "";
    }
    function l(d) {
      n.value = d.id, t.value = d.name, o.value = d.content;
    }
    function c() {
      !t.value.trim() || !o.value.trim() || (n.value === "new" ? k.addPrompt(t.value, o.value) : n.value && k.updatePrompt(n.value, t.value, o.value), n.value = null);
    }
    async function w() {
      r.value = !0;
      try {
        const d = `meta/${s.vaultId}/plugins/configs/ai-assistant.json`;
        let p = null;
        if (s.getFileContent && (p = await s.getFileContent(d)), !p) {
          const f = `${s.vaultUrl}/${d}`, g = await fetch(f);
          if (!g.ok)
            throw new Error(`HTTP: ${g.status}`);
          p = await g.text();
        }
        const u = JSON.parse(p);
        let h = !1;
        u.apiKey && (s.apiKey = u.apiKey, h = !0), u.prompts && Array.isArray(u.prompts) && (u.prompts.forEach((f) => {
          s.systemPrompts.some((g) => g.name === f.name) || k.addPrompt(f.name || e("chat.unknown"), f.content || "");
        }), h = !0), h ? s.showToast ? s.showToast(e("settings.configSuccess"), { type: "success" }) : alert(e("settings.configSuccess")) : s.showToast ? s.showToast(e("settings.configEmpty"), { type: "warning" }) : alert(e("settings.configEmpty"));
      } catch (d) {
        s.showToast ? s.showToast(`${e("settings.configError")}${d.message}`, { type: "error" }) : alert(`${e("settings.configError")}${d.message}`);
      } finally {
        r.value = !1;
      }
    }
    return (d, p) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", sn, [
      window.Vue.createElementVNode("div", an, [
        window.Vue.createElementVNode("div", ln, [
          window.Vue.createElementVNode("div", cn, [
            window.Vue.createElementVNode("div", dn, [
              p[4] || (p[4] = window.Vue.createElementVNode("label", { style: { margin: "0" } }, "API Key (AiHubMix)", -1)),
              window.Vue.createElementVNode("button", {
                class: "ai-btn ai-btn-sm",
                disabled: r.value,
                onClick: w
              }, window.Vue.toDisplayString(r.value ? window.Vue.unref(e)("settings.loading") : window.Vue.unref(e)("settings.loadConfig")), 9, un)
            ]),
            window.Vue.withDirectives(window.Vue.createElementVNode("input", {
              "onUpdate:modelValue": p[0] || (p[0] = (u) => window.Vue.unref(s).apiKey = u),
              type: "password",
              placeholder: "sk-...",
              class: "editor-input"
            }, null, 512), [
              [window.Vue.vModelText, window.Vue.unref(s).apiKey]
            ])
          ]),
          window.Vue.createElementVNode("div", pn, [
            window.Vue.createElementVNode("div", wn, [
              window.Vue.createElementVNode("label", hn, window.Vue.toDisplayString(window.Vue.unref(e)("settings.systemPrompts")), 1),
              window.Vue.createElementVNode("button", {
                class: "ai-btn ai-btn-primary ai-btn-sm",
                onClick: i
              }, window.Vue.toDisplayString(window.Vue.unref(e)("settings.add")), 1)
            ]),
            n.value ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", gn, [
              window.Vue.withDirectives(window.Vue.createElementVNode("input", {
                "onUpdate:modelValue": p[1] || (p[1] = (u) => t.value = u),
                placeholder: window.Vue.unref(e)("settings.promptName"),
                class: "editor-input"
              }, null, 8, fn), [
                [window.Vue.vModelText, t.value]
              ]),
              window.Vue.withDirectives(window.Vue.createElementVNode("textarea", {
                "onUpdate:modelValue": p[2] || (p[2] = (u) => o.value = u),
                rows: "4",
                placeholder: window.Vue.unref(e)("settings.promptPlaceholder"),
                class: "editor-input custom-scrollbar"
              }, null, 8, mn), [
                [window.Vue.vModelText, o.value]
              ]),
              window.Vue.createElementVNode("div", bn, [
                window.Vue.createElementVNode("button", {
                  class: "ai-btn ai-btn-sm",
                  onClick: p[3] || (p[3] = (u) => n.value = null)
                }, window.Vue.toDisplayString(window.Vue.unref(e)("settings.cancel")), 1),
                window.Vue.createElementVNode("button", {
                  class: "ai-btn ai-btn-primary ai-btn-sm",
                  onClick: c
                }, window.Vue.toDisplayString(window.Vue.unref(e)("settings.save")), 1)
              ])
            ])) : window.Vue.createCommentVNode("", !0),
            window.Vue.createElementVNode("div", xn, [
              (window.Vue.openBlock(!0), window.Vue.createElementBlock(window.Vue.Fragment, null, window.Vue.renderList(window.Vue.unref(s).systemPrompts, (u) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
                key: u.id,
                class: "prompt-card"
              }, [
                window.Vue.createElementVNode("div", kn, [
                  window.Vue.createElementVNode("div", Vn, window.Vue.toDisplayString(u.name), 1),
                  window.Vue.createElementVNode("div", yn, window.Vue.toDisplayString(u.content), 1)
                ]),
                window.Vue.createElementVNode("div", vn, [
                  window.Vue.createElementVNode("button", {
                    class: "ai-icon-btn",
                    onClick: (h) => l(u)
                  }, [...p[5] || (p[5] = [
                    window.Vue.createElementVNode("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      window.Vue.createElementVNode("path", { d: "M12 20h9" }),
                      window.Vue.createElementVNode("path", { d: "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" })
                    ], -1)
                  ])], 8, $n),
                  u.id !== "default" ? (window.Vue.openBlock(), window.Vue.createElementBlock("button", {
                    key: 0,
                    class: "ai-icon-btn danger",
                    onClick: (h) => window.Vue.unref(k).deletePrompt(u.id)
                  }, [...p[6] || (p[6] = [
                    window.Vue.createElementVNode("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      window.Vue.createElementVNode("line", {
                        x1: "18",
                        y1: "6",
                        x2: "6",
                        y2: "18"
                      }),
                      window.Vue.createElementVNode("line", {
                        x1: "6",
                        y1: "6",
                        x2: "18",
                        y2: "18"
                      })
                    ], -1)
                  ])], 8, En)) : window.Vue.createCommentVNode("", !0)
                ])
              ]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}), Nn = { class: "ai-tab-view" }, Tn = { class: "ai-body custom-scrollbar" }, Cn = { class: "ai-topics" }, _n = { class: "topics-header" }, Sn = {
  key: 0,
  class: "topics-empty"
}, zn = { class: "topics-list" }, Bn = ["onClick"], In = { class: "topic-info" }, Pn = { class: "topic-title" }, Mn = { class: "topic-meta" }, An = ["title", "onClick"], Ce = /* @__PURE__ */ window.Vue.defineComponent({
  __name: "ai-topics",
  setup(a) {
    const { t: e } = E();
    function n(t) {
      return new Date(t).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    return (t, o) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", Nn, [
      window.Vue.createElementVNode("div", Tn, [
        window.Vue.createElementVNode("div", Cn, [
          window.Vue.createElementVNode("div", _n, [
            window.Vue.createElementVNode("h3", null, window.Vue.toDisplayString(window.Vue.unref(e)("topics.title")), 1),
            window.Vue.createElementVNode("button", {
              class: "ai-btn ai-btn-primary ai-btn-sm",
              onClick: o[0] || (o[0] = (r) => window.Vue.unref(k).createNewTopic())
            }, window.Vue.toDisplayString(window.Vue.unref(e)("topics.newChat")), 1)
          ]),
          window.Vue.unref(s).topics.length === 0 ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", Sn, window.Vue.toDisplayString(window.Vue.unref(e)("topics.empty")), 1)) : window.Vue.createCommentVNode("", !0),
          window.Vue.createElementVNode("div", zn, [
            (window.Vue.openBlock(!0), window.Vue.createElementBlock(window.Vue.Fragment, null, window.Vue.renderList(window.Vue.unref(s).topics, (r) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
              key: r.id,
              class: window.Vue.normalizeClass(["topic-card", { "is-active": r.id === window.Vue.unref(s).currentTopicId }]),
              onClick: (i) => window.Vue.unref(k).selectTopic(r.id)
            }, [
              window.Vue.createElementVNode("div", In, [
                window.Vue.createElementVNode("div", Pn, window.Vue.toDisplayString(r.title), 1),
                window.Vue.createElementVNode("div", Mn, [
                  window.Vue.createElementVNode("span", null, window.Vue.toDisplayString(r.history.length) + " " + window.Vue.toDisplayString(window.Vue.unref(e)("topics.messages")), 1),
                  o[1] || (o[1] = window.Vue.createElementVNode("span", null, "•", -1)),
                  window.Vue.createElementVNode("span", null, window.Vue.toDisplayString(n(r.updatedAt)), 1)
                ])
              ]),
              window.Vue.createElementVNode("button", {
                class: "topic-delete-btn",
                title: window.Vue.unref(e)("topics.delete"),
                onClick: window.Vue.withModifiers((i) => window.Vue.unref(k).deleteTopic(r.id), ["stop"])
              }, [...o[2] || (o[2] = [
                window.Vue.createElementVNode("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  window.Vue.createElementVNode("polyline", { points: "3 6 5 6 21 6" }),
                  window.Vue.createElementVNode("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
                ], -1)
              ])], 8, An)
            ], 10, Bn))), 128))
          ])
        ])
      ])
    ]));
  }
}), Rn = ["title"], Dn = {
  key: 0,
  class: "ai-indicator"
}, Ln = {
  key: 0,
  class: "ai-indicator",
  style: { position: "static" }
}, On = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, qn = { class: "ai-header" }, Hn = { class: "ai-title" }, jn = { class: "ai-header-actions" }, Fn = ["title"], Zn = ["title"], Kn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Qn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Un = ["title"], Jn = ["title"], Yn = { class: "ai-tabs" }, Wn = { class: "ai-tabs-content" }, Gn = /* @__PURE__ */ window.Vue.defineComponent({
  name: "AiAssistantWidget",
  inheritAttrs: !1,
  __name: "ai-assistant",
  setup(a) {
    const { t: e } = E();
    window.Vue.onMounted(() => Ee());
    function n() {
      k.close(), s.router && s.vaultId && s.router.push(`/${s.vaultId}/plugin/ai-assistant`);
    }
    return (t, o) => (window.Vue.openBlock(), window.Vue.createElementBlock(window.Vue.Fragment, null, [
      window.Vue.createElementVNode("button", window.Vue.mergeProps(t.$attrs, {
        type: "button",
        class: "ai-trigger",
        title: window.Vue.unref(e)("ai.title"),
        onClick: o[0] || (o[0] = window.Vue.withModifiers((r) => window.Vue.unref(k).toggle(), ["stop", "prevent"]))
      }), [
        o[9] || (o[9] = window.Vue.createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>', 1)),
        window.Vue.unref(s).isLoading && !window.Vue.unref(s).isOpen ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", Dn)) : window.Vue.createCommentVNode("", !0)
      ], 16, Rn),
      (window.Vue.openBlock(), window.Vue.createBlock(window.Vue.Teleport, { to: "body" }, [
        window.Vue.unref(s).isMinimized ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
          key: 0,
          class: "ai-minimized-widget",
          onClick: o[1] || (o[1] = window.Vue.withModifiers((r) => window.Vue.unref(k).open(), ["stop"]))
        }, [
          window.Vue.unref(s).isLoading ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", Ln)) : (window.Vue.openBlock(), window.Vue.createElementBlock("svg", On, [...o[10] || (o[10] = [
            window.Vue.createElementVNode("path", { d: "M12 8V4H8" }, null, -1),
            window.Vue.createElementVNode("rect", {
              x: "4",
              y: "8",
              width: "16",
              height: "12",
              rx: "2"
            }, null, -1)
          ])])),
          window.Vue.createElementVNode("span", null, window.Vue.toDisplayString(window.Vue.unref(s).isLoading ? window.Vue.unref(e)("ai.thinking") : window.Vue.unref(e)("ai.title")), 1)
        ])) : window.Vue.createCommentVNode("", !0),
        window.Vue.createVNode(window.Vue.Transition, { name: "ai-fade" }, {
          default: window.Vue.withCtx(() => [
            window.Vue.unref(s).isOpen ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
              key: 0,
              class: "ai-backdrop",
              onMousedown: o[8] || (o[8] = window.Vue.withModifiers((r) => window.Vue.unref(k).close(), ["self"]))
            }, [
              window.Vue.createElementVNode("div", {
                class: window.Vue.normalizeClass(["ai-modal", { "is-fullscreen": window.Vue.unref(s).isFullscreen }])
              }, [
                window.Vue.createElementVNode("div", qn, [
                  window.Vue.createElementVNode("div", Hn, [
                    o[11] || (o[11] = window.Vue.createElementVNode("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "20",
                      height: "20",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      window.Vue.createElementVNode("path", { d: "M12 8V4H8" }),
                      window.Vue.createElementVNode("rect", {
                        x: "4",
                        y: "8",
                        width: "16",
                        height: "12",
                        rx: "2"
                      })
                    ], -1)),
                    window.Vue.createTextVNode(" " + window.Vue.toDisplayString(window.Vue.unref(e)("ai.title")), 1)
                  ]),
                  window.Vue.createElementVNode("div", jn, [
                    window.Vue.createElementVNode("button", {
                      class: "ai-icon-btn",
                      title: window.Vue.unref(e)("ai.openInPage"),
                      type: "button",
                      onClick: window.Vue.withModifiers(n, ["stop"])
                    }, [...o[12] || (o[12] = [
                      window.Vue.createElementVNode("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        window.Vue.createElementVNode("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
                        window.Vue.createElementVNode("polyline", { points: "15 3 21 3 21 9" }),
                        window.Vue.createElementVNode("line", {
                          x1: "10",
                          y1: "14",
                          x2: "21",
                          y2: "3"
                        })
                      ], -1)
                    ])], 8, Fn),
                    window.Vue.createElementVNode("button", {
                      class: "ai-icon-btn",
                      title: window.Vue.unref(s).isFullscreen ? window.Vue.unref(e)("ai.windowed") : window.Vue.unref(e)("ai.fullscreen"),
                      type: "button",
                      onClick: o[2] || (o[2] = window.Vue.withModifiers((r) => window.Vue.unref(k).toggleFullscreen(), ["stop"]))
                    }, [
                      window.Vue.unref(s).isFullscreen ? (window.Vue.openBlock(), window.Vue.createElementBlock("svg", Qn, [...o[14] || (o[14] = [
                        window.Vue.createElementVNode("path", { d: "M8 3v3a2 2 0 0 1-2 2H3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M16 3v3a2 2 0 0 0 2 2h3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M8 21v-3a2 2 0 0 0-2-2H3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M16 21v-3a2 2 0 0 1 2-2h3" }, null, -1)
                      ])])) : (window.Vue.openBlock(), window.Vue.createElementBlock("svg", Kn, [...o[13] || (o[13] = [
                        window.Vue.createElementVNode("path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M16 3h3a2 2 0 0 1 2 2v3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M8 21H5a2 2 0 0 1-2-2v-3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" }, null, -1)
                      ])]))
                    ], 8, Zn),
                    window.Vue.createElementVNode("button", {
                      class: "ai-icon-btn",
                      title: window.Vue.unref(e)("ai.minimize"),
                      type: "button",
                      onClick: o[3] || (o[3] = window.Vue.withModifiers((r) => window.Vue.unref(k).minimize(), ["stop"]))
                    }, [...o[15] || (o[15] = [
                      window.Vue.createElementVNode("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "18",
                        height: "18",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        window.Vue.createElementVNode("polyline", { points: "4 14 10 14 10 20" }),
                        window.Vue.createElementVNode("polyline", { points: "20 10 14 10 14 4" }),
                        window.Vue.createElementVNode("line", {
                          x1: "14",
                          y1: "10",
                          x2: "21",
                          y2: "3"
                        }),
                        window.Vue.createElementVNode("line", {
                          x1: "3",
                          y1: "21",
                          x2: "10",
                          y2: "14"
                        })
                      ], -1)
                    ])], 8, Un),
                    window.Vue.createElementVNode("button", {
                      class: "ai-icon-btn",
                      title: window.Vue.unref(e)("ai.close"),
                      type: "button",
                      onClick: o[4] || (o[4] = window.Vue.withModifiers((r) => window.Vue.unref(k).close(), ["stop"]))
                    }, [...o[16] || (o[16] = [
                      window.Vue.createElementVNode("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "18",
                        height: "18",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        window.Vue.createElementVNode("line", {
                          x1: "18",
                          y1: "6",
                          x2: "6",
                          y2: "18"
                        }),
                        window.Vue.createElementVNode("line", {
                          x1: "6",
                          y1: "6",
                          x2: "18",
                          y2: "18"
                        })
                      ], -1)
                    ])], 8, Jn)
                  ])
                ]),
                window.Vue.createElementVNode("div", Yn, [
                  window.Vue.createElementVNode("button", {
                    class: window.Vue.normalizeClass(["ai-tab", { "is-active": window.Vue.unref(s).activeTab === "chat" }]),
                    onClick: o[5] || (o[5] = (r) => window.Vue.unref(s).activeTab = "chat")
                  }, window.Vue.toDisplayString(window.Vue.unref(e)("ai.chat")), 3),
                  window.Vue.createElementVNode("button", {
                    class: window.Vue.normalizeClass(["ai-tab", { "is-active": window.Vue.unref(s).activeTab === "topics" }]),
                    onClick: o[6] || (o[6] = (r) => window.Vue.unref(s).activeTab = "topics")
                  }, window.Vue.toDisplayString(window.Vue.unref(e)("ai.topics")), 3),
                  window.Vue.createElementVNode("button", {
                    class: window.Vue.normalizeClass(["ai-tab", { "is-active": window.Vue.unref(s).activeTab === "settings" }]),
                    onClick: o[7] || (o[7] = (r) => window.Vue.unref(s).activeTab = "settings")
                  }, window.Vue.toDisplayString(window.Vue.unref(e)("ai.settings")), 3)
                ]),
                window.Vue.createElementVNode("div", Wn, [
                  window.Vue.withDirectives(window.Vue.createVNode(Ne, null, null, 512), [
                    [window.Vue.vShow, window.Vue.unref(s).activeTab === "chat"]
                  ]),
                  window.Vue.unref(s).activeTab === "topics" ? (window.Vue.openBlock(), window.Vue.createBlock(Ce, { key: 0 })) : window.Vue.createCommentVNode("", !0),
                  window.Vue.unref(s).activeTab === "settings" ? (window.Vue.openBlock(), window.Vue.createBlock(Te, { key: 1 })) : window.Vue.createCommentVNode("", !0)
                ])
              ], 2)
            ], 32)) : window.Vue.createCommentVNode("", !0)
          ]),
          _: 1
        })
      ]))
    ], 64));
  }
}), Xn = { class: "ai-page" }, eo = { class: "ai-page-header" }, to = { class: "ai-page-header-actions" }, no = ["title"], oo = { class: "btn-text" }, io = ["title"], ro = { class: "btn-text" }, so = ["title"], ao = { class: "btn-text" }, lo = { class: "ai-page-chat-wrapper" }, co = /* @__PURE__ */ window.Vue.defineComponent({
  __name: "ai-page",
  setup(a) {
    const { t: e } = E();
    return window.Vue.onMounted(() => {
      Ee(), s.activeTab || (s.activeTab = "chat");
    }), (n, t) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", Xn, [
      window.Vue.createElementVNode("div", eo, [
        window.Vue.createElementVNode("h2", null, window.Vue.toDisplayString(window.Vue.unref(e)("ai.title")), 1),
        window.Vue.createElementVNode("div", to, [
          window.Vue.createElementVNode("button", {
            class: window.Vue.normalizeClass(["ai-page-btn", { "is-active": window.Vue.unref(s).activeTab === "chat" }]),
            title: window.Vue.unref(e)("ai.chat"),
            onClick: t[0] || (t[0] = (o) => window.Vue.unref(s).activeTab = "chat")
          }, [
            t[3] || (t[3] = window.Vue.createElementVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              window.Vue.createElementVNode("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
            ], -1)),
            window.Vue.createElementVNode("span", oo, window.Vue.toDisplayString(window.Vue.unref(e)("ai.chat")), 1)
          ], 10, no),
          window.Vue.createElementVNode("button", {
            class: window.Vue.normalizeClass(["ai-page-btn", { "is-active": window.Vue.unref(s).activeTab === "topics" }]),
            title: window.Vue.unref(e)("ai.topics"),
            onClick: t[1] || (t[1] = (o) => window.Vue.unref(s).activeTab = "topics")
          }, [
            t[4] || (t[4] = window.Vue.createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>', 1)),
            window.Vue.createElementVNode("span", ro, window.Vue.toDisplayString(window.Vue.unref(e)("ai.topics")), 1)
          ], 10, io),
          window.Vue.createElementVNode("button", {
            class: window.Vue.normalizeClass(["ai-page-btn", { "is-active": window.Vue.unref(s).activeTab === "settings" }]),
            title: window.Vue.unref(e)("ai.settings"),
            onClick: t[2] || (t[2] = (o) => window.Vue.unref(s).activeTab = "settings")
          }, [
            t[5] || (t[5] = window.Vue.createElementVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              window.Vue.createElementVNode("circle", {
                cx: "12",
                cy: "12",
                r: "3"
              }),
              window.Vue.createElementVNode("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })
            ], -1)),
            window.Vue.createElementVNode("span", ao, window.Vue.toDisplayString(window.Vue.unref(e)("ai.settings")), 1)
          ], 10, so)
        ])
      ]),
      window.Vue.createElementVNode("div", lo, [
        window.Vue.withDirectives(window.Vue.createVNode(Ne, null, null, 512), [
          [window.Vue.vShow, window.Vue.unref(s).activeTab === "chat"]
        ]),
        window.Vue.unref(s).activeTab === "topics" ? (window.Vue.openBlock(), window.Vue.createBlock(Ce, { key: 0 })) : window.Vue.createCommentVNode("", !0),
        window.Vue.unref(s).activeTab === "settings" ? (window.Vue.openBlock(), window.Vue.createBlock(Te, { key: 1 })) : window.Vue.createCommentVNode("", !0)
      ])
    ]));
  }
}), uo = `/* === БАЗОВЫЕ КОНТЕЙНЕРЫ === */
.ai-trigger { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid var(--border-secondary-color); border-radius: 8px; background: transparent; color: var(--fg-secondary-color); cursor: pointer; transition: all 0.2s ease; position: relative; }
.ai-trigger:hover { background: var(--bg-hover-color); color: var(--fg-accent-color); border-color: var(--border-accent-color); }
.ai-indicator { position: absolute; top: -2px; right: -2px; width: 10px; height: 10px; background-color: var(--fg-accent-color); border-radius: 50%; border: 2px solid var(--bg-primary-color); animation: ai-pulse 2s infinite cubic-bezier(0.4, 0, 0.2, 1); }

@keyframes ai-pulse { 
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 var(--bg-accent-overlay-color); } 
  70% { transform: scale(1); box-shadow: 0 0 0 6px transparent; } 
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 transparent; } 
}

.ai-backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(3px); z-index: 99999; display: flex; justify-content: center; align-items: center; padding: 8px; }
.ai-modal { width: 100%; max-width: 680px; height: 85vh; max-height: 800px; background: var(--bg-primary-color); border: 1px solid var(--border-secondary-color); border-radius: 16px; box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.3); display: flex; flex-direction: column; overflow: hidden; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
.ai-modal.is-fullscreen { 
    position: fixed !important; 
    top: 0 !important; 
    left: 0 !important; 
    right: 0 !important; 
    bottom: 0 !important; 
    width: 100vw !important; 
    
    height: 100vh !important;
    height: 100dvh !important; 
    
    max-width: none !important; 
    max-height: none !important; 
    border-radius: 0 !important; 
    margin: 0 !important; 
    transform: none !important; 
}

.ai-modal.is-fullscreen .ai-input-area {
    padding: 0;
}
.ai-modal.is-fullscreen .ai-input-box {
    border: none;
    border-radius: 0;
}

.ai-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; background: var(--bg-secondary-color); border-bottom: 1px solid var(--border-secondary-color); }
.ai-title { font-weight: 600; font-size: 1.05rem; color: var(--fg-primary-color); display: flex; align-items: center; gap: 10px; }
.ai-title svg { color: var(--fg-accent-color); }
.ai-header-actions { display: flex; gap: 4px; }
.ai-icon-btn { background: transparent; border: none; color: var(--fg-secondary-color); cursor: pointer; padding: 6px; border-radius: 6px; display: flex; transition: all 0.2s; }
.ai-icon-btn:hover { background: var(--bg-hover-color); color: var(--fg-primary-color); }
.ai-icon-btn.danger:hover { color: var(--fg-error-color); background: var(--bg-error-color); }

/* === ВКЛАДКИ === */
.ai-tabs { display: flex; gap: 20px; padding: 0 20px; background: var(--bg-secondary-color); border-bottom: 1px solid var(--border-secondary-color); }
.ai-tab { padding: 10px 4px; background: transparent; border: none; color: var(--fg-secondary-color); cursor: pointer; font-weight: 500; font-size: 0.95rem; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.2s; }
.ai-tab:hover { color: var(--fg-primary-color); }
.ai-tab.is-active { color: var(--fg-accent-color); border-bottom-color: var(--fg-accent-color); }
.ai-tabs-content { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
.ai-tab-view { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
.ai-body { 
    flex: 1; 
    overflow-y: auto; 
    padding: 16px 4px; 
    display: flex; 
    flex-direction: column; 
    gap: 20px; 
}

@media (min-width: 768px) {
    .ai-body {
        padding: 16px; 
    }
}

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: var(--bg-tertiary-color); border-radius: 10px; }

/* === ЧАТ (СООБЩЕНИЯ) === */
/* min-width: 0 решает проблему растягивания flex-контейнера таблицами */
.ai-history-item { display: flex; flex-direction: column; gap: 6px; width: 100%; min-width: 0; }
.ai-prompt-bubble { font-weight: 400; color: var(--fg-inverted-color); background: var(--bg-action-hover-color); padding: 10px 16px; border-radius: 18px 18px 4px 18px; align-self: flex-end; max-width: 85%; line-height: 1.5; word-break: break-word; }

.ai-response-bubble { 
    color: var(--fg-primary-color); 
    background: var(--bg-secondary-color); 
    border: 1px solid var(--border-secondary-color); 
    padding: 12px 14px; 
    border-radius: 4px 18px 18px 18px; 
    align-self: flex-start; 
    font-size: 0.95rem; 
    line-height: 1.6;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: auto; /* Позволяет скроллить контент внутри, не ломая верстку */
}

/* Стилизация таблиц в Markdown */
.ai-response-bubble table {
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    display: block; /* Важно для overflow */
    overflow-x: auto; /* Горизонтальный скролл таблицы */
}

.ai-response-bubble table th,
.ai-response-bubble table td {
    border: 1px solid var(--border-secondary-color);
    padding: 8px 12px;
}

.ai-response-bubble table th {
    background-color: var(--bg-hover-color);
    font-weight: 600;
    text-align: left;
}

/* Стилизация блоков кода, чтобы они тоже не ломали верстку */
.ai-response-bubble pre {
    max-width: 100%;
    overflow-x: auto;
    background: var(--bg-primary-color);
    padding: 12px;
    border-radius: 8px;
    border: 1px solid var(--border-secondary-color);
    margin: 12px 0;
}

.ai-response-bubble code {
    font-family: monospace;
    font-size: 0.9em;
}

/* Кастомный горизонтальный скроллбар для таблиц и кода */
.ai-response-bubble::-webkit-scrollbar,
.ai-response-bubble table::-webkit-scrollbar,
.ai-response-bubble pre::-webkit-scrollbar {
    height: 6px;
}
.ai-response-bubble::-webkit-scrollbar-track,
.ai-response-bubble table::-webkit-scrollbar-track,
.ai-response-bubble pre::-webkit-scrollbar-track {
    background: transparent;
}
.ai-response-bubble::-webkit-scrollbar-thumb,
.ai-response-bubble table::-webkit-scrollbar-thumb,
.ai-response-bubble pre::-webkit-scrollbar-thumb {
    background-color: var(--border-secondary-color);
    border-radius: 10px;
}

.ai-status { font-size: 0.75rem; color: var(--fg-muted-color); align-self: flex-start; margin-left: 4px; }
.ai-history-item:has(.ai-prompt-bubble:last-child) .ai-status { align-self: flex-end; margin-right: 4px; }
.ai-status.error { color: var(--fg-error-color); }
.ai-status.loading { color: var(--fg-accent-color); animation: pulse-text 1.5s infinite;}
@keyframes pulse-text { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }

/* === НОВОЕ ПОЛЕ ВВОДА (Modern Chat Input) === */
.ai-input-area { padding: 16px 20px; background: var(--bg-primary-color); border-top: 1px solid var(--border-secondary-color); flex-shrink: 0; }
.ai-input-box { position: relative; background: var(--bg-secondary-color); border: 1px solid var(--border-primary-color); border-radius: 14px; display: flex; flex-direction: column; transition: all 0.2s ease; }
.ai-input-box:focus-within { border-color: var(--fg-accent-color); box-shadow: 0 0 0 3px var(--bg-accent-overlay-color); }

.ai-textarea { width: 100%; min-height: 50px; max-height: 200px; background: transparent; border: none; padding: 14px 16px; padding-bottom: 48px; color: var(--fg-primary-color); font-family: inherit; font-size: 0.95rem; line-height: 1.5; resize: none; outline: none; }
.ai-textarea::placeholder { color: var(--fg-muted-color); }

.ai-input-bottom { position: absolute; bottom: 6px; left: 6px; right: 6px; display: flex; justify-content: space-between; align-items: center; background: color-mix(in srgb, var(--bg-secondary-color) 80%, transparent); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 4px; border-radius: 10px; z-index: 10; }
.ai-tools-left { display: flex; gap: 4px; align-items: center; min-width: 0; flex-shrink: 1; }

/* Кнопки Тулбара */
.ai-tool-btn { display: flex; align-items: center; gap: 6px; background: transparent; border: none; color: var(--fg-secondary-color); padding: 6px 8px; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 0.8rem; min-width: 0; flex-shrink: 1; overflow: hidden; }
.ai-tool-btn:hover { background: var(--bg-hover-color); color: var(--fg-primary-color); }
.shrink-none { flex-shrink: 0; }
.tool-text { display: inline-block; max-width: 60px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; vertical-align: middle; }
@media (min-width: 480px) { .tool-text { max-width: 120px; } }

/* Кнопка отправки */
.ai-send-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 10px; border: none; background: var(--bg-disabled-color); color: var(--fg-muted-color); cursor: pointer; transition: all 0.2s; }
.ai-send-btn.is-ready { background: var(--bg-action-hover-color); color: var(--fg-inverted-color); }
.ai-send-btn.is-ready:hover { transform: scale(1.05); }
.ai-send-btn.is-stop { background: var(--bg-error-color); color: var(--fg-error-color); }

/* Выпадающие меню */
.ai-dropdown-wrap { position: relative; min-width: 0; flex-shrink: 1; display: flex; }
.ai-dropdown { position: absolute; bottom: calc(100% + 8px); left: 0; background: var(--bg-secondary-color); border: 1px solid var(--border-primary-color); box-shadow: 0 8px 24px rgba(0,0,0,0.15); border-radius: 12px; padding: 6px; min-width: 220px; z-index: 100; display: flex; flex-direction: column; gap: 2px; }
.dropdown-title { font-size: 0.7rem; color: var(--fg-muted-color); text-transform: uppercase; padding: 4px 8px; font-weight: 600; letter-spacing: 0.5px; }
.dropdown-item { padding: 8px 10px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; color: var(--fg-primary-color); transition: background 0.1s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
.dropdown-item:hover { background: var(--bg-hover-color); }
.dropdown-item.is-active { background: var(--bg-accent-overlay-color); color: var(--fg-accent-color); font-weight: 500; }

/* === ТОПИКИ === */
.ai-topics { display: flex; flex-direction: column; gap: 16px; padding: 0 16px; }
.topics-header { display: flex; justify-content: space-between; align-items: center; }
.topics-header h3 { margin: 0; font-size: 1.1rem; color: var(--fg-primary-color); }
.topics-empty { text-align: center; padding: 40px 0; color: var(--fg-muted-color); }
.topics-list { display: flex; flex-direction: column; gap: 8px; }
.topic-card { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: var(--bg-secondary-color); border: 1px solid var(--border-primary-color); border-radius: 12px; cursor: pointer; transition: all 0.2s; }
.topic-card:hover { border-color: var(--border-accent-color); }
.topic-card.is-active { border-color: var(--fg-accent-color); background: var(--bg-accent-overlay-color); }
.topic-info { display: flex; flex-direction: column; gap: 4px; }
.topic-title { font-weight: 500; color: var(--fg-primary-color); font-size: 0.95rem; }
.topic-meta { font-size: 0.75rem; color: var(--fg-muted-color); display: flex; gap: 6px; }
.topic-delete-btn { background: transparent; border: none; color: var(--fg-muted-color); padding: 6px; cursor: pointer; border-radius: 6px; opacity: 0; transition: all 0.2s; }
.topic-card:hover .topic-delete-btn { opacity: 1; }
.topic-delete-btn:hover { color: var(--fg-error-color); background: var(--bg-error-color); }

/* === НАСТРОЙКИ И ПРОМПТЫ === */
.ai-btn { padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: 500; font-size: 0.9rem; transition: all 0.2s ease; background: var(--bg-hover-color); color: var(--fg-primary-color); }
.ai-btn:hover { background: var(--bg-tertiary-color); }
.ai-btn-sm { padding: 6px 12px; font-size: 0.8rem; }
.ai-btn-primary { background: var(--fg-accent-color); color: var(--fg-inverted-color); }
.ai-btn-primary:hover { filter: brightness(1.1); }

.ai-settings { display: flex; flex-direction: column; gap: 24px; padding: 0 16px; }
.settings-block { display: flex; flex-direction: column; gap: 12px; }
.settings-block label { display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem; font-weight: 500; color: var(--fg-primary-color); }

.editor-input { background: var(--bg-secondary-color); border: 1px solid var(--border-primary-color); color: var(--fg-primary-color); padding: 10px 12px; border-radius: 8px; outline: none; transition: border 0.2s; font-family: inherit; width: 100%; resize: vertical; }
.editor-input:focus { border-color: var(--fg-accent-color); box-shadow: 0 0 0 2px var(--bg-accent-overlay-color); }

.prompt-editor { background: var(--bg-secondary-color); border: 1px solid var(--border-primary-color); padding: 16px; border-radius: 12px; display: flex; flex-direction: column; gap: 10px; }
.editor-actions { display: flex; justify-content: flex-end; gap: 8px; }

.prompts-list { display: flex; flex-direction: column; gap: 8px; }
.prompt-card { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-secondary-color); border: 1px solid var(--border-primary-color); border-radius: 10px; }
.prompt-info { flex: 1; min-width: 0; }
.prompt-name { font-weight: 500; font-size: 0.9rem; color: var(--fg-primary-color); }
.prompt-preview { font-size: 0.8rem; color: var(--fg-muted-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 4px; }
.prompt-actions { display: flex; gap: 4px; }

/* === МИНИ-ВИДЖЕТ === */
.ai-minimized-widget { position: fixed; bottom: 24px; right: 24px; background: var(--bg-secondary-color); border: 1px solid var(--border-secondary-color); border-radius: 12px; padding: 12px 20px; box-shadow: 0 12px 24px rgba(0,0,0,0.15); z-index: 99999; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.2s; color: var(--fg-primary-color); font-weight: 500; }
.ai-minimized-widget:hover { transform: translateY(-4px); border-color: var(--fg-accent-color); }

/* === АНИМАЦИИ === */
.ai-fade-enter-active, .ai-fade-leave-active { transition: opacity 0.2s ease; }
.ai-fade-enter-active .ai-modal, .ai-fade-leave-active .ai-modal { transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
.ai-fade-enter-from, .ai-fade-leave-to { opacity: 0; }
.ai-fade-enter-from .ai-modal, .ai-fade-leave-to .ai-modal { transform: scale(0.96) translateY(10px); }

/* === СТРАНИЦА ПЛАГИНА (PAGE) === */
.ai-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  gap: 8px;
  padding: 8px 0 0 0;
}
@media (min-width: 768px) {
  .ai-page {
    padding: 16px;
    gap: 16px;
  }
}

.ai-page-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
@media (min-width: 768px) {
  .ai-page-header {
    padding: 0;
  }
}

.ai-page-header h2 {
  margin: 0;
  color: var(--fg-primary-color);
}
.ai-page-header-actions {
  display: flex;
  gap: 8px;
}
.ai-page-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--bg-secondary-color);
  border: 1px solid var(--border-secondary-color);
  color: var(--fg-secondary-color);
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}
.ai-page-btn:hover {
  background: var(--bg-hover-color);
  color: var(--fg-primary-color);
}
.ai-page-btn.is-active {
  color: var(--fg-accent-color);
  border-color: var(--border-accent-color);
  background: var(--bg-accent-overlay-color);
}
@media (max-width: 600px) {
  .ai-page-btn .btn-text {
    display: none;
  }
  .ai-page-btn {
    padding: 8px;
  }
}

.ai-page-chat-wrapper {
  flex: 1;
  border: none;
  border-top: 1px solid var(--border-secondary-color);
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary-color);
}
@media (min-width: 768px) {
  .ai-page-chat-wrapper {
    border: 1px solid var(--border-secondary-color);
    border-radius: 8px;
  }
}

.ai-page {
  .ai-tab-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .ai-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px 8px;
  }
  .ai-input-box {
    border: none;
    border-radius: 0;
  }
  .ai-input-area {
    flex-shrink: 0;
    padding: 0;
  }
}
@media (min-width: 768px) {
  .ai-page .ai-body {
    padding: 16px;
  }
}
`, wo = {
  id: "ai-assistant",
  name: "AI Assistant",
  description: "AI-помощник с фоновым выполнением запросов",
  version: "1.0.0",
  icon: "mdi:robot-outline",
  slots: {
    toolbar: window.Vue.markRaw(Gn)
  },
  pages: {
    index: window.Vue.markRaw(co)
  },
  styles: uo,
  activate(a) {
    k.setContext(a), a.locale && zt(() => window.Vue.unref(a.locale)), console.log("[AI Assistant] Activated");
  }
};
export {
  wo as default
};
