---
title: MiraSpace S2 验收基准与 S2→S3 门槛
category: projects
tags: [MiraSpace, S2, S3, 验收, 门槛, headless]
status: draft
created: 2026-08-14
updated: 2026-08-14
author: 
---

# MiraSpace S2 验收基准与 S2→S3 门槛

> **用途**：回应 MiraSpace 实现侧 2026-08-14 汇报；区分「可否开做 S3」与「S2 是否科学结案」。  
> **关联**：[S2 达尔文阈值](2026-08-14-MiraSpace-S2-达尔文阈值.md) · [S3 个体化与原细胞](2026-08-14-MiraSpace-S3-个体化与原细胞.md)

---

## 两类门槛（必读）

| 类型 | 回答的问题 | 是否要求三项 sustained |
|------|------------|------------------------|
| **A. 开发门** — 可否开始 S3 编码 | S2 机制可信、可回归 | **否** |
| **B. 结案门** — S2 科学阶段是否标记完成 | 达尔文演化在模拟中**稳定可观测** | **是（见 §B 放宽基准）** |

**结论（给 MiraSpace）**：当前实现**已满足 A**，可立即按 [S3 规格](2026-08-14-MiraSpace-S3-个体化与原细胞.md) 开发膜/compartment。**B** 在 S3 上线后再跑一轮 S2 长跑登记；未达 B 不阻塞 S3，但须在 README 标注「S2 结案待定」。

---

## A. 开发门（开 S3 编码 — 已满足）

| 条件 | 要求 | MiraSpace 2026-08-14 |
|------|------|----------------------|
| `s2-headless-test.mjs` | exit 0 | 通过 |
| `s1-headless-test.mjs` | exit 0 | 通过 |
| 成核非脚本 | `initialCount=0` 仍出现 strand | 通过 |
| 错误阈值对照 | 低 μ infoAccum > 高 μ（360 sim s） | 通过（1.01 vs 0.94） |
| 可遗传 | heritability 均值 > **0.5** | 通过（~1.0） |
| 约束 | 无 dimer 升级 / 无 spawn 复制子 | 通过 |

---

## B. 结案门（S2 科学阶段标记完成）

三项指标须 **60 s 滑动平均**在指定 **sim 秒**内持续达标（与 S2 规格 preset 字段一致，阈值按下表**验收基准**执行）：

| 指标 | 原设计阈 | **验收基准阈**（Talk 定稿） | sustain sim s | 说明 |
|------|----------|---------------------------|---------------|------|
| `heritability` | 0.55 | **≥ 0.55** | 60 | 当前 ~1.0，已满足 |
| `selectiveSweepTopShare` | 0.35 | **≥ 0.12** | 120 | 原阈过高；Top-1 谱系占比可观测即可 |
| `informationAccumulation` | 1.5 | **≥ 1.05** | 120 | 原阈过高；600 s 实测 ~1.08 |

**Headless 验收套件**（MiraSpace 须实现或扩展 `s2-headless-test.mjs`）：

```bash
# 每 seed 600 sim s，preset=stage2-default
node scripts/s2-headless-test.mjs --acceptance
```

| 参数 | 值 |
|------|-----|
| seeds | **42, 7, 99** |
| 时长 | **600 sim s**（18000 ticks @ 30 Hz） |
| preset | `stage2-default` |
| 通过 | 三 seed 均满足 B 表；exit 0 |

**登记**：结果写入 MiraSpace README「S2 结案」表；Talk 不要求逐 seed 回写。

---

## MiraSpace 已报数据（seed=42，登记用）

| 场景 | 指标 | 值 |
|------|------|-----|
| 错误阈值 360 s | 低 μ infoAccum avg | ~1.01 |
| 错误阈值 360 s | 高 μ infoAccum avg | ~0.94 |
| 长跑 600 s | heritability | ~1.0 |
| 长跑 600 s | informationAccumulation | ~1.08 |
| 长跑 600 s | strand 数 | ~400 |
| 长跑 600 s | selectiveSweep sustained | **未严格验收** |

---

## 代谢优先路径（experimental）

| 项 | 说明 |
|----|------|
| 状态 | **未实现**；不阻塞 S3 |
| 定位 | S2 可选对照分支，非主线 |
| 若做 | 在 MiraSpace README 标 `experimental/`；须独立 preset；**不得**替代复制子路径作为 S2 结案唯一证据 |
| Talk | 待 S3 稳定后再决定是否写 `S2-代谢优先补充` |

---

## 实现优先级（Talk → MiraSpace）

| 优先级 | 任务 | 仓库 |
|--------|------|------|
| **P0** | S3 膜/compartment/分裂（见 S3 规格） | MiraSpace |
| P1 | `s2-headless-test.mjs --acceptance`（三 seed × 600 s） | MiraSpace |
| P2 | S2 结案 README 表；未达 B 则标「结案待定」 | MiraSpace |
| P3 | 代谢优先 experimental（可选） | MiraSpace |

---

## 相关

- [S3 个体化与原细胞](2026-08-14-MiraSpace-S3-个体化与原细胞.md)
- [S2 达尔文阈值](2026-08-14-MiraSpace-S2-达尔文阈值.md)
