import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const DOCS_JSON = join(ROOT, "docs.json");
const README = join(ROOT, "README.md");
const START = "<!-- DOCS_TOC_START -->";
const END = "<!-- DOCS_TOC_END -->";

function extractFrontmatter(filePath) {
  if (!existsSync(filePath)) return null;
  const content = readFileSync(filePath, "utf-8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^(\w+):\s*"?(.+?)"?\s*$/);
    if (m) fm[m[1]] = m[2];
  }
  return fm;
}

function collectPages(groups) {
  const sections = [];
  for (const group of groups) {
    const pages = [];
    for (const page of group.pages ?? []) {
      if (typeof page === "string") {
        const fm = extractFrontmatter(join(ROOT, page + ".mdx"));
        pages.push({
          path: page,
          title: fm?.title ?? page.split("/").pop(),
          description: fm?.description ?? "",
        });
      }
    }
    if (pages.length > 0) {
      sections.push({ group: group.group, pages });
    }
  }
  return sections;
}

function generateTOC(sections) {
  const lines = [];
  for (const section of sections) {
    lines.push(`### ${section.group}`);
    lines.push("");
    for (const page of section.pages) {
      const desc = page.description ? ` — ${page.description}` : "";
      lines.push(`- [${page.title}](https://openclaw.magua.app/${page.path})${desc}`);
    }
    lines.push("");
  }
  return lines.join("\n").trimEnd();
}

const docs = JSON.parse(readFileSync(DOCS_JSON, "utf-8"));
const allGroups = docs.navigation.tabs.flatMap((tab) => tab.groups ?? []);
const sections = collectPages(allGroups);
const toc = generateTOC(sections);

const readme = readFileSync(README, "utf-8");
const startIdx = readme.indexOf(START);
const endIdx = readme.indexOf(END);

if (startIdx === -1 || endIdx === -1) {
  console.error("README.md missing TOC markers");
  process.exit(1);
}

const updated =
  readme.slice(0, startIdx + START.length) +
  "\n\n" +
  toc +
  "\n\n" +
  readme.slice(endIdx);

if (updated !== readme) {
  writeFileSync(README, updated);
  console.log("README.md TOC updated");
} else {
  console.log("README.md TOC already up to date");
}
