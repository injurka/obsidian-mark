(function(){try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('.zh-tooltip-container[data-v-6368330e]{display:flex;align-items:center;gap:12px}.zh-text[data-v-6368330e]{font-family:"Maple Mono CN",inherit;font-size:1.2rem;font-weight:500;color:var(--fg-primary-color);line-height:1.4;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;max-width:200px}.zh-actions[data-v-6368330e]{display:flex;align-items:center;gap:4px;border-left:1px solid var(--border-secondary-color);padding-left:12px}.zh-btn[data-v-6368330e]{background:transparent;border:none;color:var(--fg-secondary-color);cursor:pointer;padding:6px;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:all .2s ease}.zh-btn[data-v-6368330e]:hover{background-color:var(--bg-hover-color);color:var(--fg-accent-color)}.zh-btn[data-v-6368330e]:active{transform:scale(.95)}')),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const s = { class: "zh-tooltip-container" }, r = { class: "zh-text" }, c = /* @__PURE__ */ window.Vue.defineComponent({
  __name: "chinese-tooltip",
  props: {
    text: {}
  },
  emits: ["close"],
  setup(e) {
    const t = e;
    function n() {
      if (!t.text)
        return;
      window.speechSynthesis.cancel();
      const o = new SpeechSynthesisUtterance(t.text);
      o.lang = "zh-CN", o.rate = 0.85, o.pitch = 1, window.speechSynthesis.speak(o);
    }
    return (o, i) => (window.Vue.openBlock(), window.Vue.createElementBlock("div", s, [
      window.Vue.createElementVNode("div", r, window.Vue.toDisplayString(e.text), 1),
      window.Vue.createElementVNode("div", { class: "zh-actions" }, [
        window.Vue.createElementVNode("button", {
          class: "zh-btn",
          title: "Озвучить",
          onClick: n
        }, [...i[0] || (i[0] = [
          window.Vue.createElementVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            window.Vue.createElementVNode("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
            window.Vue.createElementVNode("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }),
            window.Vue.createElementVNode("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" })
          ], -1)
        ])])
      ])
    ]));
  }
}), a = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, i] of t)
    n[o] = i;
  return n;
}, d = /* @__PURE__ */ a(c, [["__scopeId", "data-v-6368330e"]]), l = {
  id: "chinese-tooltip",
  name: "Chinese Language Helper",
  description: "Позволяет выделять и озвучивать китайские иероглифы по клику.",
  version: "1.0.0",
  icon: "mdi:translate-variant",
  activate(e) {
    e.registerTextInterceptor && (e.registerTextInterceptor({
      id: "zh-speech-interceptor",
      // eslint-disable-next-line e18e/prefer-static-regex
      isValidChar: (t) => /[\u4E00-\u9FA5]/.test(t),
      // eslint-disable-next-line e18e/prefer-static-regex
      isValidText: (t) => /[\u4E00-\u9FA5]+/.test(t),
      tooltipComponent: window.Vue.markRaw(d)
    }), console.log("[Chinese Tooltip] Activated"));
  },
  deactivate(e) {
    e.unregisterTextInterceptor && (e.unregisterTextInterceptor("zh-speech-interceptor"), console.log("[Chinese Tooltip] Deactivated"));
  }
};
export {
  l as default
};
