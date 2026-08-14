---
title: MiraSpace S5 — 多细胞性
category: projects
tags: [MiraSpace, S5, 多细胞, adhesion, 分工, 涌现]
status: draft
created: 2026-08-14
updated: 2026-08-14
author: 
---

# MiraSpace S5 — 多细胞性

> **科学阶段 S5**：在 S4 chemoton 之上，使分裂后的 vesicle **持久 adhesion**，形成 **colony（ colony / 多细胞体）**；适应度在**群体个体**层面计算；可选细胞间资源交换与行为分工——**项目 v1 最后一阶**。  
> **父文档**：[米拉空间数字生命演化](2026-08-14-米拉空间数字生命演化.md) · [科学阶段路线图](2026-08-14-MiraSpace-科学阶段路线图.md) · [S4 规格](2026-08-14-MiraSpace-S4-整合细胞单元.md) · [S4 验收与 S4→S5 门槛](2026-08-14-MiraSpace-S4-验收与S4-S5门槛.md)

## 本阶段要做什么（一句话）

在 `preset=stage5-default` 下，chemoton 分裂后子 vesicle **保持连接**（非立即分离），多个 chemoton 组成 **colony**；colony 级适应度与指标验证 **持久协作与分工**——禁止脚本 spawn colony 或强制所有 cell 粘合。

## 前置条件（S4→S5 开发门 — Talk 确认）

| 条件 | 状态 |
|------|------|
| S4 合并 `main`（PR #7） | ✅ |
| S4 Smoke exit 0 | ✅ |
| S4 结案 acceptance | 不阻塞 S5 |
| Talk S5 本文档合并 | **本 PR 起可开 S5 实现** |

---

## 科学背景

地球多细胞**多次独立起源**；米拉空间不预设动物/植物路径，只实现**功能三件套**：

| 功能 | 操作化 |
|------|--------|
| **持久 adhesion** | 分裂后子 vesicle 间 `link` 弹簧，断开需 lysis 或 preset 阈值 |
| **分工** | chemoton 携带 `role`（`'default' \| 'feeder' \| 'replicator'`）由 interior 状态涌现 |
| **发育式 pattern** | colony 空间排列非纯随机（链接拓扑 + 局部生长规则） |

---

## 与 S4 的边界

| S4 已有 | S5 新增 | 禁止 |
|---------|---------|------|
| 单 chemoton 分裂 | 分裂后 **colony 链接** | 全局强制 merge 所有 vesicle |
| chemotonFitness | **colonyFitness** 聚合 | 关闭单 cell chemoton |
| S4 指标 | S5 指标 + 保留 S4 HUD | 真核/器官/神经系统 |

**单细胞 chemoton 仍须存在**；S5 成功 = colony 指标达标，非 singleton 归零。

---

## 机制规格

### colony 与 link

```js
// colony.js
{
  id,
  memberVesicleIds[],   // chemoton vesicle id 列表
  age,
  lineageId
}

// vesicle 扩展
{
  colonyId,            // null = 单细胞
  links: [{ targetId, strength }]  // 分裂时自动建链
}
```

| 参数 | preset 字段 | 默认 |
|------|-------------|------|
| 链强度初值 | `colony.linkStrength0` | 0.8 |
| 链衰减 | `colony.linkDecay` | 0.0001/tick |
| 断裂阈 | `colony.linkBreakThreshold` | 0.2 |
| 最大成员 | `colony.maxMembers` | 24 |

**分裂建链**：chemoton 分裂时，两子 vesicle 自动 `link`；共享 `colonyId`（继承或新建）。

### 分工（role 涌现）

每 tick 根据 interior 状态更新 `role`（**非脚本指定**）：

| role | 条件（preset 可调） |
|------|---------------------|
| `feeder` | `metabolicFlux` 最高 quartile |
| `replicator` | `geneticActivity` 最高 quartile |
| `default` | 其余 |

colony 内至少 2 种 role 同时存在 → `divisionOfLabor` 指标 +1 权重。

### colony 适应度

```
colonyFitness = mean(chemotonFitness of members) * linkCoherenceBonus
linkCoherenceBonus = 活跃链接数 / 可能链接数
```

分裂/生长仍受 S4 门控，但 **colony 级** lysis 仅当全部成员 health 崩溃或链接全断。

### 资源交换（简化）

同 colony 内成员：`metabolicFlux` 高者向低者 transfer preset 比例（visual：链上粒子流，可选 P2）。

---

## S5 涌现指标（项目 v1 完成）

| 指标 id | 名称 | 计算概要 | v1 完成阈 |
|---------|------|----------|-----------|
| `multicellularPersistence` | 多细胞体持久 | colony 平均寿命 / 单 cell chemoton 平均寿命 | ≥ **1.5** × 60 sim s |
| `divisionOfLabor` | 分工 | colony 内 ≥2 role 占比 | ≥ **0.30** colony 占比 |
| `developmentalPattern` | 发育 pattern | colony 空间自相关 > 随机 shuffled | score ≥ **0.15** |
| `colonyCount` | colony 数 | 观测 | 只观测 |

---

## 数据预设

### `site/data/presets/stage5-default.json`

```json
{
  "extends": "stage4-default.json",
  "colony": {
    "linkStrength0": 0.8,
    "linkDecay": 0.0001,
    "linkBreakThreshold": 0.2,
    "maxMembers": 24,
    "fluxTransferRate": 0.05
  },
  "metricsThresholdsS5": {
    "multicellularPersistenceRatio": 1.5,
    "divisionOfLaborColonyShare": 0.30,
    "developmentalPatternScore": 0.15,
    "sustainSeconds": { "persistence": 120, "labor": 180, "pattern": 180 }
  }
}
```

URL：`?seed=42&preset=stage5-default`

---

## MiraSpace 实现任务

### T0 — colony 骨架

1. `site/js/colony.js` — colony 注册、link、分裂建链
2. `vesicle.js` — colonyId、links 更新
3. `stage5-default.json`

### T1 — 分工与 S5 指标

4. `role` 涌现逻辑
5. `metrics.js` — S5 HUD + sparkline
6. colony 渲染（链线 between vesicles）

### T2 — 验证

7. `scripts/s5-headless-test.mjs` + smoke stage5
8. README：S5 示例；s1–s4 smoke 仍 exit 0

---

## 非目标（S5 Must Not）

- 组织器官、神经、免疫
- 强制所有 vesicle 入 colony
- spawn 预设 colony
- 结束动画 / 「生命完成」UI（v1 仅指标达标）

---

## AI 约束

1. 必读本文 + [测试分层](2026-08-14-MiraSpace-测试分层与报告规范.md) + [AI-GUIDE](../AI-GUIDE.md)
2. PR **只跑 Smoke**；acceptance 交维护者
3. T0→T1→T2 分 PR 可

---

## 相关

- [S4 验收与 S4→S5 门槛](2026-08-14-MiraSpace-S4-验收与S4-S5门槛.md)
- [项目初心与设计理念](2026-08-14-MiraSpace-项目初心与设计理念.md)
