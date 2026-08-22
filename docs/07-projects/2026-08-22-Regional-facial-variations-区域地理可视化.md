---
title: Regional-facial-variations 区域地理可视化
category: projects
tags: [地理, 可视化, GitHub-Pages, MapLibre, OpenStreetMap, 行政区划, 开源地图]
status: draft
created: 2026-08-22
updated: 2026-08-22
author:
---

# Regional-facial-variations 区域地理可视化

> **待孵化** — 实现将迁移至独立仓库 [**Regional-facial-variations**](https://github.com/jk9988610/Regional-facial-variations)（GitHub Pages）。  
> 本文档为 Talk 中的构想与讨论底稿；实现细节在实现仓继续迭代。

---

## 问题

需要一个**纯地理**（不结合历史叙事）的交互地图：从世界总览进入精选国家，并能看到该国**省级 / 州级 / 等同一级行政区划**的划分。要求：

- 数据与工具链尽量 **免费、开源**
- 托管与流量 **低成本**（静态站 + 有限 zoom）
- 范围 **精选**（非全球 200 国全量），便于维护与讨论

---

## 目标与非目标

### 目标（MVP）

1. 世界视图展示 **10 个精选国家**（可高亮、可点击）
2. 点击国家 → 飞入该国，显示 **一级行政区划**（省 / 州 / 道府县 / Bundesland 等）
3. 点击省/州 → 显示名称与基础信息面板（名称、所属国、可选人口/面积占位字段）
4. 部署至 **GitHub Pages**，无后端、无 API Key

### 非目标（MVP 不做）

- 历史疆域、时间轴、文明叙事
- 街景级 zoom（巷弄、门牌、店铺 POI）
- 全球卫星影像在线瓦片
- 全球 200+ 国与全部城市
- 用户登录、数据编辑后台

---

## 十国精选名单（初稿，可在实现仓调整）

选取原则：**大洲覆盖 + 行政体系统样性 + OSM/开源边界数据相对可用**。

| # | 国家 | ISO | 一级区划名称（中文展示） | 区划数量（约） | 低 zoom 显示策略 |
|---|------|-----|--------------------------|----------------|------------------|
| 1 | 中国 | CN | 省 / 自治区 / 直辖市 | 34 | zoom 2+ 面色；zoom 4+ 省界 |
| 2 | 美国 | US | 州（State） | 50 + DC 等 | zoom 2+ 面色；zoom 4+ 州界 |
| 3 | 巴西 | BR | 州（Estado） | 26 + DF | zoom 3+ 面色 |
| 4 | 印度 | IN | 邦 / 中央直辖区 | 28 + 8 | zoom 3+ 面色 |
| 5 | 俄罗斯 | RU | 联邦主体 | 80+ | zoom 3+ 面色；区划多，需简化交互 |
| 6 | 日本 | JP | 都道府县 | 47 | zoom 3+ 点或面色；zoom 5+ 道府县界 |
| 7 | 德国 | DE | 联邦州（Bundesland） | 16 | zoom 4+ 州界 |
| 8 | 澳大利亚 | AU | 州 / 领地 | 6 + 2 | zoom 3+ 面色 |
| 9 | 尼日利亚 | NG | 州（State） | 36 | zoom 4+ 州界 |
| 10 | 墨西哥 | MX | 州（Estado） | 32 | zoom 4+ 州界 |

> **说明**：名单为讨论初稿。实现仓可替换 1–2 国（如加入印尼、加拿大），但应保持总数约 10，避免范围膨胀。

### 小国 / 岛国备选（若替换）

| 国家 | 注意 |
|------|------|
| 新加坡、卢森堡 | 世界视图用 **点 + 国名**，zoom 6+ 再显示面 |
| 英国 | 可考虑「四国」或郡级，一级区划定义需先定 |

---

## 交互流程（草案）

```
① 世界视图（zoom 2）
   └── 底图 + 10 国高亮（大国面色 / 小国点）

② 点击某国
   └── flyTo 该国（zoom 4–5）+ 加载该国省级 GeoJSON

③ 点击省/州
   └── 高亮该区划 + 侧栏/弹层：中英文名、ISO 代码、所属国
   └── flyTo 该区划 bbox（zoom 6–7）

④ 返回
   └── 「世界」按钮回到 zoom 2
```

### Zoom 分层（低成本推荐）

| 图层 | minZoom | maxZoom | 内容 |
|------|---------|---------|------|
| 世界底图 | 1 | 7 | OSM 矢量 / PMTiles 浅色 |
| 精选国边界（面） | 2 | 7 | 仅 10 国 |
| 小国标注（点） | 2 | 7 | 若名单含城邦 |
| 省/州边界（面） | 4 | 7 | 仅当前选中国 |
| 省/州名称 | 5 | 7 | 碰撞避让 |
| 首都 / 代表城市（可选） | 4 | 7 | 每国 1–3 个，MVP 可省略 |

**硬限制**：`maxZoom: 7`（不加载街道级瓦片，控制流量与包体）。

---

## 技术栈（开源、低成本）

| 层 | 选型 | 理由 |
|----|------|------|
| 渲染 | **MapLibre GL JS** | 开源、矢量样式、symbol 碰撞 |
| 底图 | **OpenFreeMap** 或自托管 **PMTiles**（zoom 0–7） | 免 API Key；后期可迁静态托管 |
| 国界 / 省界 | **GeoJSON**（按国拆分文件） | 只打包 10 国，体积极小 |
| 构建 | **Vite** + TypeScript | 轻量、Pages 友好 |
| 托管 | **GitHub Pages** + Actions | 零服务器 |
| 数据许可 | OSM ODbL、Natural Earth 公有领域、geoBoundaries 等 | 页面保留署名 |

### 不推荐（MVP）

- Google / Mapbox 商业瓦片（非开源、按量计费）
- 全球 zoom 14+ 瓦片包
- 实时 Overpass API 查询（依赖外部、慢、不稳定）

---

## 数据来源（实现仓需验证与落盘）

### 国界（10 国裁剪）

| 来源 | 许可 | 用途 |
|------|------|------|
| [Natural Earth](https://www.naturalearthdata.com/) 1:50m | 公有领域 | 国界、海岸线 |
| [geo-countries](https://github.com/datasets/geo-countries) | 开放 | 按 ISO 过滤 10 国 |

### 一级行政区划（省 / 州）

| 来源 | 许可 | 说明 |
|------|------|------|
| [geoBoundaries](https://www.geoboundaries.org/) | CC BY 4.0 | 按 ISO + admin level 下载，质量因国而异 |
| [Natural Earth admin-1](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/) | 公有领域 | 全球 admin-1，需按国过滤；边界较简化 |
| OpenStreetMap / Overpass | ODbL | 最细，但需自行提取与简化 |

**建议流程**：

1. MVP 用 **Natural Earth admin-1** 或 **geoBoundaries ADM1** 快速起步
2. 按 `ISO3166-1` 拆成 `data/countries/{iso}/admin1.geojson`
3. 属性统一：`id`, `name`, `name_en`, `country_iso`, `admin_level: 1`
4. 拓扑简化（如 `mapshaper`）减小文件体积

### 体量粗估

| 内容 | 大小（粗估） |
|------|--------------|
| 全球底图 PMTiles zoom 0–7 | 50–80 MB（或先用 OpenFreeMap CDN） |
| 10 国 admin-1 GeoJSON（简化后） | 5–15 MB |
| 应用 JS | < 1 MB |

---

## 数据模型（草案）

### `config/countries.json`

```json
{
  "featured": [
    {
      "id": "china",
      "iso": "CN",
      "name": "中国",
      "name_en": "China",
      "admin_label": "省/自治区/直辖市",
      "center": [104.0, 35.0],
      "zoom": 4,
      "color": "#c0392b",
      "display": "polygon",
      "polygon_minzoom": 2,
      "admin1_minzoom": 4
    }
  ]
}
```

### `admin1` GeoJSON 要素属性（统一 schema）

```json
{
  "type": "Feature",
  "properties": {
    "id": "CN-44",
    "name": "广东",
    "name_en": "Guangdong",
    "country_iso": "CN",
    "admin_level": 1
  },
  "geometry": { "type": "MultiPolygon", "coordinates": [] }
}
```

### 扩展字段（后续讨论，MVP 可留空）

- `population`, `area_km2` — 统计占位
- `region_meta` — 与「Regional-facial-variations」主题相关的区域属性（**待定义**：见开放问题）

---

## 页面布局（草案）

```
┌──────────────────────────────────────────────────┐
│  [世界]  当前：中国 › 广东          （面包屑）      │
├───────────────────────────────┬──────────────────┤
│                               │  信息面板         │
│         MapLibre 地图          │  - 名称           │
│                               │  - 所属国         │
│                               │  - 区划类型       │
│                               │  - （预留字段）    │
└───────────────────────────────┴──────────────────┘
```

移动端：信息面板改为底部抽屉。

---

## 仓库与部署

| 项 | 值 |
|----|-----|
| 实现仓库名 | `Regional-facial-variations` |
| 托管 | GitHub Pages |
| 默认分支 | `main` |
| 构建 | GitHub Actions → `dist/` 或 `docs/` |

---

## 验收标准（MVP）

1. Pages 可访问；默认世界视图 zoom 2，可见 10 国高亮
2. 点击任一精选国 → 飞入并显示该国一级区划边界
3. 点击省/州 → 高亮 + 信息面板显示中英文名
4. 「返回世界」可用；无控制台致命错误
5. 数据与底图署名符合开源许可（README 列出来源）
6. 移动端基本可用（可横滑地图、可点开面板）

---

## 风险与约束

| 风险 | 缓解 |
|------|------|
| 各国 admin-1 边界争议（克什米尔、克里米亚等） | 采用单一数据源并 README 声明「地理展示用，不表政治立场」 |
| 俄罗斯联邦主体数量多、点击目标小 | 提高 minZoom 或合并远东简化视图 |
| OpenFreeMap 国内访问慢 | 后期改自托管 PMTiles 到 Pages / CDN |
| 项目名含 facial-variations，地理 MVP 与后续主题关系未闭合 | 数据模型预留 `region_meta`；实现仓与用户继续定义 |

---

## 开放问题（留给实现仓讨论）

1. **十国名单是否调整？** 是否用印尼/加拿大替换尼日利亚/墨西哥等？
2. **「Regional-facial-variations」中 facial 的含义？** 地理 MVP 先做区划；后续是否在省/州层叠加人口学或表型相关数据（需另寻开放数据集）？
3. **省界数据源** 用 Natural Earth（快）还是 geoBoundaries（准）？
4. **底图** 先用 OpenFreeMap CDN，还是首版就自托管 PMTiles？
5. **是否每国加 1–3 个代表城市点？** MVP 可选
6. **多语言**：仅中文界面 + 英文地名，还是 i18n？
7. **配色**：按国固定色 / 按洲配色 / 用户可选？

---

## 下一步（实现仓）

1. 同步本文档至实现仓 `docs/REFERENCE-SPEC.md`
2. 确认十国名单与 admin-1 数据源
3. 搭建 Vite + MapLibre + Pages 骨架
4. 导入 10 国 admin-1 GeoJSON，打通点击交互
5. 编写 `docs/SMOKE-TEST.md` 与 README

---

## 相关讨论脉络（Talk 内）

本构想来自地图技术选型讨论，已确定方向：

- 纯地理，不结合历史
- 开源免费、zoom 1–7、精选国家而非全球全量
- 小国低 zoom 用点，大国用面；省/州在 zoom 4+ 显示

---

## 文档维护

| 版本 | 日期 | 说明 |
|------|------|------|
| v0.1 | 2026-08-22 | 初稿：十国名单、交互、技术栈、开放问题 |
