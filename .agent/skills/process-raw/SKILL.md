---
name: process-raw
description: 将 raw/ 目录中的 Markdown 文件转换为 Mintlify .mdx 格式，更新导航，检查断链。
  用户说"处理 raw"时触发。
user_invocable: true
---

# 处理 raw 文件流程

## 步骤 1：准备

1. 读取 `raw/` 下所有 `.md` 文件，如果目录为空或不存在，告知用户并停止
2. 读取 `docs.json` 了解现有导航结构、分组命名规范
3. 读取 2-3 个已有 `.mdx` 页面，了解项目的风格、结构和详细程度

## 步骤 2：分析与规划

对每个 raw 文件：

1. 读取内容，确定它应归属的导航分组
2. 确定目标文件名（kebab-case，如 `使用Obsidian.md` → `use-obsidian.mdx`）
3. 检查是否与现有页面内容重复——如果重复，应更新现有页面而非新建
4. 如果无法确定分组，询问用户
5. 将规划结果汇总告知用户，确认后再执行

## 步骤 3：转换为 Mintlify .mdx

### Frontmatter

每个文件必须有 `title` 和 `description`：

```yaml
---
title: "页面标题"
description: "简洁描述，用于 SEO 和导航"
---
```

如果原文已有 frontmatter，保留并补全缺失字段。

### 内容转换规则

- **保持原有内容风格**，不要过度改写
- **链接格式**：项目内链接使用根相对路径，不带扩展名（如 `/guides/use-obsidian`），不使用相对路径（`../`）
- **代码块**：所有代码块必须有语言标签
- **Callout 转换**：
  - `> **Note**` / `> **注意**` → `<Note>内容</Note>`
  - `> **Warning**` / `> **警告**` → `<Warning>内容</Warning>`
  - `> **Tip**` / `> **提示**` → `<Tip>内容</Tip>`
- **适当使用 Mintlify 组件**（不要过度使用）：
  - 分步操作 → `<Steps>`
  - 多语言代码 → `<CodeGroup>`
  - 导航卡片 → `<Card>` + `<Columns>`
  - 可选细节 → `<Accordion>`
- **标题使用 sentence case**（"Getting started"，而非"Getting Started"）
- **不使用**：营销用语、填充短语、装饰性 emoji、装饰性格式

## 步骤 4：放置文件并更新导航

1. 将 `.mdx` 文件放到对应目录（如 `guides/`、`troubleshooting/`）
2. 在 `docs.json` 的对应 group 的 `pages` 数组中添加新页面路径
3. 如果需要新的 group，在 `docs.json` 中创建

## 步骤 5：删除 raw 源文件

处理完成后，删除 `raw/` 中已处理的源文件。

## 步骤 6：验证

运行 CLI 检查：

```bash
npx mint broken-links
npx mint validate
```

修复发现的问题：
- 导航中的错误路径 → 修正 `docs.json`
- 文档内的错误链接 → 修正对应 `.mdx` 文件
- 指向已删除页面的链接 → 告知用户并建议处理方式

同时人工检查：
- [ ] Frontmatter 包含 title 和 description
- [ ] 所有代码块有语言标签
- [ ] 内部链接使用根相对路径且无扩展名
- [ ] 新页面已添加到 `docs.json` 导航
- [ ] 内容风格与现有页面一致

## 步骤 7：汇报结果

输出处理摘要：
- 处理了哪些文件（原文件名 → 新路径）
- 添加到了哪个导航分组
- 验证结果（通过 / 发现问题及修复情况）
