# AI 工作指南

本文件指导 AI 助手（含 Cursor Cloud Agent 等新对话）如何根据 Talk 仓库文档开展工作。

## 仓库定位

| 仓库 | 角色 | 做什么 | 不做什么 |
|------|------|--------|----------|
| **Talk**（本仓库） | 想法文档仓库 | 记录构想、讨论、方法论、写作 | 不维护产品代码、不部署交互原型 |
| **[CivSlice](https://github.com/jk9988610/CivSlice)** | 孵化实现仓库 | 十维历史可视化站点与数据 | 不回写构想讨论到实现层 unless 用户要求 |

**原则**：Talk 写「为什么、是什么、怎么做」；CivSlice 写「做出来」。

---

## 开始工作前必读

按顺序阅读以下文档：

1. [docs/README.md](README.md) — 文档分类体系
2. [CONTRIBUTING.md](../CONTRIBUTING.md) — 写作与 frontmatter 规范
3. 与任务相关的分类 README（如 `docs/07-projects/README.md`）

若任务涉及 **CivSlice**，额外必读：

4. [多维文明历史可视化](07-projects/2026-08-12-多维文明历史可视化.md) — 项目总览
5. [CivSlice 史料方法论与数据规范](07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md) — 数据模型与科学方法
6. [维基百科史料启发](08-discussions/2026-08-12-维基百科中国历史对CivSlice的启发.md) — 素材提取与结构对照

---

## Talk 仓库内 AI 任务规范

### 文档写作

- 在 `docs/<分类>/` 下新建 `YYYY-MM-DD-简短标题.md`
- 复制 [templates/](../templates/) 中合适模板
- frontmatter 必填：`title`, `category`, `tags`, `status`, `created`, `updated`
- 一篇文档只归属一个主分类，跨域用 `tags`

### 分类选择

| 内容类型 | 目录 |
|----------|------|
| 碎片灵感 | `01-ideas` |
| 完整文章 | `02-essays` |
| 技术笔记 | `03-tech` |
| 项目构想（未孵化） | `07-projects` |
| 开放讨论、方法论辩论 | `08-discussions` |
| 已孵化项目的原始构想 | `07-projects`（标注已孵化） |

### Git 规范

- 分支名：`cursor/<描述>-5709`
- 完成后提交、推送、创建 PR 合并至 `main`
- Talk 的 Pages（`site/`）仅作**文档导航门户**，不部署产品原型

---

## CivSlice 仓库 AI 任务规范

> 在 **CivSlice 仓库**的新对话中执行，不在 Talk 中写实现代码（除非用户明确要求同步文档）。

### 仓库结构（预期）

```
CivSlice/
├── site/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── data/
│       └── china.json      # 国家快照数据
├── .github/workflows/
│   └── pages.yml           # 部署 site/ 至 Pages
└── README.md
```

### 十维框架（定稿，勿擅自增减）

| id | 维度 |
|----|------|
| `geography` | 地理气候 |
| `resources` | 资源能源 |
| `technology` | 技术能力 |
| `production` | 生产组织 |
| `economy` | 经济交换 |
| `politics` | 政治制度 |
| `military` | 军事国力 |
| `culture` | 社会文化 |
| `daily_life` | 日常生活 |
| `historical_memory` | 历史记忆 |

跨域细节用 `tags`，不新增雷达轴。

### 科学方法（强制执行）

1. **考古与文献优先** — 推断须标注并说明逻辑链
2. **禁止以今证古** — 现代水平不能反推古代 `level`
3. **承认断裂** — 亡国、改朝、殖民、灾害造成的非连续性
4. **相对等级** — `level` 1–5 为文明内部概括，非跨文明排名
5. **留空优于瞎填** — 无证据标 `absent`

### 可信度 `confidence`

| 值 | 含义 |
|----|------|
| `documented` | 考古实物或 contemporaneous 文献 |
| `inferred` | 基于相邻证据的合理推论 |
| `speculative` | 假说性判断，待检验 |
| `absent` | 证据不足，不做判断 |

### 快照数据模型

详见 [CivSlice 史料方法论与数据规范](07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md)。

关键字段：

```json
{
  "year": -500,
  "eraLabel": "春秋末期",
  "evidenceTypes": ["archaeology", "literature"],
  "evidenceNote": "主要依据《左传》与诸侯墓葬考古",
  "worldContext": "孔子活跃；波斯帝国、希腊城邦同期",
  "sources": [
    { "type": "literature", "ref": "《左传》", "note": " contemporaneous 编年史" }
  ],
  "controversies": ["战国起点有前475与前403等划分"],
  "dimensions": {
    "technology": {
      "level": 4,
      "summary": "铁器推广、青铜礼器、车战",
      "confidence": "documented"
    }
  }
}
```

### 时代命名规范

| 时段 | `eraLabel` 优先用 |
|------|-------------------|
| 信史前（约前 841 年以前） | 考古文化名（二里头文化、良渚文化） |
| 信史后 | 王朝纪年 + 时期（西周早期、北宋中期） |
| 有争议 | 考古文化名 + 注释争议 |

**信史连续纪年起点**：公元前 841 年（西周共和元年）。

### 史料类型三分法

| 类型 | 代码 | 可信度基线 |
|------|------|-----------|
| 考古遗存 | `archaeology` | 高（需解读） |
| 后世文献 | `literature` | 中（有时代距离） |
| 神话传说 | `mythology` | 低（政治叙事） |

每条快照的 `evidenceTypes` 须标明主要依赖哪类。

### 从外部素材（如维基百科）提取数据的规则

维基百科是**素材库**，不是权威数据源。提取时：

1. **不照搬** — 须交叉验证并标注 `confidence`
2. **结构化** — 拆入十维，而非复制叙事段落
3. **补缺口** — 维基偏政治军事，医学/日常/资源须另找专题史
4. **记争议** — 维基写「仍有争议」处，写入 `controversies`
5. **分记忆与史实** — 后世叙述偏差写入 `historical_memory` 维度的 `note`

### CivSlice 任务优先级（建议）

| 优先级 | 任务 |
|--------|------|
| P0 | 保持 Pages 可访问，数据与 UI 一致 |
| P1 | 完善 `china.json`：结构化 sources、evidenceTypes、controversies |
| P2 | 从维基等素材按十维规范补充/校验快照 |
| P3 | 增加第二国家（埃及、罗马等） |
| P4 | 跨文明同期对比模式 |

---

## 新对话启动模板

### 在 Talk 仓库

```
请阅读 docs/AI-GUIDE.md 和 CONTRIBUTING.md，然后在 docs/<分类>/ 下完成以下任务：
[描述具体任务]
```

### 在 CivSlice 仓库

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
2. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-多维文明历史可视化.md
3. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md

然后在 CivSlice 仓库执行：
[描述具体任务]

遵守十维框架、科学方法原则和快照数据模型。不要修改 Talk 仓库除非明确要求。
```

---

## 文档变更时的联动

| 变更内容 | 须同步更新 |
|----------|-----------|
| 十维框架调整 | 项目总览、数据规范、CivSlice `china.json` schema |
| 科学方法原则 | AI-GUIDE、数据规范、CivSlice 侧栏文案 |
| 新孵化项目 | Talk `site/app.js` 的 projects 列表、07-projects README |
| 维基/讨论新启发 | 08-discussions 归档 + 数据规范补充 |

---

## 禁止事项

- 在 Talk 的 `site/` 中部署 CivSlice 等产品原型
- 将 `confidence: documented` 用于无文献/考古支撑的猜测
- 用现代国家状态反推古代各维 `level`
- 擅自删除 `absent` 维度强行填内容
- 把维基百科叙述当作定论写入数据

---

## 相关文档索引

| 文档 | 路径 |
|------|------|
| 项目总览 | [07-projects/2026-08-12-多维文明历史可视化.md](07-projects/2026-08-12-多维文明历史可视化.md) |
| 数据规范 | [07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md](07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md) |
| 维基启发 | [08-discussions/2026-08-12-维基百科中国历史对CivSlice的启发.md](08-discussions/2026-08-12-维基百科中国历史对CivSlice的启发.md) |
| 贡献指南 | [CONTRIBUTING.md](../CONTRIBUTING.md) |
| CivSlice 实现 | https://github.com/jk9988610/CivSlice |
