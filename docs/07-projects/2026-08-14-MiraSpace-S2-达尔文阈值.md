---
title: MiraSpace S2 — 达尔文阈值
category: projects
tags: [MiraSpace, S2, 达尔文阈值, 复制子, 涌现, 准物种]
status: draft
created: 2026-08-14
updated: 2026-08-14
author: 
---

# MiraSpace S2 — 达尔文阈值

> **科学阶段 S2**：在 S1 前生物底物之上，开放**通用复制子**机制，使系统满足 NASA 工作定义中的「可进行达尔文演化」——**不**命名 RNA/DNA，**不**实现膜或细胞。  
> **父文档**：[米拉空间数字生命演化](2026-08-14-米拉空间数字生命演化.md) · [科学阶段路线图](2026-08-14-MiraSpace-科学阶段路线图.md) · [阶段 0 规格](2026-08-14-MiraSpace-阶段0-空域坐标与观察者.md)

## 本阶段要做什么（一句话）

在现有 S1 场 + 粒子世界上，新增**线型信息串复制子**（及可选代谢规则表路径），以种群级统计验证**可遗传变异 + 选择**是否涌现，并用三项 S2 指标判定可否进入 **S3 个体化**——禁止脚本 spawn 复制子或把 S1 的 `dimer` 自动升级。

## 前置条件

| 条件 | 状态 | 说明 |
|------|------|------|
| P0 + S1 + P2 | MiraSpace 已完成 | 见 [MiraSpace README](https://github.com/jk9988610/MiraSpace#s1-测试清单) |
| S1 headless 通过 | 已完成 | `node scripts/s1-headless-test.mjs` exit 0 |
| S1 `clusterIndex` 作 S2 门槛 | **废止** | dimer 极稀疏时该比值虚高（MiraSpace seed=42 已验证）；**不以 S1 指标作为 S2 启动门** |
| S2 进入 S3 门槛 | [S2 验收与 S2→S3 门槛](2026-08-14-MiraSpace-S2-验收与S2-S3门槛.md) | **开发门**已满足；**结案门**见该文档 §B |

---

## 科学背景

### 达尔文阈值

操作上的「生命」分界常落在能否进行**达尔文演化**：

| 要素 | 米拉空间操作化 |
|------|----------------|
| **遗传** | 子代信息串 / 规则表与亲代相关 |
| **变异** | 复制非完美（点突变、小 indel） |
| **选择** | 适应度差异导致种群频次变化 |

### Eigen 准物种与错误阈值

突变率 \(\mu\) 过高时，信息无法在多代中积累（**错误阈值**）。S2 **必须**能在高 \(\mu\) preset 下观察到「信息长度无法增长」——禁止用无限纠错绕过。

### 寄生序列

短、复制快、不贡献功能的序列可在种群中扩增（**寄生**）。S2 应能观测 `parasiteFraction` 上升，而非被脚本清除。

### 地球参照（仅注解）

RNA 世界、Szostak 系复制子实验。**实现中禁止出现碱基字母 UI 或 RNA/DNA 类名。**

---

## 与 S1 的边界

| S1 已有 | S2 新增 | 禁止 |
|---------|---------|------|
| monomer / catalyst / dimer | **strand**（信息串实体） | dimer → strand 自动升级 |
| 无模板复制 | 模板匹配复制 + 突变 | 单例「主角复制子」 |
| S1 三项指标 | S2 三项指标 + 可选保留 S1 HUD | 用 S1 `clusterIndex` 解锁 S2 |

**strand** 与 **dimer** 共存：dimer 仍为 S1 化学底物；strand 是独立实体类型，由 S1 环境（能量、单体）提供复制材料。

---

## 复制子机制（复制子优先路径 — 默认实现）

### 实体：strand

```js
{
  id,
  sequence,      // 整数数组或 bit 串，长度 L
  x, y, vx, vy,
  energy,        // 复制/维持消耗
  age,
  lineageId      // 谱系追踪（UUID 或递增根 id）
}
```

| 参数 | preset 字段 | 默认 | 说明 |
|------|-------------|------|------|
| 最大长度 | `replicator.maxLength` | 48 | 碱基等价符号数 |
| 突变率 | `replicator.mutationRate` | 0.002 / 复制 | 每符号独立 |
| 复制速率 | `replicator.replicationRate` | 环境函数 | 依赖 energy 场 + 局部 monomer |
| 维持代价 | `replicator.maintenanceCost` | tick 消耗 | 防无限囤积 |
| 初始种群 | `replicator.initialCount` | 0 | **自发成核**见 §成核 |

### 复制流程（每 tick 概要）

1. strand 从 `energy` 场与邻近 monomer 获取复制资源；
2. 以概率 `replicationRate` 尝试模板复制；
3. 复制产物序列逐位以 `mutationRate` 突变；
4. 子 strand 在母 strand 邻近 spawn，继承 `lineageId` 分支；
5. 失败 / 能量不足则复制 abort。

### 成核（禁止脚本填充）

初始 `initialCount: 0`。strand 仅通过 **S1 底物上的随机成核事件** 产生：

- 低概率：`catalyst` + 足够长 dimer 链 + 能量阈 → 随机序列 strand（长度 \(L_0\) 小，如 4–8）；
- 成核率 `replicator.nucleationRate` 可配，须足够低使成核可观测、非一 tick 满屏。

### 适应度（S2 简化）

不用作者打分表。适应度 **仅** 来自与环境的交互：

```
fitness = replicationSuccessRate × survivalTicks × (1 - maintenancePenalty)
```

可选：序列中若含特定 **motif**（preset 定义，如 `[1,0,1]`）略增复制成功率——**motif 不硬编码在代码**，只写在 preset，便于对照实验。

---

## 可选路径：代谢规则表（代谢优先 — P2 实现）

若复制子路径难以成核，可在后续 PR 开放 **catalyst 规则表变异**：

- 每个 catalyst 携带 small rule vector；
- 分裂/降解时规则表突变；
- 适应度 = 催化产出 dimer 的速率。

S2 **完成定义** 两条路径**至少一条**在 headless 中达到 §涌现门槛。Talk 以复制子路径为主规格；代谢路径可在 MiraSpace README 标注为 experimental。

---

## 涌现指标（S2 → S3）

> **门槛判定**：见 **[S2 验收与 S2→S3 门槛](2026-08-14-MiraSpace-S2-验收与S2-S3门槛.md)** — 开 S3 编码**不要求**三项 sustained；S2 科学结案须按该文档 §B 验收基准（阈值已下调）。

每 10 tick 采样；HUD 显示当前值 + 60 s 滑动平均 + sparkline（复用 P2 `sparkline.js`）。

| 指标 id | 名称 | 计算概要 | 设计阈（preset） | 验收基准阈 |
|---------|------|----------|------------------|------------|
| `heritability` | 可遗传度 | 亲–子 Hamming 相关均值 | 60 s 均 > 0.55 | **≥ 0.55** |
| `selectiveSweep` | 选择 sweep | Top-1 谱系占比 | > 0.35 × 120 s | **≥ 0.12 × 120 s** |
| `informationAccumulation` | 信息积累 | \(\bar L/L_0\) | > 1.5 × 180 s | **≥ 1.05 × 120 s** |
| `parasiteFraction` | 寄生占比 | 短序列复制子占比 | 只观测 | 只观测 |

### 错误阈值对照实验（必做）

preset 套件 `stage2-error-threshold.json`：`mutationRate` 从 0.001 → 0.05。

| 预期 | 判定 |
|------|------|
| 低 \(\mu\) | `informationAccumulation` 可上升 |
| 高 \(\mu\) | `informationAccumulation` 不上升或 \(\bar L\) 崩溃 |

headless 脚本须输出两组对比，写入 README。

---

## 数据预设

### `site/data/presets/stage2-default.json`（新增）

```json
{
  "extends": "stage0-default.json",
  "replicator": {
    "maxLength": 48,
    "mutationRate": 0.002,
    "nucleationRate": 0.00005,
    "initialCount": 0,
    "maintenanceCost": 0.01,
    "L0Min": 4,
    "L0Max": 8,
    "motifs": [{ "pattern": [1, 0, 1], "replicationBonus": 0.15 }]
  },
  "metricsThresholdsS2": {
    "heritability": 0.55,
    "selectiveSweepTopShare": 0.35,
    "informationAccumulationRatio": 1.5,
    "sustainSeconds": { "heritability": 60, "selectiveSweep": 120, "informationAccumulation": 180 }
  }
}
```

URL：`?seed=42&preset=stage2-default`（`main.js` 解析 preset 名，默认 stage0）。

---

## MiraSpace 实现任务

### R0 — 模块骨架

1. `site/js/replicator.js` — strand 实体、成核、复制、突变
2. `world.js` — tick 中在 particles 之后调用 replicator
3. `metrics.js` — 扩展 S2 指标；S1 指标保留
4. `stage2-default.json` + preset 加载器

**R0 完成**：strand 可成核、可复制；HUD 无 S2 指标也可先合。

### R1 — 指标与 HUD

5. S2 三项指标 + `parasiteFraction` 观测
6. sparkline 门槛线（复用 P2）
7. 谱系计数（轻量：按 `lineageId` 聚合）

**R1 完成**：Pages 上可观察 S2 指标变化。

### R2 — 验证

8. `scripts/s2-headless-test.mjs` — 成核发生、heritability > 0、错误阈值对照、600 sim s 无泄漏
9. README：S2 示例运行 + 错误阈值对照表

---

## 非目标（S2 Must Not）

- 膜 / compartment / 分裂边界（S3）
- DNA 双链、转录翻译、核糖体命名或 UI
- 把 S2 达标写死为「解锁动画」或切换场景
- 硬编码「胜利复制子」序列
- 销毁 S1 底物（monomer / catalyst / dimer 仍运行）

---

## 测试清单

| 项 | 验证方式 |
|----|----------|
| 成核非脚本 | `initialCount=0` 长跑仍能出现 strand |
| 遗传 + 变异 | headless：亲–子 `heritability` > 0 |
| 选择 | 不同 seed 下 Top 谱系占比分化 |
| 错误阈值 | 高/低 \(\mu\) preset 对照符合 §预期 |
| 寄生 | 高 \(\mu\) 或高成核率下 `parasiteFraction` 可上升 |
| 性能 | 600 sim s strand 数 ≤ `replicator.maxPopulation`（preset，默认 800） |
| S1 回归 | `s1-headless-test.mjs` 仍 exit 0（stage0 preset） |

```bash
node scripts/s2-headless-test.mjs
node scripts/s1-headless-test.mjs
```

---

## AI 实现约束（MiraSpace）

1. 必读 Talk：本文档 + [科学阶段路线图](2026-08-14-MiraSpace-科学阶段路线图.md) + [AI-GUIDE](../AI-GUIDE.md)
2. **禁止** dimer 升级、禁止 spawn 预设赢家 strand
3. 阈值与 `mutationRate` 仅来自 preset JSON
4. 先 R0 → R1 → R2；每步可独立 PR
5. 不修改 Talk 除非用户要求

---

## 相关

- [科学阶段路线图 §S2](2026-08-14-MiraSpace-科学阶段路线图.md#s2--达尔文阈值可遗传变异的复制)
- [阶段 0 规格](2026-08-14-MiraSpace-阶段0-空域坐标与观察者.md)
- 实现仓库：[MiraSpace](https://github.com/jk9988610/MiraSpace)
