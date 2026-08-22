---
title: Regional-facial-variations Agent 实现提示词
category: projects
tags: [Regional-facial-variations, MapLibre, GitHub-Pages, Agent, 提示词, 地理可视化]
status: active
created: 2026-08-22
updated: 2026-08-22
author:
---

# Regional-facial-variations Agent 实现提示词

> **父文档**：[Regional-facial-variations 区域地理可视化](2026-08-22-Regional-facial-variations-区域地理可视化.md)  
> **实现仓库**：[Regional-facial-variations](https://github.com/jk9988610/Regional-facial-variations)（待建）

本文档供 **Regional-facial-variations** 实现仓中的 Cursor Agent 使用。Talk 仓库只存提示词与规划，不写产品代码。

---

## 一句话指导（复制到 Regional-facial-variations 仓库 Agent 对话）

在 **Regional-facial-variations** 仓库 Cursor Agent 中**只发这一句**即可；**无需**你手动复制任何文档，由 Agent 完成同步与后续讨论/实现：

```
本仓库为 Regional-facial-variations 实现仓。请先自行从 Talk 获取规范写入 docs/REFERENCE-SPEC.md 与 docs/REFERENCE-AGENT-PROMPT.md，再与我讨论并确认十国名单、省/州数据源与 zoom 方案后，搭建 Vite + MapLibre + GitHub Pages 骨架；纯地理、开源低成本、maxZoom 7、精选 10 国一级行政区划。
```

Talk 源文档地址（供 Agent 拉取）：

- https://raw.githubusercontent.com/jk9988610/Talk/main/docs/07-projects/2026-08-22-Regional-facial-variations-区域地理可视化.md
- https://raw.githubusercontent.com/jk9988610/Talk/main/docs/07-projects/2026-08-22-Regional-facial-variations-Agent实现提示词.md

---

## 使用说明（用户侧）

| 步骤 | 操作 |
|------|------|
| 1 | 建 GitHub 仓 **Regional-facial-variations**，用 Cursor 打开 |
| 2 | 发送上方 **一句话指导** |
| 3 | Agent 负责：拉取 Talk 文档 → 写入本仓 `docs/` → 与你讨论开放问题 → 再实现 |
| 4 | 确认 Pages 部署与冒烟测试 |

---

## 缩短版提示词（Agent 同步文档后执行）

```
# 任务：Regional-facial-variations 区域地理地图（讨论 + MVP）

## 角色

你是 Regional-facial-variations 实现仓的 Agent。先完成阶段 0 同步 Talk 文档，再与用户讨论开放问题，确认后再写代码。

## 阶段 0（必须由你完成）

1. 从 Talk 获取以下源文件**全文**（优先 raw.githubusercontent.com）：
   - `docs/07-projects/2026-08-22-Regional-facial-variations-区域地理可视化.md`
     → 写入本仓 `docs/REFERENCE-SPEC.md`
   - `docs/07-projects/2026-08-22-Regional-facial-variations-Agent实现提示词.md`
     → 写入本仓 `docs/REFERENCE-AGENT-PROMPT.md`
2. 在每个 REFERENCE 文件顶部注明：源仓库 Talk、源路径、同步日期、raw URL。
3. 提交 git：`docs: 从 Talk 同步参考文档`。
4. 若无法访问 GitHub：README 写明阻塞与 raw URL，向用户索要粘贴内容。

完成阶段 0 后，阅读 `docs/REFERENCE-SPEC.md`，**先与用户讨论** §开放问题，再进入阶段 1。

## 必读参考

- 本仓 `docs/REFERENCE-SPEC.md`
- Talk：https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-22-Regional-facial-variations-区域地理可视化.md

## 产品约束（必须遵守）

- **纯地理**：不做历史疆域、时间轴、文明叙事
- **开源低成本**：MapLibre GL + OSM 系底图；无 Google/Mapbox 商业 Key
- **精选 10 国**：每国展示一级行政区划（省/州/都道府县等）
- **zoom**：`minZoom 1`，`maxZoom 7`；省界 `minZoom 4` 左右
- **托管**：GitHub Pages（Actions 构建部署）
- **数据**：国界/省界 GeoJSON 按国拆分；README 列数据来源与许可

## 初稿十国（可与用户调整）

中国、美国、巴西、印度、俄罗斯、日本、德国、澳大利亚、尼日利亚、墨西哥。

## 交互 MVP

1. 世界视图 zoom 2：10 国高亮
2. 点击国 → flyTo + 加载该国 admin-1 GeoJSON
3. 点击省/州 → 高亮 + 信息面板（中英文名）
4. 返回世界按钮

## 技术栈

- Vite + TypeScript + MapLibre GL JS
- 底图：OpenFreeMap（起步）或自托管 PMTiles zoom 0–7
- 区划：Natural Earth admin-1 或 geoBoundaries ADM1（实现时选型并文档化）

## 不做（MVP）

- 街道级 zoom、全球 POI、卫星影像、用户登录、后台编辑

## 建议仓库结构

```
src/
  map/           # MapLibre 初始化、图层、flyTo
  data/          # 加载 countries.json、admin1 geojson
  ui/            # 面板、面包屑
data/
  countries.json
  countries/{iso}/admin1.geojson
docs/
  REFERENCE-SPEC.md
  REFERENCE-AGENT-PROMPT.md
  SMOKE-TEST.md
.github/workflows/pages.yml
```

## 交付顺序

0. 同步 Talk REFERENCE 文档
1. 与用户确认：十国名单、数据源、facial-variations 后续含义
2. 骨架 + MapLibre 空白地图 + Pages workflow
3. 10 国国界高亮 + 点击 flyTo
4. admin-1 图层 + 点击信息面板
5. SMOKE-TEST + README（数据许可署名）

## 验收

1. Pages URL：世界视图 → 点国 → 看省界 → 点省看名称
2. maxZoom 不超过 7；移动端基本可用
3. 开源署名完整

请先完成阶段 0，然后列出开放问题请用户确认，再输出实现计划。
```

---

## 文档维护

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-08-22 | 初版：一句话指导 + 缩短版提示词 |
