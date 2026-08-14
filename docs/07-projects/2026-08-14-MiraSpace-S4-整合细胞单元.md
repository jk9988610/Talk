---
title: MiraSpace S4 — 整合细胞单元（化学子）
category: projects
tags: [MiraSpace, S4, 化学子, chemoton, 耦合, 自维持]
status: draft
created: 2026-08-14
updated: 2026-08-14
author: 
---

# MiraSpace S4 — 整合细胞单元（化学子）

> **科学阶段 S4**：在 S3 vesicle 之上，将 **代谢子 + 遗传子 + 膜子** 耦为共享适应度的 **chemoton（化学子）** 单元——分裂成功须三者协同自维持；**不**实现多细胞（S5）、**不**单独设 DNA 阶段。  
> **父文档**：[米拉空间数字生命演化](2026-08-14-米拉空间数字生命演化.md) · [科学阶段路线图](2026-08-14-MiraSpace-科学阶段路线图.md) · [S3 规格](2026-08-14-MiraSpace-S3-个体化与原细胞.md) · [S3 验收与 S3→S4 门槛](2026-08-14-MiraSpace-S3-验收与S3-S4门槛.md)

## 本阶段要做什么（一句话）

在 `preset=stage4-default` 下，让每个 vesicle 成为 **chemoton**：内部代谢通量、strand 复制与膜完整性 **绑定同一适应度**；只有三者同时高于阈值的 vesicle 易分裂、否则 lysis；可选涌现 **高保真存储子类型**（不命名 DNA）——禁止脚本 spawn chemoton 或关闭 S3 裸 strand 全局机制。

## 前置条件（S3→S4 开发门 — Talk 确认）

| 条件 | 状态 | 说明 |
|------|------|------|
| S3 已合并 `main` | ✅ | vesicle 成核/吞入/分裂 |
| `smoke-test.mjs` 就绪 | ✅ | AI 默认只跑 Smoke |
| `s1`/`s2`/`s3` headless 回归 | ✅ | exit 0 |
| S3 结案门 sustained | 可选 | **不阻塞 S4 编码**；见 [S3 验收 §B](2026-08-14-MiraSpace-S3-验收与S3-S4门槛.md) |
| Talk S4 本文档合并 | **本 PR** | MiraSpace **此后**可开 chemoton 实现 |

---

## 科学背景：Gánti 化学子

| 子系统 | S3 已有 | S4 新增耦合 |
|--------|---------|-------------|
| **膜子** | vesicle 生长/分裂/lysis | 膜健康 `membraneHealth` 进入适应度 |
| **遗传子** | interior strand 复制 | 复制成功率依赖膜内代谢通量 |
| **代谢子** | S1 场 + 粒子 | **vesicle 内部**闭合代谢循环 `metabolicFlux` |

**核心**：三者不再独立优化；**chemoton 适应度** = f(膜, 代谢, 遗传) 决定分裂资格。

### 信息存储升级（可选涌现）

若 `replicator.storageMode` 自 `'linear'` 涌现为 `'redundant'`（双链冗余、复制纠错），须满足 preset 条件（如 `metabolicFlux` 与 `membraneHealth` 同时 > 阈 **持续 180 sim s**）——**UI 仍不称 DNA/RNA**。

---

## 与 S3 的边界

| S3 已有 | S4 新增 | 禁止 |
|---------|---------|------|
| 独立 vesicle + strand | `chemoton.js` 耦合层 / vesicle 扩展字段 | 新建「细胞」实体类替代 vesicle |
| 裸 strand 外液复制 | 外液仍允许；chemoton **仅指 vesicle+interior** | 全局禁止裸 strand |
| S3 指标 | S4 指标 + 保留 S3 HUD | 关闭 S3 分裂逻辑 |

---

## 机制规格

### chemoton 状态（挂在 vesicle 上）

```js
{
  // 原有 vesicle 字段…
  chemoton: {
    metabolicFlux,      // 0–1，内部 S1 反应有效通量
    membraneHealth,     // 0–1，随 maintenance 下降
    geneticActivity,    // 0–1，近期复制成功率的滑动平均
    coherenceTicks,     // 三子同时 > 阈的连续 tick 数
    storageMode         // 'linear' | 'redundant'（涌现）
  }
}
```

### 代谢子（膜内）

- interior 的 monomer / catalyst 参与 **局部** dimer 循环（不扩散到外液直到 lysis）；
- `metabolicFlux` = interior 有效反应率 / preset 归一化常数；
- 外液 S1 仍为底物来源（经 `permeability` 流入）。

### 遗传子（膜内 strand）

- 复制成功率 × `metabolicFlux` × `membraneHealth`；
- `geneticActivity` = 30 sim s 内成功复制次数 / 尝试次数；
- `storageMode: redundant` 时：`mutationRate` 有效减半，维持代价 +20%（preset）。

### 膜子

- `membraneHealth` 每 tick − `maintenanceCost` + `metabolicFlux * repairBonus`；
- health ≤ 0 → **lysis**（与 S3 一致，内容释放）。

### 耦合适应度与分裂

```
chemotonFitness = metabolicFlux * membraneHealth * (0.5 + 0.5 * geneticActivity)
```

分裂条件（替换 S3 纯半径条件之一）：

- `radius >= fissionThreshold` **且** `chemotonFitness >= fissionFitnessMin` **且** `coherenceTicks >= coherenceMinTicks`

分裂时：两子 vesicle 继承 **非完美** 三子状态（噪声 ± preset）。

### 涌现：storageMode 升级

每 tick 若同时满足：

- `metabolicFlux > storageEmergence.fluxMin`
- `membraneHealth > storageEmergence.healthMin`
- interior 平均序列长 > `storageEmergence.lengthMin`

则 `storageMode → redundant`（不可逆）；metrics 记录 `storageFidelity` 观测。

---

## S4 涌现指标（S4 → S5）

| 指标 id | 名称 | 计算概要 | 进入 S5 建议阈 |
|---------|------|----------|----------------|
| `chemotonCoherence` | 化学子相干 | 三子同时 > `subsystemMin` 的 vesicle 占比 | 60 s 均 > **0.25** |
| `lineagePersistence` | 谱系持续 | chemoton 膜谱系平均存活代数 | **≥ 8** 代（滚动） |
| `storageFidelity` | 存储保真 | redundant 模式下有效 mutation 降低比 | **只观测** |
| `chemotonCount` | 化学子数量 | 满足 coherence 的 vesicle 数 | 只观测 |

---

## 数据预设

### `site/data/presets/stage4-default.json`

```json
{
  "extends": "stage3-default.json",
  "chemoton": {
    "subsystemMin": 0.35,
    "fissionFitnessMin": 0.4,
    "coherenceMinTicks": 90,
    "repairBonus": 0.05,
    "storageEmergence": {
      "fluxMin": 0.5,
      "healthMin": 0.6,
      "lengthMin": 12
    }
  },
  "metricsThresholdsS4": {
    "chemotonCoherence": 0.25,
    "lineagePersistenceGenerations": 8,
    "sustainSeconds": { "chemotonCoherence": 120, "lineagePersistence": 300 }
  }
}
```

URL：`?seed=42&preset=stage4-default`

---

## MiraSpace 实现任务

### C0 — 耦合骨架

1. `site/js/chemoton.js` — 三子更新、`chemotonFitness`、分裂门控扩展
2. `vesicle.js` — 集成分裂条件、lysis 与 coherence 计数
3. `replicator.js` — 膜内复制乘子、`storageMode` 涌现
4. `stage4-default.json`

**C0 完成**：Pages 上 chemoton 指标可见；分裂需 fitness。

### C1 — S4 指标与 HUD

5. `metrics.js` — S4 指标 + sparkline
6. interior 代谢通量可视化（可选膜内 tint）

**C1 完成**：HUD 四项 S4 指标。

### C2 — 验证

7. `scripts/s4-headless-test.mjs` — Smoke 段 + acceptance 段（见测试规范）
8. README：S4 示例 + 与 S3 对照
9. `smoke-test.mjs` 增加 stage4 粗检；`s1`–`s3` 回归 exit 0

---

## 非目标（S4 Must Not）

- 多细胞 adhesion / 发育（**S5**）
- DNA/RNA/原核/真核 命名 UI
- 脚本 spawn chemoton
- 全局关闭裸 strand 或外液 vesicle 成核（可调低率，不置 0 除非 preset 实验）
- 真核 / 内共生 / 线粒体

---

## 测试清单

| 项 | 验证 |
|----|------|
| 分裂需 fitness | 低 fitness vesicle 不因半径 alone 分裂 |
| coherence 计数 | headless 可观测 `coherenceTicks` 增加 |
| storage 涌现 | 长跑 optional 观测 `storageMode` |
| Smoke | `smoke-test.mjs` stage4 exit 0 |
| 回归 | s1–s3 smoke/headless 仍 pass |

```bash
node scripts/smoke-test.mjs --preset=stage4-default
node scripts/s4-headless-test.mjs        # 开发门：短档
node scripts/s4-headless-test.mjs --acceptance   # 维护者长跑
```

---

## AI 实现约束

1. 必读：本文档 + [S3 验收](2026-08-14-MiraSpace-S3-验收与S3-S4门槛.md) + [测试分层](2026-08-14-MiraSpace-测试分层与报告规范.md) + [AI-GUIDE](../AI-GUIDE.md)
2. **只跑 Smoke** 提交 PR；acceptance 交维护者
3. 先 C0 → C1 → C2
4. 不修改 Talk 除非用户要求

---

## 相关

- [科学阶段路线图 §S4](2026-08-14-MiraSpace-科学阶段路线图.md#s4--整合细胞单元化学子)
- [项目初心与设计理念](2026-08-14-MiraSpace-项目初心与设计理念.md)
- 实现仓库：[MiraSpace](https://github.com/jk9988610/MiraSpace)
