const { Component, Modal, Plugin, PluginSettingTab, Setting } = require("obsidian");

const DEFAULT_SETTINGS = {
  autoRefresh: true,
  showSummary: true,
  compact: false,
};

const TYPE_LABELS = {
  bus: "Автобус",
  metro: "Метро",
};

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ");
}

function cleanInline(value) {
  return String(value || "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*|__|[`*_]/g, "")
    .trim();
}

function extractLinks(value) {
  const links = [];
  const markdown = /\[[^\]]+\]\((https?:\/\/[^)]+)\)/g;
  const bare = /https?:\/\/[^\s)>]+/g;
  let match;

  while ((match = markdown.exec(String(value || "")))) links.push(match[1]);
  while ((match = bare.exec(String(value || "")))) links.push(match[0]);
  return [...new Set(links)].filter((url) => /^https?:\/\//i.test(url));
}

function parseYamlScalar(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if ((raw.startsWith("\"") && raw.endsWith("\"")) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1).replace(/\\([\\"'])/g, "$1");
  }
  if (raw === "null" || raw === "~") return "";
  return raw;
}

function parseYamlPair(line) {
  const match = String(line || "").match(/^([A-Za-z][\w-]*)\s*:\s*(.*?)\s*$/);
  return match ? { key: match[1].toLowerCase(), value: parseYamlScalar(match[2]) } : null;
}

function parseGalleryYaml(source) {
  const lines = String(source || "").split(/\r?\n/);
  let title = "";
  let imageSource = "";
  let inImages = false;
  let isFlowList = false;
  const blockImages = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    if (!inImages) {
      const pair = parseYamlPair(line);
      if (pair?.key === "title") title = pair.value;
      if (pair?.key === "images") {
        inImages = true;
        imageSource = pair.value;
        isFlowList = imageSource.startsWith("[");
        if (!isFlowList && imageSource) blockImages.push(imageSource);
        if (isFlowList && imageSource.includes("]")) inImages = false;
      }
      continue;
    }

    if (isFlowList) {
      imageSource += `\n${line}`;
      if (line.includes("]")) inImages = false;
      continue;
    }

    const item = line.match(/^-[ \t]*(.+)$/);
    if (item) blockImages.push(parseYamlScalar(item[1]));
    else inImages = false;
  }

  let images = blockImages;
  if (isFlowList || imageSource.startsWith("[")) {
    try {
      const list = JSON.parse(imageSource);
      if (Array.isArray(list) && list.every((value) => typeof value === "string")) images = list;
      else return { title, images: [], error: "images должен быть списком строк." };
    } catch {
      return { title, images: [], error: "Не удалось прочитать список images." };
    }
  }

  images = [...new Set(images.map((image) => String(image).trim()).filter((image) => /\.(png|jpe?g|webp|gif|heic|heif|svg)$/i.test(image)))];
  return { title, images, error: images.length ? "" : "Добавьте в images пути к файлам изображений." };
}

function parseTransportYaml(source, sourcePath, line, allowedTypes) {
  const values = {};
  const routes = [];
  let inRoutes = false;
  let currentRoute = null;

  const commitRoute = () => {
    if (currentRoute) routes.push(currentRoute);
    currentRoute = null;
  };

  for (const rawLine of String(source || "").split(/\r?\n/)) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed === "routes:") {
      inRoutes = true;
      continue;
    }

    if (inRoutes && trimmed.startsWith("-")) {
      commitRoute();
      currentRoute = {};
      const pair = parseYamlPair(trimmed.slice(1).trim());
      if (pair) currentRoute[pair.key] = pair.value;
      continue;
    }

    const pair = parseYamlPair(trimmed);
    if (!pair) continue;
    if (inRoutes && currentRoute) currentRoute[pair.key] = pair.value;
    else values[pair.key] = pair.value;
  }
  commitRoute();

  const type = normalize(values.type);
  if (!allowedTypes.includes(type) || !routes.length) return null;

  const rows = routes
    .map((route, rowIndex) => {
      const from = cleanInline(route.from);
      const to = cleanInline(route.to);
      const routeName = cleanInline(type === "metro" ? route.line : route.route);
      if (!from || !to || !routeName) return null;

      const row = {
        ...route,
        type,
        id: `${sourcePath}:${line}:${rowIndex}`,
        line,
        sourcePath,
        from,
        to,
        route: routeName,
        code: cleanInline(route.code),
        operator: cleanInline(route.operator),
        direction: cleanInline(route.direction),
        stops: cleanInline(route.stops),
        walk: cleanInline(route.walk),
        color: normalizeColor(route.color),
        links: [...new Set(Object.values(route).flatMap(extractLinks))],
      };
      return row;
    })
    .filter(Boolean);

  if (!rows.length) return null;
  return {
    type,
    title: cleanInline(values.title) || TYPE_LABELS[type],
    subtitle: cleanInline(values.subtitle) || "",
    collapsed: false,
    rows,
    sourcePath,
    line,
  };
}

function parseTransportBlocks(markdown, sourcePath, allowedTypes) {
  const lines = String(markdown || "").split(/\r?\n/);
  const groups = [];

  for (let index = 0; index < lines.length; index += 1) {
    if (!/^\s*```transport\s*$/i.test(lines[index])) continue;

    const body = [];
    let endIndex = index + 1;
    while (endIndex < lines.length && !/^\s*```\s*$/.test(lines[endIndex])) {
      body.push(lines[endIndex]);
      endIndex += 1;
    }

    const group = parseTransportYaml(body.join("\n"), sourcePath, index + 1, allowedTypes);
    if (group) groups.push(group);
    if (endIndex < lines.length) index = endIndex;
  }

  return groups;
}

function normalizeColor(value) {
  const candidate = cleanInline(value);
  return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(candidate) ? candidate : "";
}

function parseConfig(source) {
  const config = {
    scope: "current-folder",
    folder: "",
    types: ["bus", "metro"],
    title: "Транспорт",
  };

  for (const line of String(source || "").split(/\r?\n/)) {
    const match = line.match(/^\s*([\w-]+)\s*:\s*(.*?)\s*$/);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = match[2].replace(/^['"]|['"]$/g, "");
    if (key === "types") config.types = value.split(",").map((item) => item.trim().toLowerCase()).filter((item) => TYPE_LABELS[item]);
    if (key === "scope") config.scope = value.toLowerCase();
    if (key === "folder") config.folder = value;
    if (key === "title") config.title = value;
  }

  if (!config.types.length) config.types = ["bus", "metro"];
  return config;
}

function isWithin(path, folder) {
  const normalizedPath = path.replace(/\\/g, "/");
  const normalizedFolder = folder.replace(/\\/g, "/").replace(/\/$/, "");
  return !normalizedFolder || normalizedPath === normalizedFolder || normalizedPath.startsWith(`${normalizedFolder}/`);
}

function createElement(tag, className, parent, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined && text !== null) element.textContent = text;
  if (parent) parent.appendChild(element);
  return element;
}

function setInlineText(element, value) {
  const source = String(value || "");
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let cursor = 0;
  let match;

  while ((match = linkPattern.exec(source))) {
    if (match.index > cursor) element.appendChild(document.createTextNode(cleanInline(source.slice(cursor, match.index))));
    const link = createElement("a", "tpv-inline-link", element, cleanInline(match[1]));
    link.href = match[2];
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    cursor = match.index + match[0].length;
  }

  if (cursor < source.length) element.appendChild(document.createTextNode(cleanInline(source.slice(cursor))));
  if (!element.childNodes.length) element.textContent = "—";
}

function addMetric(parent, icon, label, value, extraClass = "") {
  if (!value || value === "—") return;
  const metric = createElement("span", `tpv-metric ${extraClass}`.trim(), parent);
  createElement("span", "tpv-metric-icon", metric, icon);
  createElement("span", "tpv-metric-label", metric, label);
  createElement("strong", "tpv-metric-value", metric, value);
}

class TransportViewMount extends Component {
  constructor(plugin, entry) {
    super();
    this.plugin = plugin;
    this.entry = entry;
  }

  onunload() {
    this.plugin.entries.delete(this.entry);
    this.entry.root.replaceChildren();
  }
}

class GalleryImageModal extends Modal {
  constructor(app, resourcePath, title) {
    super(app);
    this.resourcePath = resourcePath;
    this.title = title;
  }

  onOpen() {
    this.modalEl.addClass("tpv-gallery-modal");
    this.contentEl.empty();
    const image = createElement("img", "tpv-gallery-modal-image", this.contentEl);
    image.src = this.resourcePath;
    image.alt = this.title;
    image.decoding = "async";
    createElement("div", "tpv-gallery-modal-caption", this.contentEl, this.title);
  }
}

class GalleryViewMount extends Component {
  constructor(plugin, root, source, sourcePath) {
    super();
    this.plugin = plugin;
    this.root = root;
    this.source = source;
    this.sourcePath = sourcePath;
    this.galleryItems = [];
    this.lastLayoutWidth = 0;
  }

  onunload() {
    this.root.replaceChildren();
  }

  render() {
    const gallery = parseGalleryYaml(this.source);
    this.root.replaceChildren();
    this.root.className = "tpv-gallery";

    if (gallery.title) {
      const header = createElement("div", "tpv-gallery-header", this.root);
      createElement("div", "tpv-gallery-title", header, gallery.title);
      createElement("span", "tpv-gallery-count", header, `${gallery.images.length} фото`);
    }
    if (gallery.error) {
      createElement("div", "tpv-gallery-error", this.root, gallery.error);
      return;
    }

    const grid = createElement("div", "tpv-gallery-grid", this.root);
    gallery.images.forEach((imagePath) => {
      const file = this.plugin.app.vault.getAbstractFileByPath(imagePath.replace(/^\.\//, ""))
        || this.plugin.app.metadataCache.getFirstLinkpathDest(imagePath, this.sourcePath);
      if (!file || !("extension" in file)) {
        createElement("div", "tpv-gallery-missing", grid, `Файл не найден: ${imagePath}`);
        return;
      }

      const resourcePath = this.plugin.app.vault.getResourcePath(file);
      const button = createElement("button", "tpv-gallery-item", grid);
      button.type = "button";
      button.setAttribute("aria-label", `Открыть изображение ${file.basename}`);
      const image = createElement("img", "tpv-gallery-image", button);
      image.alt = file.basename;
      image.loading = gallery.images.length <= 6 ? "eager" : "lazy";
      image.decoding = "async";
      const item = { button, image, ratio: 1, pixelArea: 0 };
      this.galleryItems.push(item);
      this.registerDomEvent(image, "load", () => {
        item.ratio = image.naturalWidth / image.naturalHeight || 1;
        item.pixelArea = image.naturalWidth * image.naturalHeight;
        this.applyGalleryLayout(grid, true);
      });
      this.registerDomEvent(image, "error", () => {
        item.ratio = 1;
        this.applyGalleryLayout(grid, true);
      });
      this.registerDomEvent(button, "click", () => new GalleryImageModal(this.plugin.app, resourcePath, file.basename).open());
      image.src = resourcePath;
    });

    this.applyGalleryLayout(grid, true);
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => this.applyGalleryLayout(grid));
      observer.observe(grid);
      this.register(() => observer.disconnect());
    }
  }

  applyGalleryLayout(grid, force = false) {
    const width = Math.round(grid.clientWidth);
    if (!width || !this.galleryItems.length || (!force && Math.abs(width - this.lastLayoutWidth) < 8)) return;
    this.lastLayoutWidth = width;

    const items = this.galleryItems;
    const ratios = items.map((item) => item.ratio || 1);
    const count = items.length;
    const meanRatio = ratios.reduce((sum, ratio) => sum + ratio, 0) / count;
    const gap = 12;
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const setObjectFit = (item, targetRatio) => {
      const crop = Math.abs(Math.log(item.ratio / targetRatio));
      item.image.style.objectFit = crop > 0.34 ? "contain" : "cover";
      item.button.classList.toggle("tpv-gallery-item-contain", crop > 0.34);
    };

    grid.classList.remove("tpv-gallery-grid-single", "tpv-gallery-grid-pair", "tpv-gallery-grid-panorama", "tpv-gallery-grid-portrait", "tpv-gallery-grid-balanced", "tpv-gallery-grid-masonry", "tpv-gallery-grid-mobile-collage");
    grid.style.gridTemplateColumns = "";
    grid.style.gridTemplateRows = "";
    grid.style.gridAutoRows = "";

    items.forEach((item) => {
      item.button.style.gridColumn = "";
      item.button.style.gridRow = "";
      item.button.style.aspectRatio = "";
      item.button.style.height = "";
      item.button.classList.remove("tpv-gallery-item-featured", "tpv-gallery-item-contain");
      item.image.style.objectFit = "cover";
    });

    if (count === 1) {
      const item = items[0];
      const height = clamp(width / item.ratio, 240, Math.min(500, window.innerHeight * 0.62));
      const targetRatio = width / height;
      grid.classList.add("tpv-gallery-grid-single");
      grid.style.gridTemplateColumns = "minmax(0, 1fr)";
      grid.style.gridTemplateRows = `${height}px`;
      item.button.style.gridColumn = "1";
      item.button.style.gridRow = "1";
      setObjectFit(item, targetRatio);
      return;
    }

    if (count === 2) {
      const weights = ratios.map((ratio) => clamp(ratio, 0.8, 1.9));
      const rowHeight = clamp(width / (ratios[0] + ratios[1]), 220, Math.min(420, window.innerHeight * 0.55));
      grid.classList.add("tpv-gallery-grid-pair");
      grid.style.gridTemplateColumns = weights.map((weight) => `minmax(0, ${weight.toFixed(2)}fr)`).join(" ");
      grid.style.gridTemplateRows = `${rowHeight}px`;
      items.forEach((item, index) => {
        item.button.style.gridColumn = `${index + 1}`;
        item.button.style.gridRow = "1";
        setObjectFit(item, (width * weights[index] / (weights[0] + weights[1])) / rowHeight);
      });
      return;
    }

    if (count === 3) {
      const portraitIndex = ratios.reduce((best, ratio, index) => ratio < ratios[best] ? index : best, 0);
      const panoramaIndex = ratios.reduce((best, ratio, index) => ratio > ratios[best] ? index : best, 0);

      if (width < 700) {
        const featuredIndex = ratios[panoramaIndex] > 1.9
          ? panoramaIndex
          : ratios[portraitIndex] < 0.78
            ? portraitIndex
            : items.reduce((best, item, index) => item.pixelArea > items[best].pixelArea ? index : best, 0);
        const sideItems = items.filter((_, index) => index !== featuredIndex);
        const sideRatio = sideItems.reduce((sum, item) => sum + item.ratio, 0) / sideItems.length;
        const heroHeight = clamp(width / items[featuredIndex].ratio, 190, Math.min(330, window.innerHeight * 0.42));
        const sideHeight = clamp(((width - gap) / 2) / sideRatio, 150, Math.min(230, window.innerHeight * 0.32));
        grid.classList.add("tpv-gallery-grid-mobile-collage");
        grid.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
        grid.style.gridTemplateRows = `${heroHeight}px ${sideHeight}px`;
        items.forEach((item, index) => {
          if (index === featuredIndex) {
            item.button.style.gridColumn = "1 / span 2";
            item.button.style.gridRow = "1";
            item.button.classList.add("tpv-gallery-item-featured");
            setObjectFit(item, width / heroHeight);
          }
          else {
            const sideColumn = sideItems.indexOf(item) + 1;
            item.button.style.gridColumn = `${sideColumn}`;
            item.button.style.gridRow = "2";
            setObjectFit(item, ((width - gap) / 2) / sideHeight);
          }
        });
        return;
      }

      if (ratios[portraitIndex] < 0.78) {
        const sideItems = items.filter((_, index) => index !== portraitIndex);
        const sideRatio = sideItems.reduce((sum, item) => sum + item.ratio, 0) / sideItems.length;
        const rowHeight = clamp((width * 0.46 / ratios[portraitIndex] + width * 0.54 / sideRatio) / 4, 170, Math.min(300, window.innerHeight * 0.38));
        grid.classList.add("tpv-gallery-grid-portrait");
        grid.style.gridTemplateColumns = "minmax(0, 0.92fr) minmax(0, 1.08fr)";
        grid.style.gridTemplateRows = `${rowHeight}px ${rowHeight}px`;
        items.forEach((item, index) => {
          if (index === portraitIndex) {
            item.button.style.gridColumn = "1";
            item.button.style.gridRow = "1 / span 2";
            item.button.classList.add("tpv-gallery-item-featured");
            setObjectFit(item, width * 0.46 / (rowHeight * 2 + gap));
          }
          else {
            const sideRow = sideItems.indexOf(item) + 1;
            item.button.style.gridColumn = "2";
            item.button.style.gridRow = `${sideRow}`;
            setObjectFit(item, width * 0.54 / rowHeight);
          }
        });
        return;
      }

      if (ratios[panoramaIndex] > 1.9) {
        const heroHeight = clamp(width / ratios[panoramaIndex], 230, Math.min(430, window.innerHeight * 0.5));
        const sideItems = items.filter((_, index) => index !== panoramaIndex);
        const sideRatio = sideItems.reduce((sum, item) => sum + item.ratio, 0) / sideItems.length;
        const sideHeight = clamp((width / 2) / sideRatio, 180, Math.min(300, window.innerHeight * 0.36));
        grid.classList.add("tpv-gallery-grid-panorama");
        grid.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
        grid.style.gridTemplateRows = `${heroHeight}px ${sideHeight}px`;
        items.forEach((item, index) => {
          if (index === panoramaIndex) {
            item.button.style.gridColumn = "1 / span 2";
            item.button.style.gridRow = "1";
            item.button.classList.add("tpv-gallery-item-featured");
            setObjectFit(item, width / heroHeight);
          }
          else {
            const sideColumn = sideItems.indexOf(item) + 1;
            item.button.style.gridColumn = `${sideColumn}`;
            item.button.style.gridRow = "2";
            setObjectFit(item, (width / 2 - gap / 2) / sideHeight);
          }
        });
        return;
      }

      const featuredIndex = items.reduce((best, item, index) => item.pixelArea > items[best].pixelArea ? index : best, 0);
      const tileHeight = clamp((width / 3) / meanRatio, 210, Math.min(330, window.innerHeight * 0.42));
      grid.classList.add("tpv-gallery-grid-balanced");
      grid.style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))";
      grid.style.gridTemplateRows = `${tileHeight}px`;
      items.forEach((item, index) => {
        item.button.style.gridColumn = `${index + 1}`;
        item.button.style.gridRow = "1";
        if (index === featuredIndex) item.button.classList.add("tpv-gallery-item-featured");
        setObjectFit(item, (width / 3 - gap * 2 / 3) / tileHeight);
      });
      return;
    }

    const columnCount = width < 700 ? 2 : meanRatio > 1.7 && width > 1200 ? 4 : 3;
    const gapSize = width < 700 ? 8 : 12;
    const unitWidth = (width - gapSize * (columnCount - 1)) / columnCount;
    const rowUnit = 12;
    const targetHeight = clamp(width * 0.26, 220, 360);
    const baseArea = width * targetHeight / count;
    const featuredIndex = items.reduce((best, item, index) => item.pixelArea > items[best].pixelArea ? index : best, 0);
    const occupied = [];
    const place = (columnSpan, rowSpan) => {
      for (let row = 0; ; row++) {
        for (let column = 0; column <= columnCount - columnSpan; column++) {
          let free = true;
          for (let y = row; y < row + rowSpan && free; y++) {
            for (let x = column; x < column + columnSpan; x++) {
              if (occupied[y]?.[x]) { free = false; break; }
            }
          }
          if (!free) continue;
          for (let y = row; y < row + rowSpan; y++) {
            occupied[y] ||= [];
            for (let x = column; x < column + columnSpan; x++) occupied[y][x] = true;
          }
          return { row, column };
        }
      }
    };

    grid.classList.add("tpv-gallery-grid-masonry");
    grid.style.gridTemplateColumns = `repeat(${columnCount}, minmax(0, 1fr))`;
    grid.style.gridAutoRows = `${rowUnit}px`;
    items.forEach((item, index) => {
      const area = baseArea * (index === featuredIndex ? 1.35 : 0.85);
      const desiredWidth = Math.sqrt(area * item.ratio);
      const columnSpan = clamp(Math.round(desiredWidth / unitWidth), 1, columnCount);
      const desiredHeight = desiredWidth / item.ratio;
      const rowSpan = clamp(Math.round((desiredHeight + gapSize) / (rowUnit + gapSize)), 8, 30);
      const position = place(columnSpan, rowSpan);
      item.button.style.gridColumn = `${position.column + 1} / span ${columnSpan}`;
      item.button.style.gridRow = `${position.row + 1} / span ${rowSpan}`;
      if (index === featuredIndex) item.button.classList.add("tpv-gallery-item-featured");
      setObjectFit(item, (unitWidth * columnSpan) / (rowUnit * rowSpan + gapSize * (rowSpan - 1)));
    });
  }
}

class TransportViewSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Travel Transport View" });

    new Setting(containerEl)
      .setName("Автообновление")
      .setDesc("Обновлять доску при изменении Markdown-файлов")
      .addToggle((toggle) => toggle.setValue(this.plugin.settings.autoRefresh).onChange(async (value) => {
        this.plugin.settings.autoRefresh = value;
        await this.plugin.saveData(this.plugin.settings);
      }));

    new Setting(containerEl)
      .setName("Показывать сводку")
      .setDesc("Количество сегментов, автобусов, метро и остановок")
      .addToggle((toggle) => toggle.setValue(this.plugin.settings.showSummary).onChange(async (value) => {
        this.plugin.settings.showSummary = value;
        await this.plugin.saveData(this.plugin.settings);
        this.plugin.refreshAll();
      }));

    new Setting(containerEl)
      .setName("Компактный режим")
      .setDesc("Уменьшить расстояния внутри карточек")
      .addToggle((toggle) => toggle.setValue(this.plugin.settings.compact).onChange(async (value) => {
        this.plugin.settings.compact = value;
        await this.plugin.saveData(this.plugin.settings);
        this.plugin.refreshAll();
      }));
  }
}

class TravelTransportView extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.entries = new Set();

    const mountBoard = (source, element, context) => {
      const entry = {
        root: createElement("div", "tpv-root", element),
        sourcePath: context.sourcePath,
        config: parseConfig(source),
        state: { filter: "all", query: "" },
      };

      this.entries.add(entry);
      context.addChild(new TransportViewMount(this, entry));
      void this.refreshEntry(entry);
    };

    this.registerMarkdownCodeBlockProcessor("transport-board", mountBoard);

    this.registerMarkdownCodeBlockProcessor("transport", (source, element, context) => {
      const group = parseTransportYaml(source, context.sourcePath, 1, ["bus", "metro"]);
      const entry = {
        root: createElement("div", "tpv-root tpv-inline", element),
        sourcePath: context.sourcePath,
        config: {
          scope: "current-note",
          folder: "",
          types: group ? [group.type] : ["bus", "metro"],
          title: group?.title || "Транспорт",
        },
        inlineGroups: group ? [group] : [],
        inlineSource: source,
        inline: true,
        state: { filter: "all", query: "" },
      };

      this.entries.add(entry);
      context.addChild(new TransportViewMount(this, entry));
      void this.refreshEntry(entry);
    });

    this.registerMarkdownCodeBlockProcessor("gallery", (source, element, context) => {
      const root = createElement("div", "tpv-gallery", element);
      const gallery = new GalleryViewMount(this, root, source, context.sourcePath);
      context.addChild(gallery);
      gallery.render();
    });

    this.addCommand({
      id: "refresh-transport-views",
      name: "Обновить транспортные доски",
      callback: () => this.refreshAll(),
    });

    this.addCommand({
      id: "insert-transport-board",
      name: "Вставить транспортную доску",
      editorCallback: (editor) => {
        editor.replaceSelection("```transport-board\nscope: current-folder\ntypes: bus, metro\nlayout: journey-board\n```\n");
      },
    });

    this.addRibbonIcon("route", "Обновить транспортные доски", () => this.refreshAll());
    this.addSettingTab(new TransportViewSettingTab(this.app, this));

    this.registerEvent(this.app.vault.on("modify", (file) => {
      if (this.settings.autoRefresh && file.extension === "md") this.refreshAll();
    }));
  }

  async collectGroups(entry) {
    const currentFile = this.app.vault.getAbstractFileByPath(entry.sourcePath);
    if (!currentFile) return [];

    let files;
    if (entry.config.scope === "current-note") {
      files = currentFile.extension === "md" ? [currentFile] : [];
    } else {
      const folder = entry.config.scope === "folder" && entry.config.folder
        ? entry.config.folder
        : currentFile.parent?.path || "";
      files = this.app.vault.getMarkdownFiles().filter((file) => isWithin(file.path, folder));
    }

    const groups = [];
    for (const file of files.sort((a, b) => a.path.localeCompare(b.path))) {
      const markdown = await this.app.vault.read(file);
      groups.push(...parseTransportBlocks(markdown, file.path, entry.config.types));
    }
    return groups.sort((a, b) => a.sourcePath.localeCompare(b.sourcePath) || a.line - b.line);
  }

  async refreshEntry(entry) {
    try {
      if (entry.inline) {
        const group = parseTransportYaml(entry.inlineSource, entry.sourcePath, 1, ["bus", "metro"]);
        entry.groups = group ? [group] : [];
        this.renderInlineEntry(entry);
        return;
      }

      entry.groups = await this.collectGroups(entry);
      this.renderEntry(entry);
    } catch (error) {
      entry.root.replaceChildren();
      createElement("div", "tpv-error", entry.root, `Не удалось построить транспортную доску: ${error.message}`);
    }
  }

  refreshAll() {
    for (const entry of this.entries) void this.refreshEntry(entry);
  }

  renderInlineEntry(entry) {
    const root = entry.root;
    root.replaceChildren();

    const group = entry.groups?.[0];
    if (!group) {
      createElement("div", "tpv-inline-empty", root, "Не удалось прочитать маршрут: нужны type и routes.");
      return;
    }

    const header = createElement("div", `tpv-inline-header tpv-inline-header-${group.type}`, root);
    const icon = createElement("span", "tpv-inline-icon", header, group.type === "bus" ? "🚌" : "🚇");
    icon.setAttribute("aria-hidden", "true");

    const title = createElement("div", "tpv-inline-title", header);
    setInlineText(title, group.title);

    if (group.subtitle) {
      const subtitle = createElement("span", "tpv-inline-subtitle", header);
      setInlineText(subtitle, `· ${group.subtitle}`);
    }

    if (group.rows.length > 1) {
      const segCount = group.rows.length;
      const segWord = segCount >= 2 && segCount <= 4 ? "сегмента" : "сегментов";
      createElement("span", "tpv-inline-count", header, `${segCount} ${segWord}`);
    }

    const routes = createElement("div", "tpv-routes", root);
    group.rows.forEach((row, index) => this.renderRoute(routes, group, row, index, true));
  }

  renderEntry(entry) {
    const root = entry.root;
    root.replaceChildren();
    root.classList.toggle("tpv-compact", this.settings.compact);

    const allGroups = entry.groups || [];
    const allRows = allGroups.flatMap((group) => group.rows);
    const query = normalize(entry.state.query);
    const filteredGroups = allGroups
      .map((group) => ({
        ...group,
        rows: group.rows.filter((row) => {
          const matchesType = entry.state.filter === "all" || row.type === entry.state.filter;
          const haystack = normalize(Object.values(row).join(" "));
          return matchesType && (!query || haystack.includes(query));
        }),
      }))
      .filter((group) => group.rows.length);

    const header = createElement("div", "tpv-header", root);
    const heading = createElement("div", "tpv-heading", header);
    createElement("div", "tpv-eyebrow", heading, "JOURNEY BOARD");
    createElement("h3", "tpv-title", heading, entry.config.title || "Транспорт");
    createElement("div", "tpv-source", heading, entry.config.scope === "current-note" ? entry.sourcePath : "Транспортные сегменты текущей папки");

    const actions = createElement("div", "tpv-actions", header);
    const search = createElement("input", "tpv-search", actions);
    search.type = "search";
    search.placeholder = "Найти маршрут…";
    search.value = entry.state.query;
    search.setAttribute("aria-label", "Найти маршрут");
    search.addEventListener("input", () => {
      entry.state.query = search.value;
      this.renderEntry(entry);
    });
    const refresh = createElement("button", "tpv-icon-button", actions, "↻");
    refresh.type = "button";
    refresh.title = "Обновить";
    refresh.setAttribute("aria-label", "Обновить транспортную доску");
    refresh.addEventListener("click", () => void this.refreshEntry(entry));

    const filters = createElement("div", "tpv-filters", root);
    [["all", "Все"], ["bus", "🚌 Автобусы"], ["metro", "🚇 Метро"]].forEach(([value, label]) => {
      const button = createElement("button", `tpv-filter ${entry.state.filter === value ? "is-active" : ""}`.trim(), filters, label);
      button.type = "button";
      button.setAttribute("aria-pressed", String(entry.state.filter === value));
      button.addEventListener("click", () => {
        entry.state.filter = value;
        this.renderEntry(entry);
      });
    });

    if (this.settings.showSummary) this.renderSummary(root, allRows);

    const content = createElement("div", "tpv-content", root);
    if (!filteredGroups.length) {
      const empty = createElement("div", "tpv-empty", content);
      createElement("div", "tpv-empty-icon", empty, "⌁");
      createElement("strong", "tpv-empty-title", empty, allGroups.length ? "Ничего не найдено" : "Транспортные блоки не найдены");
      createElement("p", "tpv-empty-text", empty, allGroups.length ? "Измените фильтр или поисковый запрос." : "Добавьте структурированный блок transport с YAML-полями type и routes.");
      return;
    }

    filteredGroups.forEach((group) => this.renderGroup(content, group));
  }

  renderSummary(parent, rows) {
    const summary = createElement("div", "tpv-summary", parent);
    const stops = rows.reduce((total, row) => {
      const value = Number.parseInt(String(row.stops || "").replace(/[^0-9]/g, ""), 10);
      return Number.isFinite(value) ? total + value : total;
    }, 0);
    [["↗", "Сегменты", rows.length], ["🚌", "Автобусы", rows.filter((row) => row.type === "bus").length], ["🚇", "Метро", rows.filter((row) => row.type === "metro").length], ["○", "Остановки", stops || "—"]].forEach(([icon, label, value]) => {
      const item = createElement("div", "tpv-summary-item", summary);
      createElement("span", "tpv-summary-icon", item, icon);
      const text = createElement("span", "tpv-summary-text", item);
      createElement("small", "tpv-summary-label", text, label);
      createElement("strong", "tpv-summary-value", text, String(value));
    });
  }

  renderGroup(parent, group) {
    const section = createElement("section", `tpv-group tpv-group-${group.type}`, parent);
    const groupHeader = createElement("div", "tpv-group-header", section);
    const groupIcon = createElement("span", "tpv-group-icon", groupHeader, group.type === "bus" ? "🚌" : "🚇");
    groupIcon.setAttribute("aria-hidden", "true");
    const groupText = createElement("div", "tpv-group-text", groupHeader);
    createElement("div", "tpv-group-label", groupText, `${TYPE_LABELS[group.type]} · ${group.sourcePath.split("/").pop()}`);
    createElement("h4", "tpv-group-title", groupText, group.title);
    if (group.subtitle) createElement("div", "tpv-group-subtitle", groupText, group.subtitle);
    createElement("span", "tpv-group-count", groupHeader, String(group.rows.length));

    const routes = createElement("div", "tpv-routes", section);
    group.rows.forEach((row, index) => this.renderRoute(routes, group, row, index));
  }

  renderRoute(parent, group, row, index, inline = false) {
    const card = createElement("article", `tpv-route tpv-route-${row.type} ${inline ? "tpv-inline-route" : ""}`.trim(), parent);
    if (row.color) card.style.setProperty("--tpv-line-color", row.color);

    const top = createElement("div", "tpv-route-top", card);
    createElement("span", "tpv-type-badge", top, row.type === "bus" ? "BUS" : "METRO");
    if (row.code) createElement("span", "tpv-code-badge", top, row.code);
    const routeName = createElement("span", "tpv-route-name", top);
    setInlineText(routeName, row.route || "Маршрут");
    if (index > 0) createElement("span", "tpv-segment-index", top, `Сегмент ${index + 1}`);

    const endpoints = createElement("div", "tpv-endpoints", card);
    const from = createElement("div", "tpv-endpoint", endpoints);
    createElement("span", "tpv-endpoint-dot", from);
    const fromText = createElement("span", "tpv-endpoint-text", from);
    setInlineText(fromText, row.from);
    const connector = createElement("div", "tpv-connector", endpoints);
    createElement("span", "tpv-connector-line", connector);
    createElement("span", "tpv-connector-arrow", connector, "›");
    const to = createElement("div", "tpv-endpoint", endpoints);
    createElement("span", "tpv-endpoint-dot", to);
    const toText = createElement("span", "tpv-endpoint-text", to);
    setInlineText(toText, row.to);

    const details = createElement("div", "tpv-details", card);
    addMetric(details, "◈", "Оператор", row.operator);
    addMetric(details, "→", "Направление", row.direction);
    addMetric(details, "○", row.type === "metro" ? "Станции" : "Остановки", row.stops);
    addMetric(details, "⌁", "Пешком", row.walk, "tpv-walk");
    if (row.color && !inline) {
      const color = createElement("span", "tpv-line-color", details);
      color.style.setProperty("--tpv-line-color", row.color);
      createElement("span", "tpv-color-dot", color);
      createElement("span", "tpv-color-value", color, row.color);
    }

    if (!inline) {
      const footer = createElement("div", "tpv-route-footer", card);
      const source = createElement("button", "tpv-source-button", footer, `Открыть исходный блок · строка ${row.line}`);
      source.type = "button";
      source.addEventListener("click", () => {
        void this.app.workspace.openLinkText(row.sourcePath, row.sourcePath, false);
        new Notice(`Открыт транспортный блок: ${row.sourcePath}`);
      });

      if (row.links?.length) {
        const links = createElement("span", "tpv-route-links", footer);
        row.links.forEach((url, linkIndex) => {
          const link = createElement("a", "tpv-map-button", links, linkIndex === 0 ? "Карта" : `Ссылка ${linkIndex + 1}`);
          link.href = url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        });
      }
    }
  }
}

module.exports = { default: TravelTransportView };
