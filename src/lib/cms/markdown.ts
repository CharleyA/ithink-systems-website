import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

const SANITIZE: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img",
    "h1",
    "h2",
    "figure",
    "figcaption",
    "details",
    "summary",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: {
    img: ["http", "https"],
  },
  allowProtocolRelative: false,
  disallowedTagsMode: "discard",
  transformTags: {
    img: (_tagName, attribs) => {
      const src = attribs.src || "";
      const safe = src.startsWith("/media/") || src.startsWith("https://") || src.startsWith("http://");
      const next: Record<string, string> = {};
      if (safe) next.src = src;
      if (attribs.alt) next.alt = attribs.alt;
      return { tagName: "img", attribs: next };
    },
    a: (tagName, attribs) => {
      const href = attribs.href || "";
      const external = href.startsWith("http://") || href.startsWith("https://");
      if (external) {
        return { tagName, attribs: { href, rel: "noopener noreferrer", target: "_blank" } };
      }
      const next: Record<string, string> = {};
      if (href) next.href = href;
      if (attribs.name) next.name = attribs.name;
      return { tagName, attribs: next };
    },
  },
};

export function renderMarkdown(markdown: string) {
  const raw = marked.parse(markdown, { async: false }) as string;
  return sanitizeHtml(raw, SANITIZE);
}
