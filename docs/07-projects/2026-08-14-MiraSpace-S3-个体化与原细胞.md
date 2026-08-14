---
title: MiraSpace S3 — 个体化与原细胞
category: projects
tags: [MiraSpace, S3, 原细胞, 膜, compartment, 分裂, 涌现]
status: draft
created: 2026-08-14
updated: 2026-08-14
author: 
---

# MiraSpace S3 — 个体化与原细胞

> **科学阶段 S3**：在 S2 裸复制子种群之上，引入**可生长、可分裂的闭合边界**（vesicle / compartment），使 strand 与 S1 代谢物在**内外差异扩散**下富集，缓解寄生与稀释——**不**实现化学子三系统耦合（属 S4）。  
> **实现状态**：MiraSpace [PR #5](https://github.com/jk9988610/MiraSpace/pull/5) 开发门已完成 — 见 [S3 验收与 S3→S4 门槛](2026-08-14-MiraSpace-S3-验收与S3-S4门槛.md)。  
> **父文档**：[米拉空间数字生命演化](2026-08-14-米拉空间数字生命演化.md) · [科学阶段路线图](2026-08-14-MiraSpace-科学阶段路线图.md) · [S2 规格](2026-08-14-MiraSpace-S2-达尔文阈值.md)

## 本阶段要做什么（一句话）

在 `preset=stage3-default` 下新增 **vesicle**（2D 闭合膜边界 + 内外 compartment），使 strand 可被膜**包裹或吞入**；膜在能量与脂质状底物驱动下**生长与分裂**；用 S3 指标验证**包被优势**与**分裂事件**——禁止脚本 spawn 细胞或把 strand 一键变膜。

## 前置条件

| 条件 | 说明 |
|------|------|
| S2 开发门 | 见 [S2 验收文档 §A](2026-08-14-MiraSpace-S2-验收与S2-S3门槛.md) — **已满足，可开 S3** |
| S2 结案门 | 见同文档 §B — **不阻塞 S3 编码**；S3 R2 后补跑 acceptance |
| S2 机制保留 | stage3 preset **extends** stage2；裸 strand 仍可复制 |

---

## 科学背景

裸复制子（S2）在开放环境中面临：

| 问题 | S3 操作化对策 |
|------|----------------|
| **寄生序列** | 膜内复制子若需膜维持成本，裸寄生链在外液仍可复制但缺少富集 |
| **稀释** | 内外扩散系数差 → 膜内代谢物/strand 浓度可高于外液 |
| **个体化** | 分裂产生两个 compartment，各自继承 strand 子集（非完美分配） |

地球参照：脂质囊泡、Szostak/Hanczyc 原细胞模型。**UI 不出现「脂质」「磷脂」等名词**，只用 vesicle / compartment。

---

## 与 S2 的边界

| S2 已有 | S3 新增 | 禁止 |
|---------|---------|------|
| 裸 strand | **vesicle** + 内外 compartment 注册 | strand 自动变 vesicle |
| 全局扩散 | 膜处扩散系数跳变 | 全有或全无膜（须渐进成核） |
| S2 指标 HUD | S3 指标 HUD | 关闭 S2 裸复制（须共存） |

**共存期**：外液仍有裸 strand；S3 成功标志是 `encapsulationGain` 与 `parasiteLoad`（裸 strand 占比相对下降），而非裸 strand 归零。

---

## 实体与机制

### vesicle

```js
{
  id,
  x, y,              // 质心（世界坐标）
  radius,            // 或 polygon 顶点[]；v1 推荐圆膜
  membraneEnergy,
  age,
  compartmentId,     // 与 interior 注册表关联
  lineageId          // 膜谱系（分裂继承）
}
```

| 参数 | preset 字段 | 默认 | 说明 |
|------|-------------|------|------|
| 成核率 | `vesicle.nucleationRate` | 1e-5 / tick / 区域 | 在 catalyst 富集区 + energy 阈 |
| 初半径 | `vesicle.radius0` | 12 mu | |
| 最大半径 | `vesicle.radiusMax` | 48 mu | 超过触发分裂评估 |
| 生长 | `vesicle.growthRate` | 消耗 monomer + energy | |
| 维持 | `vesicle.maintenanceCost` | tick 消耗 | 膜崩解则内容物释放入外液 |
| 分裂 | `vesicle.fissionThreshold` | radius ≥ 0.9×radiusMax | 见 §分裂 |

### compartment 注册

每个 vesicle 维护 **interior** 列表（strand id + 局部 S1 粒子引用或拷贝计数）：

- strand 进入膜：碰撞检测 `dist(strand, center) < radius - margin` 持续 `captureTicks` → 注册 interior
- interior 内 strand **仍走 S2 复制**，子 strand 默认生于 interior
- 膜外扩散：interior 粒子**不**直接渲染于外（或渲染为膜内点）

### 扩散与场

| 区域 | energy / waste 扩散 |
|------|---------------------|
| 外液 | 现有 fields.js |
| 膜内 | 相同场采样，但跨膜通量 × `vesicle.permeability`（0–1） |

`permeability` 默认 **0.3**（膜略选择通透）。

### 分裂（非脚本）

当 `radius >= fissionThreshold`：

1. 在垂直于最大直径方向一分为二；
2. `radius *= 0.7`（两子 vesicle）；
3. interior strand **随机**分配（~二项），产生**分配噪声**；
4. 膜 `lineageId` 分支；
5. metrics 记录 `fissionEvents++`

分裂失败（能量不足）→ 膜维持失败 → **lysis**（内容释放，vesicle 移除）。

---

## 涌现指标（S3 → S4）

采样每 10 tick；HUD + sparkline（门槛来自 preset）。

| 指标 id | 名称 | 计算概要 | 进入 S4 建议阈 |
|---------|------|----------|----------------|
| `encapsulationGain` | 包被增益 | 膜内 strand 密度 / 外液 strand 密度（同面积窗口） | 60 s 均 > **1.8** |
| `parasiteLoad` | 裸复制子负载 | 外液裸 strand 数 / 总 strand 数 | 60 s 均 < **0.55**（下降） |
| `fissionEvents` | 分裂事件率 | 每 300 sim s 分裂次数 | ≥ **3** / 300 sim s（滚动） |
| `vesicleCount` | 膜数量 | 当前 vesicle 数 | **只观测** |

### S3 开发完成 vs 进入 S4

| 类型 | 要求 |
|------|------|
| **S3 开发门（R2 合 main）** | `s3-headless-test.mjs` exit 0；成核 + 吞入 + ≥1 分裂 |
| **S4 开发门** | 上表三指标 sustained 达标（见 preset `sustainSeconds`） |

---

## 数据预设

### `site/data/presets/stage3-default.json`

```json
{
  "extends": "stage2-default.json",
  "vesicle": {
    "nucleationRate": 0.00001,
    "radius0": 12,
    "radiusMax": 48,
    "growthRate": 0.02,
    "maintenanceCost": 0.008,
    "permeability": 0.3,
    "fissionThresholdRatio": 0.9,
    "captureTicks": 15,
    "maxCount": 120
  },
  "metricsThresholdsS3": {
    "encapsulationGain": 1.8,
    "parasiteLoadMax": 0.55,
    "fissionEventsPer300s": 3,
    "sustainSeconds": { "encapsulationGain": 60, "parasiteLoad": 120, "fissionEvents": 300 }
  }
}
```

URL：`?seed=42&preset=stage3-default`

---

## MiraSpace 实现任务

### M0 — 模块骨架

1. `site/js/vesicle.js` — 成核、生长、膜碰撞、interior 注册
2. `world.js` — tick：fields → particles → replicator → **vesicle**
3. `stage3-default.json` + preset 链
4. 渲染：膜圆环 + interior strand 小点

**M0 完成**：Pages 上可见 vesicle 成核与吞入 strand。

### M1 — 分裂与 S3 指标

5. 分裂 / lysis 逻辑
6. `metrics.js` — S3 四项指标 + HUD sparkline
7. 膜内外扩散/permeability

**M1 完成**：HUD 显示 S3 指标；可观测分裂。

### M2 — 验证

8. `scripts/s3-headless-test.mjs` — 600 sim s、seed 42/7/99、成核/吞入/分裂/无泄漏
9. README：S3 示例 + 与 S2 裸复制子对照表
10. `s1` / `s2` headless **仍须 exit 0**

---

## 非目标（S3 Must Not）

- 化学子三系统耦合、代谢–遗传–膜共享适应度（**S4**）
- DNA/RNA/原核/真核 命名或 UI
- 多细胞 adhesion（**S5**）
- 脚本 spawn vesicle 填充屏幕
- 禁止外液裸 strand（须共存）
- 关闭或削弱 S2 复制子机制

---

## 测试清单

| 项 | 验证 |
|----|------|
| 膜成核非脚本 | nucleationRate > 0，无 batch spawn |
| strand 吞入 | interior 计数 > 0 |
| 分裂 | headless 600 s `fissionEvents >= 1`（M2 后 ≥3/300s 为 S4 门） |
| 包被增益 | `encapsulationGain` 在 seed=42 上 > 1 |
| 回归 | s1 + s2 headless exit 0 |
| 性能 | vesicle ≤ maxCount；600 s 无泄漏 |

```bash
node scripts/s3-headless-test.mjs
node scripts/s2-headless-test.mjs
node scripts/s1-headless-test.mjs
```

---

## AI 实现约束（MiraSpace）

1. 必读：本文档 + [S2 验收与门槛](2026-08-14-MiraSpace-S2-验收与S2-S3门槛.md) + [AI-GUIDE](../AI-GUIDE.md)
2. 先 M0 → M1 → M2；**不**跳 S4
3. 阈值仅 preset；膜渲染勿遮挡 HUD
4. 不修改 Talk 除非用户要求

---

## 相关

- [S2 验收与 S2→S3 门槛](2026-08-14-MiraSpace-S2-验收与S2-S3门槛.md)
- [科学阶段路线图 §S3](2026-08-14-MiraSpace-科学阶段路线图.md#s3--个体化与原细胞)
- 实现仓库：[MiraSpace](https://github.com/jk9988610/MiraSpace)
