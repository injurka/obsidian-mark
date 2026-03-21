var ve = Object.defineProperty;
var oe = (a) => {
  throw TypeError(a);
};
var ye = (a, n, e) => n in a ? ve(a, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[n] = e;
var x = (a, n, e) => ye(a, typeof n != "symbol" ? n + "" : n, e), Ee = (a, n, e) => n.has(a) || oe("Cannot " + e);
var ie = (a, n, e) => n.has(a) ? oe("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(a) : n.set(a, e);
var A = (a, n, e) => (Ee(a, n, "access private method"), e);
function Q() {
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
let N = Q();
function ue(a) {
  N = a;
}
const pe = /[&<>"']/, $e = new RegExp(pe.source, "g"), we = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, Te = new RegExp(we.source, "g"), Ne = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, re = (a) => Ne[a];
function V(a, n) {
  if (n) {
    if (pe.test(a))
      return a.replace($e, re);
  } else if (we.test(a))
    return a.replace(Te, re);
  return a;
}
const ze = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function Ce(a) {
  return a.replace(ze, (n, e) => (e = e.toLowerCase(), e === "colon" ? ":" : e.charAt(0) === "#" ? e.charAt(1) === "x" ? String.fromCharCode(parseInt(e.substring(2), 16)) : String.fromCharCode(+e.substring(1)) : ""));
}
const _e = /(^|[^\[])\^/g;
function m(a, n) {
  let e = typeof a == "string" ? a : a.source;
  n = n || "";
  const t = {
    replace: (i, r) => {
      let o = typeof r == "string" ? r : r.source;
      return o = o.replace(_e, "$1"), e = e.replace(i, o), t;
    },
    getRegex: () => new RegExp(e, n)
  };
  return t;
}
function se(a) {
  try {
    a = encodeURI(a).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return a;
}
const C = { exec: () => null };
function le(a, n) {
  const e = a.replace(/\|/g, (r, o, l) => {
    let s = !1, p = o;
    for (; --p >= 0 && l[p] === "\\"; )
      s = !s;
    return s ? "|" : " |";
  }), t = e.split(/ \|/);
  let i = 0;
  if (t[0].trim() || t.shift(), t.length > 0 && !t[t.length - 1].trim() && t.pop(), n)
    if (t.length > n)
      t.splice(n);
    else
      for (; t.length < n; )
        t.push("");
  for (; i < t.length; i++)
    t[i] = t[i].trim().replace(/\\\|/g, "|");
  return t;
}
function M(a, n, e) {
  const t = a.length;
  if (t === 0)
    return "";
  let i = 0;
  for (; i < t && a.charAt(t - i - 1) === n; )
    i++;
  return a.slice(0, t - i);
}
function Be(a, n) {
  if (a.indexOf(n[1]) === -1)
    return -1;
  let e = 0;
  for (let t = 0; t < a.length; t++)
    if (a[t] === "\\")
      t++;
    else if (a[t] === n[0])
      e++;
    else if (a[t] === n[1] && (e--, e < 0))
      return t;
  return -1;
}
function ae(a, n, e, t) {
  const i = n.href, r = n.title ? V(n.title) : null, o = a[1].replace(/\\([\[\]])/g, "$1");
  if (a[0].charAt(0) !== "!") {
    t.state.inLink = !0;
    const l = {
      type: "link",
      raw: e,
      href: i,
      title: r,
      text: o,
      tokens: t.inlineTokens(o)
    };
    return t.state.inLink = !1, l;
  }
  return {
    type: "image",
    raw: e,
    href: i,
    title: r,
    text: V(o)
  };
}
function Ie(a, n) {
  const e = a.match(/^(\s+)(?:```)/);
  if (e === null)
    return n;
  const t = e[1];
  return n.split(`
`).map((i) => {
    const r = i.match(/^\s+/);
    if (r === null)
      return i;
    const [o] = r;
    return o.length >= t.length ? i.slice(t.length) : i;
  }).join(`
`);
}
class P {
  // set by the lexer
  constructor(n) {
    x(this, "options");
    x(this, "rules");
    // set by the lexer
    x(this, "lexer");
    this.options = n || N;
  }
  space(n) {
    const e = this.rules.block.newline.exec(n);
    if (e && e[0].length > 0)
      return {
        type: "space",
        raw: e[0]
      };
  }
  code(n) {
    const e = this.rules.block.code.exec(n);
    if (e) {
      const t = e[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: e[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? t : M(t, `
`)
      };
    }
  }
  fences(n) {
    const e = this.rules.block.fences.exec(n);
    if (e) {
      const t = e[0], i = Ie(t, e[3] || "");
      return {
        type: "code",
        raw: t,
        lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2],
        text: i
      };
    }
  }
  heading(n) {
    const e = this.rules.block.heading.exec(n);
    if (e) {
      let t = e[2].trim();
      if (/#$/.test(t)) {
        const i = M(t, "#");
        (this.options.pedantic || !i || / $/.test(i)) && (t = i.trim());
      }
      return {
        type: "heading",
        raw: e[0],
        depth: e[1].length,
        text: t,
        tokens: this.lexer.inline(t)
      };
    }
  }
  hr(n) {
    const e = this.rules.block.hr.exec(n);
    if (e)
      return {
        type: "hr",
        raw: e[0]
      };
  }
  blockquote(n) {
    const e = this.rules.block.blockquote.exec(n);
    if (e) {
      let t = e[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, `
    $1`);
      t = M(t.replace(/^ *>[ \t]?/gm, ""), `
`);
      const i = this.lexer.state.top;
      this.lexer.state.top = !0;
      const r = this.lexer.blockTokens(t);
      return this.lexer.state.top = i, {
        type: "blockquote",
        raw: e[0],
        tokens: r,
        text: t
      };
    }
  }
  list(n) {
    let e = this.rules.block.list.exec(n);
    if (e) {
      let t = e[1].trim();
      const i = t.length > 1, r = {
        type: "list",
        raw: "",
        ordered: i,
        start: i ? +t.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      t = i ? `\\d{1,9}\\${t.slice(-1)}` : `\\${t}`, this.options.pedantic && (t = i ? t : "[*+-]");
      const o = new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let l = "", s = "", p = !1;
      for (; n; ) {
        let u = !1;
        if (!(e = o.exec(n)) || this.rules.block.hr.test(n))
          break;
        l = e[0], n = n.substring(l.length);
        let h = e[2].split(`
`, 1)[0].replace(/^\t+/, (q) => " ".repeat(3 * q.length)), d = n.split(`
`, 1)[0], w = 0;
        this.options.pedantic ? (w = 2, s = h.trimStart()) : (w = e[2].search(/[^ ]/), w = w > 4 ? 1 : w, s = h.slice(w), w += e[1].length);
        let f = !1;
        if (!h && /^ *$/.test(d) && (l += d + `
`, n = n.substring(d.length + 1), u = !0), !u) {
          const q = new RegExp(`^ {0,${Math.min(3, w - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), ee = new RegExp(`^ {0,${Math.min(3, w - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), te = new RegExp(`^ {0,${Math.min(3, w - 1)}}(?:\`\`\`|~~~)`), ne = new RegExp(`^ {0,${Math.min(3, w - 1)}}#`);
          for (; n; ) {
            const j = n.split(`
`, 1)[0];
            if (d = j, this.options.pedantic && (d = d.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), te.test(d) || ne.test(d) || q.test(d) || ee.test(n))
              break;
            if (d.search(/[^ ]/) >= w || !d.trim())
              s += `
` + d.slice(w);
            else {
              if (f || h.search(/[^ ]/) >= 4 || te.test(h) || ne.test(h) || ee.test(h))
                break;
              s += `
` + d;
            }
            !f && !d.trim() && (f = !0), l += j + `
`, n = n.substring(j.length + 1), h = d.slice(w);
          }
        }
        r.loose || (p ? r.loose = !0 : /\n *\n *$/.test(l) && (p = !0));
        let b = null, E;
        this.options.gfm && (b = /^\[[ xX]\] /.exec(s), b && (E = b[0] !== "[ ] ", s = s.replace(/^\[[ xX]\] +/, ""))), r.items.push({
          type: "list_item",
          raw: l,
          task: !!b,
          checked: E,
          loose: !1,
          text: s,
          tokens: []
        }), r.raw += l;
      }
      r.items[r.items.length - 1].raw = l.trimEnd(), r.items[r.items.length - 1].text = s.trimEnd(), r.raw = r.raw.trimEnd();
      for (let u = 0; u < r.items.length; u++)
        if (this.lexer.state.top = !1, r.items[u].tokens = this.lexer.blockTokens(r.items[u].text, []), !r.loose) {
          const h = r.items[u].tokens.filter((w) => w.type === "space"), d = h.length > 0 && h.some((w) => /\n.*\n/.test(w.raw));
          r.loose = d;
        }
      if (r.loose)
        for (let u = 0; u < r.items.length; u++)
          r.items[u].loose = !0;
      return r;
    }
  }
  html(n) {
    const e = this.rules.block.html.exec(n);
    if (e)
      return {
        type: "html",
        block: !0,
        raw: e[0],
        pre: e[1] === "pre" || e[1] === "script" || e[1] === "style",
        text: e[0]
      };
  }
  def(n) {
    const e = this.rules.block.def.exec(n);
    if (e) {
      const t = e[1].toLowerCase().replace(/\s+/g, " "), i = e[2] ? e[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return {
        type: "def",
        tag: t,
        raw: e[0],
        href: i,
        title: r
      };
    }
  }
  table(n) {
    const e = this.rules.block.table.exec(n);
    if (!e || !/[:|]/.test(e[2]))
      return;
    const t = le(e[1]), i = e[2].replace(/^\||\| *$/g, "").split("|"), r = e[3] && e[3].trim() ? e[3].replace(/\n[ \t]*$/, "").split(`
`) : [], o = {
      type: "table",
      raw: e[0],
      header: [],
      align: [],
      rows: []
    };
    if (t.length === i.length) {
      for (const l of i)
        /^ *-+: *$/.test(l) ? o.align.push("right") : /^ *:-+: *$/.test(l) ? o.align.push("center") : /^ *:-+ *$/.test(l) ? o.align.push("left") : o.align.push(null);
      for (const l of t)
        o.header.push({
          text: l,
          tokens: this.lexer.inline(l)
        });
      for (const l of r)
        o.rows.push(le(l, o.header.length).map((s) => ({
          text: s,
          tokens: this.lexer.inline(s)
        })));
      return o;
    }
  }
  lheading(n) {
    const e = this.rules.block.lheading.exec(n);
    if (e)
      return {
        type: "heading",
        raw: e[0],
        depth: e[2].charAt(0) === "=" ? 1 : 2,
        text: e[1],
        tokens: this.lexer.inline(e[1])
      };
  }
  paragraph(n) {
    const e = this.rules.block.paragraph.exec(n);
    if (e) {
      const t = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return {
        type: "paragraph",
        raw: e[0],
        text: t,
        tokens: this.lexer.inline(t)
      };
    }
  }
  text(n) {
    const e = this.rules.block.text.exec(n);
    if (e)
      return {
        type: "text",
        raw: e[0],
        text: e[0],
        tokens: this.lexer.inline(e[0])
      };
  }
  escape(n) {
    const e = this.rules.inline.escape.exec(n);
    if (e)
      return {
        type: "escape",
        raw: e[0],
        text: V(e[1])
      };
  }
  tag(n) {
    const e = this.rules.inline.tag.exec(n);
    if (e)
      return !this.lexer.state.inLink && /^<a /i.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: e[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: e[0]
      };
  }
  link(n) {
    const e = this.rules.inline.link.exec(n);
    if (e) {
      const t = e[2].trim();
      if (!this.options.pedantic && /^</.test(t)) {
        if (!/>$/.test(t))
          return;
        const o = M(t.slice(0, -1), "\\");
        if ((t.length - o.length) % 2 === 0)
          return;
      } else {
        const o = Be(e[2], "()");
        if (o > -1) {
          const s = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + o;
          e[2] = e[2].substring(0, o), e[0] = e[0].substring(0, s).trim(), e[3] = "";
        }
      }
      let i = e[2], r = "";
      if (this.options.pedantic) {
        const o = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);
        o && (i = o[1], r = o[3]);
      } else
        r = e[3] ? e[3].slice(1, -1) : "";
      return i = i.trim(), /^</.test(i) && (this.options.pedantic && !/>$/.test(t) ? i = i.slice(1) : i = i.slice(1, -1)), ae(e, {
        href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
        title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
      }, e[0], this.lexer);
    }
  }
  reflink(n, e) {
    let t;
    if ((t = this.rules.inline.reflink.exec(n)) || (t = this.rules.inline.nolink.exec(n))) {
      const i = (t[2] || t[1]).replace(/\s+/g, " "), r = e[i.toLowerCase()];
      if (!r) {
        const o = t[0].charAt(0);
        return {
          type: "text",
          raw: o,
          text: o
        };
      }
      return ae(t, r, t[0], this.lexer);
    }
  }
  emStrong(n, e, t = "") {
    let i = this.rules.inline.emStrongLDelim.exec(n);
    if (!i || i[3] && t.match(/[\p{L}\p{N}]/u))
      return;
    if (!(i[1] || i[2] || "") || !t || this.rules.inline.punctuation.exec(t)) {
      const o = [...i[0]].length - 1;
      let l, s, p = o, u = 0;
      const h = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (h.lastIndex = 0, e = e.slice(-1 * n.length + o); (i = h.exec(e)) != null; ) {
        if (l = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !l)
          continue;
        if (s = [...l].length, i[3] || i[4]) {
          p += s;
          continue;
        } else if ((i[5] || i[6]) && o % 3 && !((o + s) % 3)) {
          u += s;
          continue;
        }
        if (p -= s, p > 0)
          continue;
        s = Math.min(s, s + p + u);
        const d = [...i[0]][0].length, w = n.slice(0, o + i.index + d + s);
        if (Math.min(o, s) % 2) {
          const b = w.slice(1, -1);
          return {
            type: "em",
            raw: w,
            text: b,
            tokens: this.lexer.inlineTokens(b)
          };
        }
        const f = w.slice(2, -2);
        return {
          type: "strong",
          raw: w,
          text: f,
          tokens: this.lexer.inlineTokens(f)
        };
      }
    }
  }
  codespan(n) {
    const e = this.rules.inline.code.exec(n);
    if (e) {
      let t = e[2].replace(/\n/g, " ");
      const i = /[^ ]/.test(t), r = /^ /.test(t) && / $/.test(t);
      return i && r && (t = t.substring(1, t.length - 1)), t = V(t, !0), {
        type: "codespan",
        raw: e[0],
        text: t
      };
    }
  }
  br(n) {
    const e = this.rules.inline.br.exec(n);
    if (e)
      return {
        type: "br",
        raw: e[0]
      };
  }
  del(n) {
    const e = this.rules.inline.del.exec(n);
    if (e)
      return {
        type: "del",
        raw: e[0],
        text: e[2],
        tokens: this.lexer.inlineTokens(e[2])
      };
  }
  autolink(n) {
    const e = this.rules.inline.autolink.exec(n);
    if (e) {
      let t, i;
      return e[2] === "@" ? (t = V(e[1]), i = "mailto:" + t) : (t = V(e[1]), i = t), {
        type: "link",
        raw: e[0],
        text: t,
        href: i,
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
  url(n) {
    var t;
    let e;
    if (e = this.rules.inline.url.exec(n)) {
      let i, r;
      if (e[2] === "@")
        i = V(e[0]), r = "mailto:" + i;
      else {
        let o;
        do
          o = e[0], e[0] = ((t = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : t[0]) ?? "";
        while (o !== e[0]);
        i = V(e[0]), e[1] === "www." ? r = "http://" + e[0] : r = e[0];
      }
      return {
        type: "link",
        raw: e[0],
        text: i,
        href: r,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  inlineText(n) {
    const e = this.rules.inline.text.exec(n);
    if (e) {
      let t;
      return this.lexer.state.inRawBlock ? t = e[0] : t = V(e[0]), {
        type: "text",
        raw: e[0],
        text: t
      };
    }
  }
}
const Se = /^(?: *(?:\n|$))+/, Ae = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/, Me = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, I = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Re = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, he = /(?:[*+-]|\d{1,9}[.)])/, fe = m(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, he).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), K = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Pe = /^[^\n]+/, U = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Le = m(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", U).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), De = m(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, he).getRegex(), O = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", J = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Oe = m("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", J).replace("tag", O).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ge = m(K).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", O).getRegex(), qe = m(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ge).getRegex(), W = {
  blockquote: qe,
  code: Ae,
  def: Le,
  fences: Me,
  heading: Re,
  hr: I,
  html: Oe,
  lheading: fe,
  list: De,
  newline: Se,
  paragraph: ge,
  table: C,
  text: Pe
}, ce = m("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", O).getRegex(), je = {
  ...W,
  table: ce,
  paragraph: m(K).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ce).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", O).getRegex()
}, Ze = {
  ...W,
  html: m(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", J).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: C,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: m(K).replace("hr", I).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", fe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, me = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, He = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, xe = /^( {2,}|\\)\n(?!\s*$)/, Fe = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, S = "\\p{P}\\p{S}", Qe = m(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, S).getRegex(), Ke = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g, Ue = m(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, S).getRegex(), Je = m("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, S).getRegex(), We = m("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, S).getRegex(), Xe = m(/\\([punct])/, "gu").replace(/punct/g, S).getRegex(), Ge = m(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Ye = m(J).replace("(?:-->|$)", "-->").getRegex(), et = m("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Ye).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), L = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, tt = m(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", L).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), ke = m(/^!?\[(label)\]\[(ref)\]/).replace("label", L).replace("ref", U).getRegex(), be = m(/^!?\[(ref)\](?:\[\])?/).replace("ref", U).getRegex(), nt = m("reflink|nolink(?!\\()", "g").replace("reflink", ke).replace("nolink", be).getRegex(), X = {
  _backpedal: C,
  // only used for GFM url
  anyPunctuation: Xe,
  autolink: Ge,
  blockSkip: Ke,
  br: xe,
  code: He,
  del: C,
  emStrongLDelim: Ue,
  emStrongRDelimAst: Je,
  emStrongRDelimUnd: We,
  escape: me,
  link: tt,
  nolink: be,
  punctuation: Qe,
  reflink: ke,
  reflinkSearch: nt,
  tag: et,
  text: Fe,
  url: C
}, ot = {
  ...X,
  link: m(/^!?\[(label)\]\((.*?)\)/).replace("label", L).getRegex(),
  reflink: m(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", L).getRegex()
}, H = {
  ...X,
  escape: m(me).replace("])", "~|])").getRegex(),
  url: m(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, it = {
  ...H,
  br: m(xe).replace("{2,}", "*").getRegex(),
  text: m(H.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, R = {
  normal: W,
  gfm: je,
  pedantic: Ze
}, z = {
  normal: X,
  gfm: H,
  breaks: it,
  pedantic: ot
};
class v {
  constructor(n) {
    x(this, "tokens");
    x(this, "options");
    x(this, "state");
    x(this, "tokenizer");
    x(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = n || N, this.options.tokenizer = this.options.tokenizer || new P(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const e = {
      block: R.normal,
      inline: z.normal
    };
    this.options.pedantic ? (e.block = R.pedantic, e.inline = z.pedantic) : this.options.gfm && (e.block = R.gfm, this.options.breaks ? e.inline = z.breaks : e.inline = z.gfm), this.tokenizer.rules = e;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: R,
      inline: z
    };
  }
  /**
   * Static Lex Method
   */
  static lex(n, e) {
    return new v(e).lex(n);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(n, e) {
    return new v(e).inlineTokens(n);
  }
  /**
   * Preprocessing
   */
  lex(n) {
    n = n.replace(/\r\n|\r/g, `
`), this.blockTokens(n, this.tokens);
    for (let e = 0; e < this.inlineQueue.length; e++) {
      const t = this.inlineQueue[e];
      this.inlineTokens(t.src, t.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(n, e = []) {
    this.options.pedantic ? n = n.replace(/\t/g, "    ").replace(/^ +$/gm, "") : n = n.replace(/^( *)(\t+)/gm, (l, s, p) => s + "    ".repeat(p.length));
    let t, i, r, o;
    for (; n; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((l) => (t = l.call({ lexer: this }, n, e)) ? (n = n.substring(t.raw.length), e.push(t), !0) : !1))) {
        if (t = this.tokenizer.space(n)) {
          n = n.substring(t.raw.length), t.raw.length === 1 && e.length > 0 ? e[e.length - 1].raw += `
` : e.push(t);
          continue;
        }
        if (t = this.tokenizer.code(n)) {
          n = n.substring(t.raw.length), i = e[e.length - 1], i && (i.type === "paragraph" || i.type === "text") ? (i.raw += `
` + t.raw, i.text += `
` + t.text, this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : e.push(t);
          continue;
        }
        if (t = this.tokenizer.fences(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.heading(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.hr(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.blockquote(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.list(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.html(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.def(n)) {
          n = n.substring(t.raw.length), i = e[e.length - 1], i && (i.type === "paragraph" || i.type === "text") ? (i.raw += `
` + t.raw, i.text += `
` + t.raw, this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : this.tokens.links[t.tag] || (this.tokens.links[t.tag] = {
            href: t.href,
            title: t.title
          });
          continue;
        }
        if (t = this.tokenizer.table(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.lheading(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (r = n, this.options.extensions && this.options.extensions.startBlock) {
          let l = 1 / 0;
          const s = n.slice(1);
          let p;
          this.options.extensions.startBlock.forEach((u) => {
            p = u.call({ lexer: this }, s), typeof p == "number" && p >= 0 && (l = Math.min(l, p));
          }), l < 1 / 0 && l >= 0 && (r = n.substring(0, l + 1));
        }
        if (this.state.top && (t = this.tokenizer.paragraph(r))) {
          i = e[e.length - 1], o && i.type === "paragraph" ? (i.raw += `
` + t.raw, i.text += `
` + t.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : e.push(t), o = r.length !== n.length, n = n.substring(t.raw.length);
          continue;
        }
        if (t = this.tokenizer.text(n)) {
          n = n.substring(t.raw.length), i = e[e.length - 1], i && i.type === "text" ? (i.raw += `
` + t.raw, i.text += `
` + t.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : e.push(t);
          continue;
        }
        if (n) {
          const l = "Infinite loop on byte: " + n.charCodeAt(0);
          if (this.options.silent) {
            console.error(l);
            break;
          } else
            throw new Error(l);
        }
      }
    return this.state.top = !0, e;
  }
  inline(n, e = []) {
    return this.inlineQueue.push({ src: n, tokens: e }), e;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(n, e = []) {
    let t, i, r, o = n, l, s, p;
    if (this.tokens.links) {
      const u = Object.keys(this.tokens.links);
      if (u.length > 0)
        for (; (l = this.tokenizer.rules.inline.reflinkSearch.exec(o)) != null; )
          u.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (l = this.tokenizer.rules.inline.blockSkip.exec(o)) != null; )
      o = o.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (l = this.tokenizer.rules.inline.anyPunctuation.exec(o)) != null; )
      o = o.slice(0, l.index) + "++" + o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; n; )
      if (s || (p = ""), s = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((u) => (t = u.call({ lexer: this }, n, e)) ? (n = n.substring(t.raw.length), e.push(t), !0) : !1))) {
        if (t = this.tokenizer.escape(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.tag(n)) {
          n = n.substring(t.raw.length), i = e[e.length - 1], i && t.type === "text" && i.type === "text" ? (i.raw += t.raw, i.text += t.text) : e.push(t);
          continue;
        }
        if (t = this.tokenizer.link(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.reflink(n, this.tokens.links)) {
          n = n.substring(t.raw.length), i = e[e.length - 1], i && t.type === "text" && i.type === "text" ? (i.raw += t.raw, i.text += t.text) : e.push(t);
          continue;
        }
        if (t = this.tokenizer.emStrong(n, o, p)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.codespan(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.br(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.del(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (t = this.tokenizer.autolink(n)) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (!this.state.inLink && (t = this.tokenizer.url(n))) {
          n = n.substring(t.raw.length), e.push(t);
          continue;
        }
        if (r = n, this.options.extensions && this.options.extensions.startInline) {
          let u = 1 / 0;
          const h = n.slice(1);
          let d;
          this.options.extensions.startInline.forEach((w) => {
            d = w.call({ lexer: this }, h), typeof d == "number" && d >= 0 && (u = Math.min(u, d));
          }), u < 1 / 0 && u >= 0 && (r = n.substring(0, u + 1));
        }
        if (t = this.tokenizer.inlineText(r)) {
          n = n.substring(t.raw.length), t.raw.slice(-1) !== "_" && (p = t.raw.slice(-1)), s = !0, i = e[e.length - 1], i && i.type === "text" ? (i.raw += t.raw, i.text += t.text) : e.push(t);
          continue;
        }
        if (n) {
          const u = "Infinite loop on byte: " + n.charCodeAt(0);
          if (this.options.silent) {
            console.error(u);
            break;
          } else
            throw new Error(u);
        }
      }
    return e;
  }
}
class D {
  constructor(n) {
    x(this, "options");
    this.options = n || N;
  }
  code(n, e, t) {
    var r;
    const i = (r = (e || "").match(/^\S*/)) == null ? void 0 : r[0];
    return n = n.replace(/\n$/, "") + `
`, i ? '<pre><code class="language-' + V(i) + '">' + (t ? n : V(n, !0)) + `</code></pre>
` : "<pre><code>" + (t ? n : V(n, !0)) + `</code></pre>
`;
  }
  blockquote(n) {
    return `<blockquote>
${n}</blockquote>
`;
  }
  html(n, e) {
    return n;
  }
  heading(n, e, t) {
    return `<h${e}>${n}</h${e}>
`;
  }
  hr() {
    return `<hr>
`;
  }
  list(n, e, t) {
    const i = e ? "ol" : "ul", r = e && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + i + r + `>
` + n + "</" + i + `>
`;
  }
  listitem(n, e, t) {
    return `<li>${n}</li>
`;
  }
  checkbox(n) {
    return "<input " + (n ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(n) {
    return `<p>${n}</p>
`;
  }
  table(n, e) {
    return e && (e = `<tbody>${e}</tbody>`), `<table>
<thead>
` + n + `</thead>
` + e + `</table>
`;
  }
  tablerow(n) {
    return `<tr>
${n}</tr>
`;
  }
  tablecell(n, e) {
    const t = e.header ? "th" : "td";
    return (e.align ? `<${t} align="${e.align}">` : `<${t}>`) + n + `</${t}>
`;
  }
  /**
   * span level renderer
   */
  strong(n) {
    return `<strong>${n}</strong>`;
  }
  em(n) {
    return `<em>${n}</em>`;
  }
  codespan(n) {
    return `<code>${n}</code>`;
  }
  br() {
    return "<br>";
  }
  del(n) {
    return `<del>${n}</del>`;
  }
  link(n, e, t) {
    const i = se(n);
    if (i === null)
      return t;
    n = i;
    let r = '<a href="' + n + '"';
    return e && (r += ' title="' + e + '"'), r += ">" + t + "</a>", r;
  }
  image(n, e, t) {
    const i = se(n);
    if (i === null)
      return t;
    n = i;
    let r = `<img src="${n}" alt="${t}"`;
    return e && (r += ` title="${e}"`), r += ">", r;
  }
  text(n) {
    return n;
  }
}
class G {
  // no need for block level renderers
  strong(n) {
    return n;
  }
  em(n) {
    return n;
  }
  codespan(n) {
    return n;
  }
  del(n) {
    return n;
  }
  html(n) {
    return n;
  }
  text(n) {
    return n;
  }
  link(n, e, t) {
    return "" + t;
  }
  image(n, e, t) {
    return "" + t;
  }
  br() {
    return "";
  }
}
class y {
  constructor(n) {
    x(this, "options");
    x(this, "renderer");
    x(this, "textRenderer");
    this.options = n || N, this.options.renderer = this.options.renderer || new D(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new G();
  }
  /**
   * Static Parse Method
   */
  static parse(n, e) {
    return new y(e).parse(n);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(n, e) {
    return new y(e).parseInline(n);
  }
  /**
   * Parse Loop
   */
  parse(n, e = !0) {
    let t = "";
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
        const o = r, l = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (l !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(o.type)) {
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
          const o = r;
          t += this.renderer.heading(this.parseInline(o.tokens), o.depth, Ce(this.parseInline(o.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const o = r;
          t += this.renderer.code(o.text, o.lang, !!o.escaped);
          continue;
        }
        case "table": {
          const o = r;
          let l = "", s = "";
          for (let u = 0; u < o.header.length; u++)
            s += this.renderer.tablecell(this.parseInline(o.header[u].tokens), { header: !0, align: o.align[u] });
          l += this.renderer.tablerow(s);
          let p = "";
          for (let u = 0; u < o.rows.length; u++) {
            const h = o.rows[u];
            s = "";
            for (let d = 0; d < h.length; d++)
              s += this.renderer.tablecell(this.parseInline(h[d].tokens), { header: !1, align: o.align[d] });
            p += this.renderer.tablerow(s);
          }
          t += this.renderer.table(l, p);
          continue;
        }
        case "blockquote": {
          const o = r, l = this.parse(o.tokens);
          t += this.renderer.blockquote(l);
          continue;
        }
        case "list": {
          const o = r, l = o.ordered, s = o.start, p = o.loose;
          let u = "";
          for (let h = 0; h < o.items.length; h++) {
            const d = o.items[h], w = d.checked, f = d.task;
            let b = "";
            if (d.task) {
              const E = this.renderer.checkbox(!!w);
              p ? d.tokens.length > 0 && d.tokens[0].type === "paragraph" ? (d.tokens[0].text = E + " " + d.tokens[0].text, d.tokens[0].tokens && d.tokens[0].tokens.length > 0 && d.tokens[0].tokens[0].type === "text" && (d.tokens[0].tokens[0].text = E + " " + d.tokens[0].tokens[0].text)) : d.tokens.unshift({
                type: "text",
                text: E + " "
              }) : b += E + " ";
            }
            b += this.parse(d.tokens, p), u += this.renderer.listitem(b, f, !!w);
          }
          t += this.renderer.list(u, l, s);
          continue;
        }
        case "html": {
          const o = r;
          t += this.renderer.html(o.text, o.block);
          continue;
        }
        case "paragraph": {
          const o = r;
          t += this.renderer.paragraph(this.parseInline(o.tokens));
          continue;
        }
        case "text": {
          let o = r, l = o.tokens ? this.parseInline(o.tokens) : o.text;
          for (; i + 1 < n.length && n[i + 1].type === "text"; )
            o = n[++i], l += `
` + (o.tokens ? this.parseInline(o.tokens) : o.text);
          t += e ? this.renderer.paragraph(l) : l;
          continue;
        }
        default: {
          const o = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return t;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(n, e) {
    e = e || this.renderer;
    let t = "";
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
        const o = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
          t += o || "";
          continue;
        }
      }
      switch (r.type) {
        case "escape": {
          const o = r;
          t += e.text(o.text);
          break;
        }
        case "html": {
          const o = r;
          t += e.html(o.text);
          break;
        }
        case "link": {
          const o = r;
          t += e.link(o.href, o.title, this.parseInline(o.tokens, e));
          break;
        }
        case "image": {
          const o = r;
          t += e.image(o.href, o.title, o.text);
          break;
        }
        case "strong": {
          const o = r;
          t += e.strong(this.parseInline(o.tokens, e));
          break;
        }
        case "em": {
          const o = r;
          t += e.em(this.parseInline(o.tokens, e));
          break;
        }
        case "codespan": {
          const o = r;
          t += e.codespan(o.text);
          break;
        }
        case "br": {
          t += e.br();
          break;
        }
        case "del": {
          const o = r;
          t += e.del(this.parseInline(o.tokens, e));
          break;
        }
        case "text": {
          const o = r;
          t += e.text(o.text);
          break;
        }
        default: {
          const o = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return t;
  }
}
class _ {
  constructor(n) {
    x(this, "options");
    this.options = n || N;
  }
  /**
   * Process markdown before marked
   */
  preprocess(n) {
    return n;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(n) {
    return n;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(n) {
    return n;
  }
}
x(_, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
var T, F, Ve;
class rt {
  constructor(...n) {
    ie(this, T);
    x(this, "defaults", Q());
    x(this, "options", this.setOptions);
    x(this, "parse", A(this, T, F).call(this, v.lex, y.parse));
    x(this, "parseInline", A(this, T, F).call(this, v.lexInline, y.parseInline));
    x(this, "Parser", y);
    x(this, "Renderer", D);
    x(this, "TextRenderer", G);
    x(this, "Lexer", v);
    x(this, "Tokenizer", P);
    x(this, "Hooks", _);
    this.use(...n);
  }
  /**
   * Run callback for every token
   */
  walkTokens(n, e) {
    var i, r;
    let t = [];
    for (const o of n)
      switch (t = t.concat(e.call(this, o)), o.type) {
        case "table": {
          const l = o;
          for (const s of l.header)
            t = t.concat(this.walkTokens(s.tokens, e));
          for (const s of l.rows)
            for (const p of s)
              t = t.concat(this.walkTokens(p.tokens, e));
          break;
        }
        case "list": {
          const l = o;
          t = t.concat(this.walkTokens(l.items, e));
          break;
        }
        default: {
          const l = o;
          (r = (i = this.defaults.extensions) == null ? void 0 : i.childTokens) != null && r[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((s) => {
            const p = l[s].flat(1 / 0);
            t = t.concat(this.walkTokens(p, e));
          }) : l.tokens && (t = t.concat(this.walkTokens(l.tokens, e)));
        }
      }
    return t;
  }
  use(...n) {
    const e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return n.forEach((t) => {
      const i = { ...t };
      if (i.async = this.defaults.async || i.async || !1, t.extensions && (t.extensions.forEach((r) => {
        if (!r.name)
          throw new Error("extension name required");
        if ("renderer" in r) {
          const o = e.renderers[r.name];
          o ? e.renderers[r.name] = function(...l) {
            let s = r.renderer.apply(this, l);
            return s === !1 && (s = o.apply(this, l)), s;
          } : e.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = e[r.level];
          o ? o.unshift(r.tokenizer) : e[r.level] = [r.tokenizer], r.start && (r.level === "block" ? e.startBlock ? e.startBlock.push(r.start) : e.startBlock = [r.start] : r.level === "inline" && (e.startInline ? e.startInline.push(r.start) : e.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (e.childTokens[r.name] = r.childTokens);
      }), i.extensions = e), t.renderer) {
        const r = this.defaults.renderer || new D(this.defaults);
        for (const o in t.renderer) {
          if (!(o in r))
            throw new Error(`renderer '${o}' does not exist`);
          if (o === "options")
            continue;
          const l = o, s = t.renderer[l], p = r[l];
          r[l] = (...u) => {
            let h = s.apply(r, u);
            return h === !1 && (h = p.apply(r, u)), h || "";
          };
        }
        i.renderer = r;
      }
      if (t.tokenizer) {
        const r = this.defaults.tokenizer || new P(this.defaults);
        for (const o in t.tokenizer) {
          if (!(o in r))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const l = o, s = t.tokenizer[l], p = r[l];
          r[l] = (...u) => {
            let h = s.apply(r, u);
            return h === !1 && (h = p.apply(r, u)), h;
          };
        }
        i.tokenizer = r;
      }
      if (t.hooks) {
        const r = this.defaults.hooks || new _();
        for (const o in t.hooks) {
          if (!(o in r))
            throw new Error(`hook '${o}' does not exist`);
          if (o === "options")
            continue;
          const l = o, s = t.hooks[l], p = r[l];
          _.passThroughHooks.has(o) ? r[l] = (u) => {
            if (this.defaults.async)
              return Promise.resolve(s.call(r, u)).then((d) => p.call(r, d));
            const h = s.call(r, u);
            return p.call(r, h);
          } : r[l] = (...u) => {
            let h = s.apply(r, u);
            return h === !1 && (h = p.apply(r, u)), h;
          };
        }
        i.hooks = r;
      }
      if (t.walkTokens) {
        const r = this.defaults.walkTokens, o = t.walkTokens;
        i.walkTokens = function(l) {
          let s = [];
          return s.push(o.call(this, l)), r && (s = s.concat(r.call(this, l))), s;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(n) {
    return this.defaults = { ...this.defaults, ...n }, this;
  }
  lexer(n, e) {
    return v.lex(n, e ?? this.defaults);
  }
  parser(n, e) {
    return y.parse(n, e ?? this.defaults);
  }
}
T = new WeakSet(), F = function(n, e) {
  return (t, i) => {
    const r = { ...i }, o = { ...this.defaults, ...r };
    this.defaults.async === !0 && r.async === !1 && (o.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), o.async = !0);
    const l = A(this, T, Ve).call(this, !!o.silent, !!o.async);
    if (typeof t > "u" || t === null)
      return l(new Error("marked(): input parameter is undefined or null"));
    if (typeof t != "string")
      return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
    if (o.hooks && (o.hooks.options = o), o.async)
      return Promise.resolve(o.hooks ? o.hooks.preprocess(t) : t).then((s) => n(s, o)).then((s) => o.hooks ? o.hooks.processAllTokens(s) : s).then((s) => o.walkTokens ? Promise.all(this.walkTokens(s, o.walkTokens)).then(() => s) : s).then((s) => e(s, o)).then((s) => o.hooks ? o.hooks.postprocess(s) : s).catch(l);
    try {
      o.hooks && (t = o.hooks.preprocess(t));
      let s = n(t, o);
      o.hooks && (s = o.hooks.processAllTokens(s)), o.walkTokens && this.walkTokens(s, o.walkTokens);
      let p = e(s, o);
      return o.hooks && (p = o.hooks.postprocess(p)), p;
    } catch (s) {
      return l(s);
    }
  };
}, Ve = function(n, e) {
  return (t) => {
    if (t.message += `
Please report this to https://github.com/markedjs/marked.`, n) {
      const i = "<p>An error occurred:</p><pre>" + V(t.message + "", !0) + "</pre>";
      return e ? Promise.resolve(i) : i;
    }
    if (e)
      return Promise.reject(t);
    throw t;
  };
};
const $ = new rt();
function g(a, n) {
  return $.parse(a, n);
}
g.options = g.setOptions = function(a) {
  return $.setOptions(a), g.defaults = $.defaults, ue(g.defaults), g;
};
g.getDefaults = Q;
g.defaults = N;
g.use = function(...a) {
  return $.use(...a), g.defaults = $.defaults, ue(g.defaults), g;
};
g.walkTokens = function(a, n) {
  return $.walkTokens(a, n);
};
g.parseInline = $.parseInline;
g.Parser = y;
g.parser = y.parse;
g.Renderer = D;
g.TextRenderer = G;
g.Lexer = v;
g.lexer = v.lex;
g.Tokenizer = P;
g.Hooks = _;
g.parse = g;
g.options;
g.setOptions;
g.use;
g.walkTokens;
g.parseInline;
y.parse;
v.lex;
const Y = [
  "gemini-3.1-flash-lite-preview",
  "gemini-3-flash-preview",
  "gpt-5.4-nano",
  "qwen3.5-397b-a17b"
], c = window.Vue.reactive({
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
  selectedModel: Y[0]
}), k = {
  open() {
    c.isOpen = !0, c.isMinimized = !1;
  },
  close() {
    c.isOpen = !1, c.isMinimized = !1;
  },
  minimize() {
    c.isMinimized = !0, c.isOpen = !1;
  },
  toggle() {
    c.isOpen ? this.close() : this.open();
  },
  toggleFullscreen() {
    c.isFullscreen = !c.isFullscreen;
  },
  createNewTopic() {
    const a = {
      id: Date.now().toString(),
      title: "Новый чат",
      history: [],
      updatedAt: Date.now()
    };
    c.topics.unshift(a), c.currentTopicId = a.id, c.activeTab = "chat";
  },
  selectTopic(a) {
    c.currentTopicId = a, c.activeTab = "chat";
  },
  deleteTopic(a) {
    c.topics = c.topics.filter((n) => n.id !== a), c.currentTopicId === a && (c.currentTopicId = c.topics.length > 0 ? c.topics[0].id : null);
  },
  clearCurrentTopic() {
    const a = this.getCurrentTopic();
    a && confirm("Очистить текущий чат?") && (a.history = [], a.updatedAt = Date.now());
  },
  getCurrentTopic() {
    return c.topics.find((a) => a.id === c.currentTopicId);
  },
  addPrompt(a, n) {
    c.systemPrompts.push({ id: Date.now().toString(), name: a, content: n });
  },
  updatePrompt(a, n, e) {
    const t = c.systemPrompts.find((i) => i.id === a);
    t && (t.name = n, t.content = e);
  },
  deletePrompt(a) {
    a !== "default" && (c.systemPrompts = c.systemPrompts.filter((n) => n.id !== a), c.selectedPromptId === a && (c.selectedPromptId = "default"));
  }
};
function st() {
  if (c.isInitialized)
    return;
  c.apiKey = localStorage.getItem("wm-ai-apikey") || "", c.selectedModel = localStorage.getItem("wm-ai-model") || Y[0];
  const a = localStorage.getItem("wm-ai-prompts");
  if (a)
    c.systemPrompts = JSON.parse(a);
  else {
    const t = localStorage.getItem("wm-ai-sysprompt");
    c.systemPrompts = [{
      id: "default",
      name: "Стандартный",
      content: t || "Ты полезный AI-ассистент. Отвечай кратко и по делу. Форматируй код и текст в Markdown."
    }];
  }
  c.selectedPromptId = localStorage.getItem("wm-ai-selected-prompt") || c.systemPrompts[0].id;
  const n = localStorage.getItem("wm-ai-topics");
  if (n)
    c.topics = JSON.parse(n);
  else {
    const t = localStorage.getItem("wm-ai-history");
    t && (c.topics = [{
      id: Date.now().toString(),
      title: "Старый чат",
      history: JSON.parse(t),
      updatedAt: Date.now()
    }]);
  }
  const e = localStorage.getItem("wm-ai-current-topic");
  e && c.topics.some((t) => t.id === e) ? c.currentTopicId = e : c.topics.length > 0 && (c.currentTopicId = c.topics[0].id), c.isInitialized = !0, window.Vue.watch(() => c.apiKey, (t) => localStorage.setItem("wm-ai-apikey", t)), window.Vue.watch(() => c.selectedModel, (t) => localStorage.setItem("wm-ai-model", t)), window.Vue.watch(() => c.selectedPromptId, (t) => localStorage.setItem("wm-ai-selected-prompt", t)), window.Vue.watch(() => c.systemPrompts, (t) => localStorage.setItem("wm-ai-prompts", JSON.stringify(t)), { deep: !0 }), window.Vue.watch(() => c.topics, (t) => localStorage.setItem("wm-ai-topics", JSON.stringify(t)), { deep: !0 }), window.Vue.watch(() => c.currentTopicId, (t) => {
    t && localStorage.setItem("wm-ai-current-topic", t);
  });
}
let B = null;
async function lt(a, n) {
  var r, o, l;
  if (!a.trim() || c.isLoading)
    return;
  if (!c.apiKey) {
    c.activeTab = "settings", alert('Пожалуйста, укажите API ключ на вкладке "Настройки".');
    return;
  }
  c.currentTopicId || k.createNewTopic();
  const e = k.getCurrentTopic();
  if (!e)
    return;
  (e.title === "Новый чат" || e.title === "Старый чат") && (e.title = a.length > 30 ? `${a.slice(0, 30)}...` : a);
  const t = Date.now().toString(), i = c.systemPrompts.find((s) => s.id === c.selectedPromptId) || c.systemPrompts[0];
  e.history.push({
    id: t,
    prompt: a,
    response: "",
    status: "loading",
    date: Date.now()
  }), e.updatedAt = Date.now(), c.isLoading = !0, B = new AbortController(), n();
  try {
    const s = await fetch("https://api.aihubmix.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${c.apiKey}`
      },
      body: JSON.stringify({
        model: c.selectedModel,
        messages: [
          { role: "system", content: i.content },
          { role: "user", content: a }
        ]
      }),
      signal: B.signal
    });
    if (!s.ok)
      throw new Error(`Ошибка API: ${s.status}`);
    const u = ((l = (o = (r = (await s.json()).choices) == null ? void 0 : r[0]) == null ? void 0 : o.message) == null ? void 0 : l.content) || "Пустой ответ";
    Z(t, { response: u, status: "success" });
  } catch (s) {
    s.name === "AbortError" ? Z(t, { response: "Запрос отменен.", status: "aborted" }) : Z(t, { response: `Ошибка: ${s.message}`, status: "error" });
  } finally {
    c.isLoading = !1, B = null, e.updatedAt = Date.now(), n();
  }
}
function Z(a, n) {
  const e = k.getCurrentTopic();
  if (!e)
    return;
  const t = e.history.findIndex((i) => i.id === a);
  t !== -1 && (e.history[t] = { ...e.history[t], ...n });
}
function de() {
  B && B.abort();
}
const at = {
  key: 0,
  style: { "text-align": "center", color: "var(--fg-muted-color)", "margin-top": "40px" }
}, ct = { class: "ai-prompt-bubble" }, dt = {
  key: 0,
  class: "ai-status loading"
}, ut = ["innerHTML"], pt = { class: "ai-input-area" }, wt = { class: "ai-input-box" }, ht = ["onKeydown"], ft = { class: "ai-input-bottom" }, gt = { class: "ai-tools-left" }, mt = { class: "ai-dropdown-wrap" }, xt = { class: "tool-text" }, kt = {
  key: 0,
  class: "ai-dropdown"
}, bt = ["onClick"], Vt = { class: "ai-dropdown-wrap" }, vt = { class: "tool-text" }, yt = {
  key: 0,
  class: "ai-dropdown"
}, Et = ["onClick"], $t = { class: "ai-tools-right" }, Tt = /* @__PURE__ */ window.Vue.defineComponent({
  __name: "ai-chat",
  setup(a) {
    const n = window.Vue.ref(null), e = window.Vue.ref(!1), t = window.Vue.ref(!1), i = window.Vue.computed(() => k.getCurrentTopic()), r = window.Vue.computed(() => {
      var d;
      return ((d = c.systemPrompts.find((w) => w.id === c.selectedPromptId)) == null ? void 0 : d.name) || "Неизвестно";
    });
    function o() {
      window.Vue.nextTick(() => {
        n.value && (n.value.scrollTop = n.value.scrollHeight);
      });
    }
    window.Vue.watch(() => c.isOpen, (d) => {
      d && c.activeTab === "chat" && o();
    }), window.Vue.watch(() => c.currentTopicId, () => o());
    function l(d) {
      try {
        return g.parse(d);
      } catch {
        return d;
      }
    }
    function s() {
      const d = c.userPrompt.trim();
      d && (c.userPrompt = "", lt(d, o));
    }
    function p(d) {
      c.selectedModel = d, t.value = !1;
    }
    function u(d) {
      c.selectedPromptId = d, e.value = !1;
    }
    function h() {
      e.value = !1, t.value = !1;
    }
    return (d, w) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
      class: "ai-tab-view",
      onClick: h
    }, [
      window.Vue.createElementVNode("div", {
        ref_key: "chatBodyRef",
        ref: n,
        class: "ai-body"
      }, [
        !i.value || i.value.history.length === 0 ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", at, " Новый диалог начат. Напишите первый запрос! ")) : window.Vue.createCommentVNode("", !0),
        i.value ? (window.Vue.openBlock(!0), window.Vue.createElementBlock(window.Vue.Fragment, { key: 1 }, window.Vue.renderList(i.value.history, (f) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
          key: f.id,
          class: "ai-history-item"
        }, [
          window.Vue.createElementVNode("div", ct, window.Vue.toDisplayString(f.prompt), 1),
          f.status === "loading" ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", dt, " Генерация ответа... ")) : (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
            key: 1,
            class: "ai-response-bubble ai-md-content",
            innerHTML: l(f.response)
          }, null, 8, ut)),
          window.Vue.createElementVNode("div", {
            class: window.Vue.normalizeClass(["ai-status", f.status])
          }, window.Vue.toDisplayString(f.status === "error" ? "Ошибка" : f.status === "aborted" ? "Отменено" : new Date(f.date).toLocaleTimeString()), 3)
        ]))), 128)) : window.Vue.createCommentVNode("", !0)
      ], 512),
      window.Vue.createElementVNode("div", pt, [
        window.Vue.createElementVNode("div", wt, [
          window.Vue.withDirectives(window.Vue.createElementVNode("textarea", {
            "onUpdate:modelValue": w[0] || (w[0] = (f) => window.Vue.unref(c).userPrompt = f),
            class: "ai-textarea custom-scrollbar",
            placeholder: "Напишите сообщение...",
            onKeydown: window.Vue.withKeys(window.Vue.withModifiers(s, ["ctrl", "prevent"]), ["enter"])
          }, null, 40, ht), [
            [window.Vue.vModelText, window.Vue.unref(c).userPrompt]
          ]),
          window.Vue.createElementVNode("div", ft, [
            window.Vue.createElementVNode("div", gt, [
              window.Vue.createElementVNode("button", {
                class: "ai-tool-btn shrink-none",
                title: "Очистить чат",
                onClick: w[1] || (w[1] = window.Vue.withModifiers((f) => window.Vue.unref(k).clearCurrentTopic(), ["stop"]))
              }, [...w[6] || (w[6] = [
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
              ])]),
              window.Vue.createElementVNode("button", {
                class: "ai-tool-btn shrink-none",
                title: "Новый топик",
                onClick: w[2] || (w[2] = window.Vue.withModifiers((f) => window.Vue.unref(k).createNewTopic(), ["stop"]))
              }, [...w[7] || (w[7] = [
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
              ])]),
              window.Vue.createElementVNode("div", mt, [
                window.Vue.createElementVNode("button", {
                  class: "ai-tool-btn",
                  title: "Выбор промпта",
                  onClick: w[3] || (w[3] = window.Vue.withModifiers((f) => {
                    e.value = !e.value, t.value = !1;
                  }, ["stop"]))
                }, [
                  w[8] || (w[8] = window.Vue.createElementVNode("svg", {
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
                  window.Vue.createElementVNode("span", xt, window.Vue.toDisplayString(r.value), 1)
                ]),
                e.value ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", kt, [
                  w[9] || (w[9] = window.Vue.createElementVNode("div", { class: "dropdown-title" }, " Промпт ", -1)),
                  (window.Vue.openBlock(!0), window.Vue.createElementBlock(window.Vue.Fragment, null, window.Vue.renderList(window.Vue.unref(c).systemPrompts, (f) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
                    key: f.id,
                    class: window.Vue.normalizeClass(["dropdown-item", { "is-active": f.id === window.Vue.unref(c).selectedPromptId }]),
                    onClick: window.Vue.withModifiers((b) => u(f.id), ["stop"])
                  }, window.Vue.toDisplayString(f.name), 11, bt))), 128))
                ])) : window.Vue.createCommentVNode("", !0)
              ]),
              window.Vue.createElementVNode("div", Vt, [
                window.Vue.createElementVNode("button", {
                  class: "ai-tool-btn",
                  title: "Выбор модели",
                  onClick: w[4] || (w[4] = window.Vue.withModifiers((f) => {
                    t.value = !t.value, e.value = !1;
                  }, ["stop"]))
                }, [
                  w[10] || (w[10] = window.Vue.createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-none"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>', 1)),
                  window.Vue.createElementVNode("span", vt, window.Vue.toDisplayString(window.Vue.unref(c).selectedModel), 1)
                ]),
                t.value ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", yt, [
                  w[11] || (w[11] = window.Vue.createElementVNode("div", { class: "dropdown-title" }, " Модель ", -1)),
                  (window.Vue.openBlock(!0), window.Vue.createElementBlock(window.Vue.Fragment, null, window.Vue.renderList(window.Vue.unref(Y), (f) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
                    key: f,
                    class: window.Vue.normalizeClass(["dropdown-item", { "is-active": f === window.Vue.unref(c).selectedModel }]),
                    onClick: window.Vue.withModifiers((b) => p(f), ["stop"])
                  }, window.Vue.toDisplayString(f), 11, Et))), 128))
                ])) : window.Vue.createCommentVNode("", !0)
              ])
            ]),
            window.Vue.createElementVNode("div", $t, [
              window.Vue.unref(c).isLoading ? (window.Vue.openBlock(), window.Vue.createElementBlock("button", {
                key: 0,
                class: "ai-send-btn is-stop",
                title: "Отменить",
                onClick: w[5] || (w[5] = window.Vue.withModifiers(
                  //@ts-ignore
                  (...f) => window.Vue.unref(de) && window.Vue.unref(de)(...f),
                  ["stop"]
                ))
              }, [...w[12] || (w[12] = [
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
              ])])) : (window.Vue.openBlock(), window.Vue.createElementBlock("button", {
                key: 1,
                class: window.Vue.normalizeClass(["ai-send-btn", { "is-ready": window.Vue.unref(c).userPrompt.trim() }]),
                title: "Отправить",
                onClick: window.Vue.withModifiers(s, ["stop"])
              }, [...w[13] || (w[13] = [
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
              ])], 2))
            ])
          ])
        ])
      ])
    ]));
  }
}), Nt = { class: "ai-tab-view" }, zt = { class: "ai-body custom-scrollbar" }, Ct = { class: "ai-settings" }, _t = { class: "settings-block" }, Bt = { class: "settings-block" }, It = {
  key: 0,
  class: "prompt-editor"
}, St = { class: "editor-actions" }, At = { class: "prompts-list" }, Mt = { class: "prompt-info" }, Rt = { class: "prompt-name" }, Pt = { class: "prompt-preview" }, Lt = { class: "prompt-actions" }, Dt = ["onClick"], Ot = ["onClick"], qt = /* @__PURE__ */ window.Vue.defineComponent({
  __name: "ai-settings",
  setup(a) {
    const n = window.Vue.ref(null), e = window.Vue.ref(""), t = window.Vue.ref("");
    function i() {
      n.value = "new", e.value = "Новый промпт", t.value = "";
    }
    function r(l) {
      n.value = l.id, e.value = l.name, t.value = l.content;
    }
    function o() {
      !e.value.trim() || !t.value.trim() || (n.value === "new" ? k.addPrompt(e.value, t.value) : n.value && k.updatePrompt(n.value, e.value, t.value), n.value = null);
    }
    return (l, s) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", Nt, [
      window.Vue.createElementVNode("div", zt, [
        window.Vue.createElementVNode("div", Ct, [
          window.Vue.createElementVNode("div", _t, [
            window.Vue.createElementVNode("label", null, [
              s[4] || (s[4] = window.Vue.createTextVNode(" API Key (AiHubMix) ", -1)),
              window.Vue.withDirectives(window.Vue.createElementVNode("input", {
                "onUpdate:modelValue": s[0] || (s[0] = (p) => window.Vue.unref(c).apiKey = p),
                type: "password",
                placeholder: "sk-...",
                class: "editor-input"
              }, null, 512), [
                [window.Vue.vModelText, window.Vue.unref(c).apiKey]
              ])
            ])
          ]),
          window.Vue.createElementVNode("div", Bt, [
            window.Vue.createElementVNode("div", { class: "topics-header" }, [
              s[5] || (s[5] = window.Vue.createElementVNode("label", { style: { margin: "0" } }, "Ваши системные промпты", -1)),
              window.Vue.createElementVNode("button", {
                class: "ai-btn ai-btn-primary ai-btn-sm",
                onClick: i
              }, " + Добавить ")
            ]),
            n.value ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", It, [
              window.Vue.withDirectives(window.Vue.createElementVNode("input", {
                "onUpdate:modelValue": s[1] || (s[1] = (p) => e.value = p),
                placeholder: "Название промпта",
                class: "editor-input"
              }, null, 512), [
                [window.Vue.vModelText, e.value]
              ]),
              window.Vue.withDirectives(window.Vue.createElementVNode("textarea", {
                "onUpdate:modelValue": s[2] || (s[2] = (p) => t.value = p),
                rows: "4",
                placeholder: "Ты профессиональный переводчик...",
                class: "editor-input custom-scrollbar"
              }, null, 512), [
                [window.Vue.vModelText, t.value]
              ]),
              window.Vue.createElementVNode("div", St, [
                window.Vue.createElementVNode("button", {
                  class: "ai-btn ai-btn-sm",
                  onClick: s[3] || (s[3] = (p) => n.value = null)
                }, " Отмена "),
                window.Vue.createElementVNode("button", {
                  class: "ai-btn ai-btn-primary ai-btn-sm",
                  onClick: o
                }, " Сохранить ")
              ])
            ])) : window.Vue.createCommentVNode("", !0),
            window.Vue.createElementVNode("div", At, [
              (window.Vue.openBlock(!0), window.Vue.createElementBlock(window.Vue.Fragment, null, window.Vue.renderList(window.Vue.unref(c).systemPrompts, (p) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
                key: p.id,
                class: "prompt-card"
              }, [
                window.Vue.createElementVNode("div", Mt, [
                  window.Vue.createElementVNode("div", Rt, window.Vue.toDisplayString(p.name), 1),
                  window.Vue.createElementVNode("div", Pt, window.Vue.toDisplayString(p.content), 1)
                ]),
                window.Vue.createElementVNode("div", Lt, [
                  window.Vue.createElementVNode("button", {
                    class: "ai-icon-btn",
                    onClick: (u) => r(p)
                  }, [...s[6] || (s[6] = [
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
                  ])], 8, Dt),
                  p.id !== "default" ? (window.Vue.openBlock(), window.Vue.createElementBlock("button", {
                    key: 0,
                    class: "ai-icon-btn danger",
                    onClick: (u) => window.Vue.unref(k).deletePrompt(p.id)
                  }, [...s[7] || (s[7] = [
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
                  ])], 8, Ot)) : window.Vue.createCommentVNode("", !0)
                ])
              ]))), 128))
            ])
          ])
        ])
      ])
    ]));
  }
}), jt = { class: "ai-tab-view" }, Zt = { class: "ai-body custom-scrollbar" }, Ht = { class: "ai-topics" }, Ft = { class: "topics-header" }, Qt = {
  key: 0,
  class: "topics-empty"
}, Kt = { class: "topics-list" }, Ut = ["onClick"], Jt = { class: "topic-info" }, Wt = { class: "topic-title" }, Xt = { class: "topic-meta" }, Gt = ["onClick"], Yt = /* @__PURE__ */ window.Vue.defineComponent({
  __name: "ai-topics",
  setup(a) {
    function n(e) {
      return new Date(e).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    return (e, t) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", jt, [
      window.Vue.createElementVNode("div", Zt, [
        window.Vue.createElementVNode("div", Ht, [
          window.Vue.createElementVNode("div", Ft, [
            t[1] || (t[1] = window.Vue.createElementVNode("h3", null, "Ваши диалоги", -1)),
            window.Vue.createElementVNode("button", {
              class: "ai-btn ai-btn-primary ai-btn-sm",
              onClick: t[0] || (t[0] = (i) => window.Vue.unref(k).createNewTopic())
            }, " + Новый чат ")
          ]),
          window.Vue.unref(c).topics.length === 0 ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", Qt, " У вас еще нет сохраненных чатов. ")) : window.Vue.createCommentVNode("", !0),
          window.Vue.createElementVNode("div", Kt, [
            (window.Vue.openBlock(!0), window.Vue.createElementBlock(window.Vue.Fragment, null, window.Vue.renderList(window.Vue.unref(c).topics, (i) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
              key: i.id,
              class: window.Vue.normalizeClass(["topic-card", { "is-active": i.id === window.Vue.unref(c).currentTopicId }]),
              onClick: (r) => window.Vue.unref(k).selectTopic(i.id)
            }, [
              window.Vue.createElementVNode("div", Jt, [
                window.Vue.createElementVNode("div", Wt, window.Vue.toDisplayString(i.title), 1),
                window.Vue.createElementVNode("div", Xt, [
                  window.Vue.createElementVNode("span", null, window.Vue.toDisplayString(i.history.length) + " сообщений", 1),
                  t[2] || (t[2] = window.Vue.createElementVNode("span", null, "•", -1)),
                  window.Vue.createElementVNode("span", null, window.Vue.toDisplayString(n(i.updatedAt)), 1)
                ])
              ]),
              window.Vue.createElementVNode("button", {
                class: "topic-delete-btn",
                title: "Удалить",
                onClick: window.Vue.withModifiers((r) => window.Vue.unref(k).deleteTopic(i.id), ["stop"])
              }, [...t[3] || (t[3] = [
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
              ])], 8, Gt)
            ], 10, Ut))), 128))
          ])
        ])
      ])
    ]));
  }
}), en = {
  key: 0,
  class: "ai-indicator"
}, tn = {
  key: 0,
  class: "ai-indicator",
  style: { position: "static" }
}, nn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, on = { class: "ai-header" }, rn = { class: "ai-header-actions" }, sn = ["title"], ln = {
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
}, an = {
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
}, cn = { class: "ai-tabs" }, dn = { class: "ai-tabs-content" }, un = /* @__PURE__ */ window.Vue.defineComponent({
  name: "AiAssistantWidget",
  inheritAttrs: !1,
  __name: "ai-assistant",
  setup(a) {
    return window.Vue.onMounted(() => st()), (n, e) => (window.Vue.openBlock(), window.Vue.createElementBlock(window.Vue.Fragment, null, [
      window.Vue.createElementVNode("button", window.Vue.mergeProps(n.$attrs, {
        type: "button",
        class: "ai-trigger",
        title: "AI Assistant",
        onClick: e[0] || (e[0] = window.Vue.withModifiers((t) => window.Vue.unref(k).toggle(), ["stop", "prevent"]))
      }), [
        e[9] || (e[9] = window.Vue.createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>', 1)),
        window.Vue.unref(c).isLoading && !window.Vue.unref(c).isOpen ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", en)) : window.Vue.createCommentVNode("", !0)
      ], 16),
      (window.Vue.openBlock(), window.Vue.createBlock(window.Vue.Teleport, { to: "body" }, [
        window.Vue.unref(c).isMinimized ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
          key: 0,
          class: "ai-minimized-widget",
          onClick: e[1] || (e[1] = window.Vue.withModifiers((t) => window.Vue.unref(k).open(), ["stop"]))
        }, [
          window.Vue.unref(c).isLoading ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", tn)) : (window.Vue.openBlock(), window.Vue.createElementBlock("svg", nn, [...e[10] || (e[10] = [
            window.Vue.createElementVNode("path", { d: "M12 8V4H8" }, null, -1),
            window.Vue.createElementVNode("rect", {
              x: "4",
              y: "8",
              width: "16",
              height: "12",
              rx: "2"
            }, null, -1)
          ])])),
          window.Vue.createElementVNode("span", null, window.Vue.toDisplayString(window.Vue.unref(c).isLoading ? "AI думает..." : "AI Assistant"), 1)
        ])) : window.Vue.createCommentVNode("", !0),
        window.Vue.createVNode(window.Vue.Transition, { name: "ai-fade" }, {
          default: window.Vue.withCtx(() => [
            window.Vue.unref(c).isOpen ? (window.Vue.openBlock(), window.Vue.createElementBlock("div", {
              key: 0,
              class: "ai-backdrop",
              onMousedown: e[8] || (e[8] = window.Vue.withModifiers((t) => window.Vue.unref(k).close(), ["self"]))
            }, [
              window.Vue.createElementVNode("div", {
                class: window.Vue.normalizeClass(["ai-modal", { "is-fullscreen": window.Vue.unref(c).isFullscreen }])
              }, [
                window.Vue.createElementVNode("div", on, [
                  e[15] || (e[15] = window.Vue.createElementVNode("div", { class: "ai-title" }, [
                    window.Vue.createElementVNode("svg", {
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
                    ]),
                    window.Vue.createTextVNode(" AI Assistant ")
                  ], -1)),
                  window.Vue.createElementVNode("div", rn, [
                    window.Vue.createElementVNode("button", {
                      class: "ai-icon-btn",
                      title: window.Vue.unref(c).isFullscreen ? "Оконный режим" : "На весь экран",
                      type: "button",
                      onClick: e[2] || (e[2] = window.Vue.withModifiers((t) => window.Vue.unref(k).toggleFullscreen(), ["stop"]))
                    }, [
                      window.Vue.unref(c).isFullscreen ? (window.Vue.openBlock(), window.Vue.createElementBlock("svg", an, [...e[12] || (e[12] = [
                        window.Vue.createElementVNode("path", { d: "M8 3v3a2 2 0 0 1-2 2H3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M16 3v3a2 2 0 0 0 2 2h3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M8 21v-3a2 2 0 0 0-2-2H3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M16 21v-3a2 2 0 0 1 2-2h3" }, null, -1)
                      ])])) : (window.Vue.openBlock(), window.Vue.createElementBlock("svg", ln, [...e[11] || (e[11] = [
                        window.Vue.createElementVNode("path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M16 3h3a2 2 0 0 1 2 2v3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M8 21H5a2 2 0 0 1-2-2v-3" }, null, -1),
                        window.Vue.createElementVNode("path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" }, null, -1)
                      ])]))
                    ], 8, sn),
                    window.Vue.createElementVNode("button", {
                      class: "ai-icon-btn",
                      title: "Свернуть в фон",
                      type: "button",
                      onClick: e[3] || (e[3] = window.Vue.withModifiers((t) => window.Vue.unref(k).minimize(), ["stop"]))
                    }, [...e[13] || (e[13] = [
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
                    ])]),
                    window.Vue.createElementVNode("button", {
                      class: "ai-icon-btn",
                      title: "Закрыть",
                      type: "button",
                      onClick: e[4] || (e[4] = window.Vue.withModifiers((t) => window.Vue.unref(k).close(), ["stop"]))
                    }, [...e[14] || (e[14] = [
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
                    ])])
                  ])
                ]),
                window.Vue.createElementVNode("div", cn, [
                  window.Vue.createElementVNode("button", {
                    class: window.Vue.normalizeClass(["ai-tab", { "is-active": window.Vue.unref(c).activeTab === "chat" }]),
                    onClick: e[5] || (e[5] = (t) => window.Vue.unref(c).activeTab = "chat")
                  }, " Чат ", 2),
                  window.Vue.createElementVNode("button", {
                    class: window.Vue.normalizeClass(["ai-tab", { "is-active": window.Vue.unref(c).activeTab === "topics" }]),
                    onClick: e[6] || (e[6] = (t) => window.Vue.unref(c).activeTab = "topics")
                  }, " Топики ", 2),
                  window.Vue.createElementVNode("button", {
                    class: window.Vue.normalizeClass(["ai-tab", { "is-active": window.Vue.unref(c).activeTab === "settings" }]),
                    onClick: e[7] || (e[7] = (t) => window.Vue.unref(c).activeTab = "settings")
                  }, " Настройки ", 2)
                ]),
                window.Vue.createElementVNode("div", dn, [
                  window.Vue.withDirectives(window.Vue.createVNode(Tt, null, null, 512), [
                    [window.Vue.vShow, window.Vue.unref(c).activeTab === "chat"]
                  ]),
                  window.Vue.unref(c).activeTab === "topics" ? (window.Vue.openBlock(), window.Vue.createBlock(Yt, { key: 0 })) : window.Vue.createCommentVNode("", !0),
                  window.Vue.unref(c).activeTab === "settings" ? (window.Vue.openBlock(), window.Vue.createBlock(qt, { key: 1 })) : window.Vue.createCommentVNode("", !0)
                ])
              ], 2)
            ], 32)) : window.Vue.createCommentVNode("", !0)
          ]),
          _: 1
        })
      ]))
    ], 64));
  }
}), pn = `/* === БАЗОВЫЕ КОНТЕЙНЕРЫ === */
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
.ai-modal.is-fullscreen { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; max-width: none !important; max-height: none !important; border-radius: 0 !important; margin: 0 !important; transform: none !important; }

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
        padding: 16px 32px; 
    }
}

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: var(--bg-tertiary-color); border-radius: 10px; }

/* === ЧАТ (СООБЩЕНИЯ) === */
.ai-history-item { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.ai-prompt-bubble { font-weight: 400; color: var(--fg-inverted-color); background: var(--bg-action-hover-color); padding: 10px 16px; border-radius: 18px 18px 4px 18px; align-self: flex-end; max-width: 85%; line-height: 1.5; }
.ai-response-bubble { color: var(--fg-primary-color); background: var(--bg-secondary-color); border: 1px solid var(--border-secondary-color); padding: 8px 6px; border-radius: 4px 18px 18px 18px; align-self: flex-start; font-size: 0.95rem; line-height: 1.6; }
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

/* === MARKDOWN СТИЛИ === */
.ai-md-content p { margin-top: 0; margin-bottom: 12px; }
.ai-md-content p:last-child { margin-bottom: 0; }
.ai-md-content pre { background: var(--bg-tertiary-color); padding: 12px; border-radius: 8px; overflow-x: auto; border: 1px solid var(--border-secondary-color); margin: 12px 0; }
.ai-md-content code { font-family: monospace; background: var(--bg-tertiary-color); padding: 3px 6px; border-radius: 4px; font-size: 0.9em; }

/* === АНИМАЦИИ === */
.ai-fade-enter-active, .ai-fade-leave-active { transition: opacity 0.2s ease; }
.ai-fade-enter-active .ai-modal, .ai-fade-leave-active .ai-modal { transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
.ai-fade-enter-from, .ai-fade-leave-to { opacity: 0; }
.ai-fade-enter-from .ai-modal, .ai-fade-leave-to .ai-modal { transform: scale(0.96) translateY(10px); }
`, hn = {
  id: "ai-assistant",
  name: "AI Assistant",
  description: "AI-помощник с фоновым выполнением запросов",
  version: "1.0.0",
  icon: "mdi:robot-outline",
  slots: {
    toolbar: window.Vue.markRaw(un)
  },
  styles: pn,
  activate() {
    console.log("[AI Assistant] Activated");
  }
};
export {
  hn as default
};
