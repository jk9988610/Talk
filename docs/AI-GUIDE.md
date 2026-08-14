# AI 工作指南

本文件指导 AI 助手（含 Cursor Cloud Agent 等新对话）如何根据 Talk 仓库文档开展工作。

## 仓库定位

| 仓库 | 角色 | 做什么 | 不做什么 |
|------|------|--------|----------|
| **Talk**（本仓库） | 想法文档仓库 | 记录构想、讨论、方法论、写作 | 不维护产品代码、不部署交互原型 |
| **[CivSlice](https://github.com/jk9988610/CivSlice)** | 孵化实现仓库 | 十维历史可视化站点与数据 | 不回写构想讨论到实现层 unless 用户要求 |
| **[MiraSpace](https://github.com/jk9988610/MiraSpace)** | 孵化实现仓库 | 米拉空间数字生命 Canvas 模拟 | 不回写构想讨论到实现层 unless 用户要求 |

**原则**：Talk 写「为什么、是什么、怎么做」；CivSlice / MiraSpace 写「做出来」。

---

## 开始工作前必读

按顺序阅读以下文档：

1. [docs/README.md](README.md) — 文档分类体系
2. [CONTRIBUTING.md](../CONTRIBUTING.md) — 写作与 frontmatter 规范
3. 与任务相关的分类 README（如 `docs/07-projects/README.md`）

若任务涉及 **CivSlice**，额外必读：

4. **[CivSlice 证据驱动数据标准](07-projects/2026-08-13-CivSlice-证据驱动数据标准.md)** — **v3 最高数据规范**（证据、absent、禁止推测）
5. [多维文明历史可视化](07-projects/2026-08-12-多维文明历史可视化.md) — 项目总览
6. [CivSlice 史料方法论与数据规范](07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md) — v2 历史参考
7. [CivSlice 雷达图交互设计](07-projects/2026-08-12-CivSlice-雷达图交互设计.md) — 剖面雷达 UI
8. [CivSlice 对比雷达与派生指标](07-projects/2026-08-12-CivSlice-对比雷达与派生指标.md) — 双雷达与计算公式
9. [CivSlice 时代维度模板](07-projects/2026-08-12-CivSlice-时代维度模板.md) — 比较束 / aspect 建议目录
10. **[CivSlice 区域导航与比较选择](07-projects/2026-08-13-CivSlice-区域导航与比较选择.md)** — **v2 主交互**（区域→时段→泳道→比较勾选）
11. [CivSlice 时间轴交互流程](07-projects/2026-08-12-CivSlice-时间轴交互流程.md) — 泳道细节（v1 参考）
12. [维基百科史料启发](08-discussions/2026-08-12-维基百科中国历史对CivSlice的启发.md) — 素材线索（须追到原始来源）

若任务涉及 **MiraSpace**，额外必读：

4. **[米拉空间数字生命演化](07-projects/2026-08-14-米拉空间数字生命演化.md)** — 项目总览与世界观
5. **[MiraSpace 科学阶段路线图](07-projects/2026-08-14-MiraSpace-科学阶段路线图.md)** — **阶段划分依据**（P0 + S1–S5，勿用 RNA→DNA→细胞 线性计划）
6. **[MiraSpace 阶段 0 — 空域、坐标与观察者](07-projects/2026-08-14-MiraSpace-阶段0-空域坐标与观察者.md)** — P0 + S1 实现规格
7. **[MiraSpace S2 — 达尔文阈值](07-projects/2026-08-14-MiraSpace-S2-达尔文阈值.md)** — S2 复制子规格
8. **[MiraSpace S2 验收与 S2→S3 门槛](07-projects/2026-08-14-MiraSpace-S2-验收与S2-S3门槛.md)** — S2 结案与开 S3 判定
9. **[MiraSpace S3 — 个体化与原细胞](07-projects/2026-08-14-MiraSpace-S3-个体化与原细胞.md)** — S3 规格
10. **[MiraSpace 测试分层与报告规范](07-projects/2026-08-14-MiraSpace-测试分层与报告规范.md)** — **AI 默认只跑 Smoke**
11. [MiraSpace 项目初心与设计理念](07-projects/2026-08-14-MiraSpace-项目初心与设计理念.md) — 涌现 / 观察者 / 环境迭代
12. **[MiraSpace S5 — 多细胞性](07-projects/2026-08-14-MiraSpace-S5-多细胞性.md)** — **当前实现规格**
13. [MiraSpace S4→S5 门槛确认书](07-projects/2026-08-14-MiraSpace-S4-S5-门槛确认书.md)

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

- 分支名：`cursor/<描述>-82fd`
- 完成后提交、推送、创建 PR 合并至 `main`
- Talk 的 Pages（`site/`）仅作**文档导航门户**，不部署产品原型

---

## CivSlice 仓库 AI 任务规范

> 在 **CivSlice 仓库**的新对话中执行，不在 Talk 中写实现代码（除非用户明确要求同步文档）。

### UI 实现须参考

- [CivSlice 雷达图交互设计](07-projects/2026-08-12-CivSlice-雷达图交互设计.md) — 剖面雷达 UI、卡片、叠图
- [CivSlice 对比雷达与派生指标](07-projects/2026-08-12-CivSlice-对比雷达与派生指标.md) — 双雷达架构、七项派生指标、计算公式
- [CivSlice 时代维度模板](07-projects/2026-08-12-CivSlice-时代维度模板.md) — 核心维 + 时代模块，分时期字段集

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
| P4 | 双雷达 UI：剖面/对比 Tab + stats.js 派生指标 |
| P5 | 跨文明对比叠图 + 时代均值背景 |

---

## 新对话启动模板

### 在 Talk 仓库

```
请阅读 docs/AI-GUIDE.md 和 CONTRIBUTING.md，然后在 docs/<分类>/ 下完成以下任务：
[描述具体任务]
```

### 在 CivSlice 仓库（通用）

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
2. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-多维文明历史可视化.md
3. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md

然后在 CivSlice 仓库执行：
[描述具体任务]

遵守十维框架、科学方法原则和快照数据模型。不要修改 Talk 仓库除非明确要求。
```

### 在 CivSlice 仓库（双雷达 + UI 改版）

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
2. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-雷达图交互设计.md
3. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-对比雷达与派生指标.md
4. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md

然后在 CivSlice 仓库实现双雷达架构：

## 必做
1. 新建 site/js/stats.js — 按文档实现七项派生指标公式（0–100）
2. 顶部 Tab：[ 剖面 ] [ 对比 ]
   - 剖面：原始十维雷达 + 十维卡片（文字在卡片，雷达纯图形）
   - 对比：七项派生指标雷达（球员卡风格）+ 指标卡片（可展开构成）
3. 派生指标运行时计算，禁止写入 china.json
4. absent 不参与计算；禁止 level×confidence 存储

## 尽量完成
5. 对比模式：2 文明叠图 + 灰色时代均值背景（n≥2）
6. 剖面模式：实线（有据+推断）vs 虚线（含猜测）双轮廓可选
7. 悬停卡片 ↔ 高亮雷达轴联动

## 约束
- 不修改 Talk 仓库
- 公式与文档权重表一致
- 完成后提交推送，确认 Pages 可访问

请先检查 CivSlice 现状，列出文件结构，再按 P1→P2 顺序实现。
```

### 在 CivSlice 仓库（时代维度模板）

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
2. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-时代维度模板.md
3. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md
4. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-对比雷达与派生指标.md

然后在 CivSlice 仓库实现时代维度模板：

## 必做
1. 在 data/ 或 js/ 定义 7 套 eraTemplate（paleolithic → contemporary）
2. 每套含 core（5 项）+ modules（4–5 项）字段定义
3. 实现 inferTemplate(year) 自动推断模板
4. 快照增加 eraTemplate 字段；dimensions 只填当前模板允许的 key
5. 剖面雷达轴随模板动态生成

## 尽量完成
6. 中国快照按时代迁移至少 3 套模板（bronze / iron_imperial / contemporary）
7. 旧十维 → 新模板映射层（兼容现有 china.json）
8. stats.js 分时代权重计算派生指标
9. 跨模板切换时 UI 提示「维度集已变更」

## 约束
- 同时代横向比较必须用相同 eraTemplate
- 不修改 Talk 仓库
- 遵守科学方法与 confidence 规范

请先检查现状，再实现。
```

### 在 CivSlice 仓库（时间轴：先选时段再选朝代）

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
2. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-时间轴交互流程.md
3. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-时代维度模板.md

然后在 CivSlice 仓库实现三级导航：

## 必做
1. ① 时代段 Tab（石器→当代），点击后收窄时间轴 yearMin/yearMax
2. ② 根据所选时段过滤并展示有快照的朝代/国家 Chips
3. ③ 时间轴仅在当前段内滑动；圆点仅显示当前实体本段快照
4. 切换时代段时重置②③；加载对应 eraTemplate 维度集

## 数据
5. 快照可选字段 dynasty、group 用于②级分组
6. meta.eraPeriods 定义各段年份范围

## 约束
- 禁止未选时段即展示全历史轴
- 不修改 Talk 仓库

请先检查现状再实现。
```

### 在 CivSlice 仓库（各国泳道时间轴）

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
2. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-时间轴交互流程.md
   （重点阅读「②½ 各国泳道时间轴」章节）

然后在 CivSlice 仓库实现阶段内各国平行时间轴：

## 必做
1. 选中时代段后，在②级国家 Chips 下方渲染泳道区
2. 每国一行，横轴 = 当前段 yearMin~yearMax，圆点 = 该段内 snapshots
3. 实现 timelinesInPeriod() 过滤逻辑
4. 点击泳道圆点 → 选中该国 + 主时间轴跳转该年 + 刷新雷达
5. 悬停圆点显示 eraLabel + 年份

## 尽量完成
6. 中国单国模式：按 group/dynasty 拆多泳道（timelinesByDynasty）
7. 对比模式高亮多条泳道
8. 可选 presence 存在条（文明级 presence 字段）

## 约束
- 泳道是导航地图，主时间轴+雷达是显微镜
- 仅显示该段内有 markers 或 presence 的国家
- 不修改 Talk 仓库

请先检查现状，列出已有三级导航完成度，再实现泳道层。
```

### 在 CivSlice 仓库（v2 区域导航 — 当前主方案）

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
2. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-13-CivSlice-区域导航与比较选择.md
3. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-对比雷达与派生指标.md
4. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-时代维度模板.md

然后在 CivSlice 实现 v2 五级导航：

## 必做
1. ① 八大区域 Tab：世界、欧洲、亚洲、非洲、大洋洲、北美洲、南美洲、南极洲（自然大洲 + 世界统称，不再分西欧/东欧等亚区）
2. ② 时间段按 meta.regions[].periods 配置（各区域可不同）
3. ③ 国家多选 Checkbox：选中加入泳道，取消删除泳道
4. ④ 泳道 + 主时间轴联动（见时间轴交互流程 ②½ 章节）
5. ⑤ 比较参与面板：泳道国家默认全选参与对比；Toggle 可单独排除
   - swimlaneMembers ≠ comparisonActive（两层状态）
   - 对比雷达只画 comparisonActive；剖面雷达只显示 focusCountryId

## 数据
6. civilizations[].regions[] 标注所属大洲 id（`europe`/`asia`/…/`world` 不参与文明标注，仅作导航 Tab）
7. uiState: regionId, periodId, swimlaneMembers, comparisonActive, focusCountryId, focusYear

## 约束
- 切换区域重置下游全部选择
- 从泳道移除须同步从 comparisonActive 移除
- 新加入泳道默认加入 comparisonActive
- 禁止全球统一时间段列表
- 不修改 Talk 仓库

请先检查现状，再按 P1→P5 实现。
```

### 在 CivSlice 仓库（v3 证据驱动数据 — 当前数据规范）

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-13-CivSlice-证据驱动数据标准.md
2. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
3. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-12-CivSlice-时代维度模板.md

## 任务原则（v3）
- 先写 sources[]，再写 aspects；禁止用 AI 通史记忆填 documented
- 正式快照只用 documented / inferred / absent；推测进假说库
- 不固定十维：有证据才建 aspect key，无证据显式 absent
- level 仅在有 rubric 时填写
- 下架或降级一切无具体 ref 的占位国家数据

## 实现（若涉及代码）
- P0: 时间轴 + 泳道 + 快照卡片（来源 + aspects + absent）；**移除或隐藏雷达与 stats 公式**
- P1: aspects + sourceRefs schema；假说库
- P2: china.json 试点迁移
- P3: 无来源多国数据下架
- P4: 并排文本对照（同 aspect 多国，无雷达叠图）
- P6: CI 阻断无 sourceRefs 的 documented

## 约束
- 不修改 Talk 仓库（除非同步文档）
- **Phase 0 禁止派生指标与雷达图**（见标准 §六）
- 比较束只用于组织检索主题，非必填表

请先检查 CivSlice 数据现状，列出违规条目（无 ref、speculative、硬填维度），再按 v3 标准整改。
```

---

## MiraSpace 仓库 AI 任务规范

> 在 **MiraSpace 仓库**的新对话中执行，不在 Talk 中写模拟代码（除非用户明确要求同步文档）。

### 须参考

- [米拉空间数字生命演化](07-projects/2026-08-14-米拉空间数字生命演化.md) — 世界观
- **[MiraSpace 科学阶段路线图](07-projects/2026-08-14-MiraSpace-科学阶段路线图.md)** — P0 + S1–S5 门槛（**最高阶段规范**）
- [MiraSpace 阶段 0 — 空域、坐标与观察者](07-projects/2026-08-14-MiraSpace-阶段0-空域坐标与观察者.md) — P0 + S1 已完成
- [MiraSpace S2 — 达尔文阈值](07-projects/2026-08-14-MiraSpace-S2-达尔文阈值.md) — S2 已完成
- **[MiraSpace S5 — 多细胞性](07-projects/2026-08-14-MiraSpace-S5-多细胞性.md)** — **当前实现规格**
- [MiraSpace S4→S5 门槛确认书](07-projects/2026-08-14-MiraSpace-S4-S5-门槛确认书.md)
- [MiraSpace S4 验收与 S4→S5 门槛](07-projects/2026-08-14-MiraSpace-S4-验收与S4-S5门槛.md)
- [MiraSpace S4 — 整合细胞单元](07-projects/2026-08-14-MiraSpace-S4-整合细胞单元.md) — 已完成
- [MiraSpace S3 — 个体化与原细胞](07-projects/2026-08-14-MiraSpace-S3-个体化与原细胞.md) — S3 已完成

### 科学阶段（定稿，勿擅自跳关）

| 编号 | 名称 | 说明 |
|------|------|------|
| **P0** | 观察基底 | 工程：canvas、坐标、pan、tick |
| **S1** | 远离平衡态与前生物复杂性 | 场+粒子（**已实现**） |
| **S2** | 达尔文阈值 | 复制子（**已实现**） |
| **S3** | 个体化与原细胞 | vesicle（**已实现**） |
| **S4** | 整合细胞单元 | chemoton（**已实现**，PR #7） |
| **S5** | 多细胞性 | colony（见 S5 规格） |

**当前实现**：S4 已合并 main；**下一步 S5 colony**（Talk 规格已发布）。v1 路线图在 S5 Smoke 通过后闭合。

### 测试与时间（强制执行）

见 **[测试分层与报告规范](07-projects/2026-08-14-MiraSpace-测试分层与报告规范.md)**：

- AI 改代码后 **只跑 Smoke**（`smoke-test.mjs` 或等价），贴 ≤20 行报告摘要
- **禁止**在对话中默认跑 `--acceptance`（600 s × 三 seed）
- Acceptance 由维护者 / CI nightly / `lab.html` 执行；用户粘贴报告后再分析

### 核心原则（强制执行）

1. **涌现优先** — 禁止脚本生成里程碑实体（如「到时间就 spawn 复制子/细胞」）
2. **功能先于名称** — 实现遗传、边界、耦合，不实现「RNA/DNA 类」标签
3. **模仿而非仿真** — 参照地球生命**功能角色**，不必真实分子动力学
4. **环境驱动选择** — 适应度来自模拟交互，不是作者硬编码
5. **观察者默认** — P0 起仅单指平移；不默认上帝模式
6. **阈值外置** — 指标门槛放 `data/presets/*.json`，不散落 magic number
7. **测试省时** — 默认 Smoke；Acceptance 不阻塞 AI 回合（见测试分层规范）

### 仓库结构（预期）

```
MiraSpace/
├── site/
│   ├── index.html
│   ├── styles.css
│   ├── js/
│   │   ├── main.js
│   │   ├── camera.js
│   │   ├── world.js
│   │   ├── fields.js
│   │   ├── particles.js
│   │   ├── replicator.js    # S2
│   │   ├── vesicle.js       # S3
│   │   ├── chemoton.js      # S4
│   │   ├── colony.js        # S5
│   │   └── metrics.js
│   └── data/presets/
│       └── … stage5-default.json
├── scripts/
│   ├── smoke-test.mjs
│   └── s5-headless-test.mjs
├── .github/workflows/pages.yml
└── README.md
```

### MiraSpace 任务优先级（P0 + S1 起步）

| 优先级 | 任务 |
|--------|------|
| P0 | 全屏 canvas、横屏提示、世界坐标系、单指 pan、固定 tick |
| P1 | energy/waste 场、S1 粒子底物、S1 涌现指标 HUD |
| P2 | 指标曲线、URL seed、性能裁剪 |

### 在 MiraSpace 仓库（P0 + S1 MVP）

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
2. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-14-米拉空间数字生命演化.md
3. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-14-MiraSpace-科学阶段路线图.md
4. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-14-MiraSpace-阶段0-空域坐标与观察者.md

然后在 MiraSpace 仓库实现 P0 + S1 起步：

## 必做（P0 观察基底）
1. site/ 静态结构 + GitHub Pages workflow
2. camera.js — 世界↔屏幕变换，单指 pan，Y 轴数学惯例
3. world.js — 4096×2048 wrap 世界，30Hz tick，暂停
4. 横屏主界面 + 竖屏提示 overlay

## 必做（P1 S1 前生物底物）
5. fields.js — energy / waste 扩散场 + 热力图
6. particles.js — monomer / catalyst / dimer，代谢与 wrap（无模板复制）
7. metrics.js — clusterIndex、autocatalyticScore、negentropyFlux
8. data/presets/stage0-default.json

## 约束
- 禁止可遗传复制子、膜个体、假涌现
- 禁止按 RNA/DNA/细胞 分子阶段排期
- Vanilla JS + Canvas 2D，零构建优先
- 不修改 Talk 仓库
- 先 P0 合再 P1

请先检查 MiraSpace 现状，列出文件结构，再按 P0→P1 实现。
```

### 在 MiraSpace 仓库（S2 达尔文阈值 — 当前主任务）

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
2. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-14-MiraSpace-科学阶段路线图.md
3. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-14-MiraSpace-S2-达尔文阈值.md
4. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-14-MiraSpace-阶段0-空域坐标与观察者.md

然后在 MiraSpace 实现 S2（R0→R1→R2）：

## 必做（R0）
1. site/js/replicator.js — strand 成核、模板复制、突变（initialCount=0）
2. stage2-default.json + ?preset= 加载
3. world.js 集成；禁止 dimer 升级

## 必做（R1）
4. metrics.js — heritability、selectiveSweep、informationAccumulation、parasiteFraction
5. HUD + sparkline 门槛线

## 必做（R2）
6. scripts/s2-headless-test.mjs — 含错误阈值对照 preset
7. README 示例运行；s1-headless-test.mjs 仍须 exit 0

## 约束
- 禁止 RNA/DNA 命名、膜/细胞、脚本 spawn 赢家 strand
- 不以 S1 clusterIndex 作为 S2 门控
- 不修改 Talk 仓库

请先检查 MiraSpace 现状，再按 R0→R1→R2 实现。
```

### 在 MiraSpace 仓库（S4 化学子 — 当前主任务）

```
请阅读 Talk 仓库以下文档（按顺序）：
1. https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md
2. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-14-MiraSpace-S3-S4-门槛确认书.md
3. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-14-MiraSpace-S4-整合细胞单元.md
4. https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-14-MiraSpace-测试分层与报告规范.md

然后在 MiraSpace 实现 S4（C0→C1→C2）：

## 必做（C0）
1. site/js/chemoton.js — 代谢/遗传/膜三子耦合、chemotonFitness
2. vesicle.js + replicator.js — 分裂需 fitness；storageMode 涌现
3. stage4-default.json

## 必做（C1）
4. S4 指标 HUD：chemotonCoherence、lineagePersistence、storageFidelity

## 必做（C2）
5. scripts/s4-headless-test.mjs；smoke-test 增加 stage4
6. PR 只附 smoke 报告；禁止对话中跑 acceptance

## 约束
- 禁止 spawn chemoton、禁止 DNA/RNA 命名、禁止 S5 多细胞
- s1–s3 smoke 回归 exit 0

请先检查现状，再按 C0→C1→C2 实现。
```

### 在 MiraSpace 仓库（改代码时的测试纪律）

```
改代码后 ONLY:
  node scripts/smoke-test.mjs
禁止在对话中默认跑 s*-headless-test.mjs --acceptance（600s×三seed）
若用户粘贴 Test Report，根据报告改代码，勿要求用户等 AI 长跑
详见 Talk: docs/07-projects/2026-08-14-MiraSpace-测试分层与报告规范.md
```

---

## 文档变更时的联动

| 变更内容 | 须同步更新 |
|----------|-----------|
| **数据规范 v3** | 证据驱动标准、AI-GUIDE 禁止事项、时代模板定位、CivSlice schema |
| 十维 / aspect 框架调整 | 项目总览、数据规范、CivSlice 数据文件 |
| 科学方法原则 | AI-GUIDE、数据规范、CivSlice 侧栏文案 |
| 新孵化项目 | Talk `site/app.js` 的 projects 列表、07-projects README |
| MiraSpace 阶段规格 | 项目总览、AI-GUIDE 阶段表、MiraSpace preset JSON |
| 维基/讨论新启发 | 08-discussions 归档 + 数据规范补充 |

---

## 禁止事项

- 在 Talk 的 `site/` 中部署 CivSlice / MiraSpace 等产品原型
- 将 `confidence: documented` 用于无文献/考古支撑的猜测
- **用 AI 训练记忆或通史常识批量生成各国快照并标 documented**（v3）
- **在正式快照 `aspects` 中写入 `speculative`**；假说只能进假说库（v3）
- **为凑满雷达轴而硬填 aspect**；无证据必须 `absent`（v3）
- 用现代国家状态反推古代各维 `level`
- 擅自删除 `absent` 强行填内容
- 把维基百科叙述当作定论写入数据（**可作 inferred 备用**，见 v3 §5.5）
- 将派生对比指标写入 JSON
- 用 `level × confidence` 作为存储字段
- **在 MiraSpace 对话中默认跑 acceptance 全量**（见测试分层规范）
- **在 MiraSpace 用脚本伪造涌现、跳过阶段直接实现复制子/膜、或按 RNA→DNA→细胞 分子线性排期**

## 相关文档索引

| 文档 | 路径 |
|------|------|
| **证据驱动标准 v3** | [07-projects/2026-08-13-CivSlice-证据驱动数据标准.md](07-projects/2026-08-13-CivSlice-证据驱动数据标准.md) |
| 项目总览 | [07-projects/2026-08-12-多维文明历史可视化.md](07-projects/2026-08-12-多维文明历史可视化.md) |
| 数据规范（v2 参考） | [07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md](07-projects/2026-08-12-CivSlice-史料方法论与数据规范.md) |
| 雷达 UI 设计 | [07-projects/2026-08-12-CivSlice-雷达图交互设计.md](07-projects/2026-08-12-CivSlice-雷达图交互设计.md) |
| 对比雷达与派生指标 | [07-projects/2026-08-12-CivSlice-对比雷达与派生指标.md](07-projects/2026-08-12-CivSlice-对比雷达与派生指标.md) |
| 时代维度模板 | [07-projects/2026-08-12-CivSlice-时代维度模板.md](07-projects/2026-08-12-CivSlice-时代维度模板.md) |
| 时间轴交互流程 | [07-projects/2026-08-12-CivSlice-时间轴交互流程.md](07-projects/2026-08-12-CivSlice-时间轴交互流程.md) |
| **区域导航 v2** | [07-projects/2026-08-13-CivSlice-区域导航与比较选择.md](07-projects/2026-08-13-CivSlice-区域导航与比较选择.md) |
| 维基启发 | [08-discussions/2026-08-12-维基百科中国历史对CivSlice的启发.md](08-discussions/2026-08-12-维基百科中国历史对CivSlice的启发.md) |
| 贡献指南 | [CONTRIBUTING.md](../CONTRIBUTING.md) |
| CivSlice 实现 | https://github.com/jk9988610/CivSlice |
| **MiraSpace 项目总览** | [07-projects/2026-08-14-米拉空间数字生命演化.md](07-projects/2026-08-14-米拉空间数字生命演化.md) |
| **MiraSpace 科学阶段路线图** | [07-projects/2026-08-14-MiraSpace-科学阶段路线图.md](07-projects/2026-08-14-MiraSpace-科学阶段路线图.md) |
| **MiraSpace 测试分层** | [07-projects/2026-08-14-MiraSpace-测试分层与报告规范.md](07-projects/2026-08-14-MiraSpace-测试分层与报告规范.md) |
| **MiraSpace 初心** | [07-projects/2026-08-14-MiraSpace-项目初心与设计理念.md](07-projects/2026-08-14-MiraSpace-项目初心与设计理念.md) |
| **MiraSpace S5 规格** | [07-projects/2026-08-14-MiraSpace-S5-多细胞性.md](07-projects/2026-08-14-MiraSpace-S5-多细胞性.md) |
| **MiraSpace S4→S5 确认** | [07-projects/2026-08-14-MiraSpace-S4-S5-门槛确认书.md](07-projects/2026-08-14-MiraSpace-S4-S5-门槛确认书.md) |
| **MiraSpace S2 验收** | [07-projects/2026-08-14-MiraSpace-S2-验收与S2-S3门槛.md](07-projects/2026-08-14-MiraSpace-S2-验收与S2-S3门槛.md) |
| **MiraSpace S2 规格** | [07-projects/2026-08-14-MiraSpace-S2-达尔文阈值.md](07-projects/2026-08-14-MiraSpace-S2-达尔文阈值.md) |
| MiraSpace 实现 | https://github.com/jk9988610/MiraSpace |
