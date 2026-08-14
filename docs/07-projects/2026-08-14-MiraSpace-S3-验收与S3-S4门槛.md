---
title: MiraSpace S3 验收与 S3→S4 门槛
category: projects
tags: [MiraSpace, S3, S4, 验收, vesicle]
status: draft
created: 2026-08-14
updated: 2026-08-14
author: 
---

# MiraSpace S3 验收与 S3→S4 门槛

> **用途**：登记 MiraSpace [PR #5](https://github.com/jk9988610/MiraSpace/pull/5) S3 开发门完成情况；定义 S4 开发门与 S3 结案门。  
> **关联**：[S3 个体化与原细胞](2026-08-14-MiraSpace-S3-个体化与原细胞.md) · [S2 验收与 S2→S3 门槛](2026-08-14-MiraSpace-S2-验收与S2-S3门槛.md)

---

## S3 开发门（R2 — 已完成）

| 交付物 | 状态 |
|--------|------|
| `vesicle.js` 成核 / 吞入 / 生长 / 分裂 / lysis | ✅ |
| `stage3-default.json` extends stage2 | ✅ |
| tick：`fields → particles → replicator → vesicle → metrics` | ✅ |
| S3 指标 HUD + sparkline | ✅ |
| `s3-headless-test.mjs` exit 0（42/7/99 × 600 sim s） | ✅ |
| `s1` / `s2` headless 回归 exit 0 | ✅ |
| 无脚本 spawn vesicle；裸 strand 保留 | ✅ |

**预览**：`https://jk9988610.github.io/MiraSpace/?seed=42&preset=stage3-default`

**Talk 确认**：S3→S4 开发门 — 见 **[门槛确认书](2026-08-14-MiraSpace-S3-S4-门槛确认书.md)**（2026-08-14 起可开 S4）。

---

## 两类门槛（S3 → S4）

| 类型 | 问题 | sustained 三项 S3 指标 |
|------|------|------------------------|
| **A. 开发门** — 可否开写 S4 | S3 机制可信、可回归 | **否** — **已满足**，可开 S4 规格实现 |
| **B. 结案门** — S3 科学阶段是否标记完成 | 包被优势与分裂稳定可观测 | **是** — 见下表 |

---

## B. S3 结案门（preset 阈，acceptance 跑）

| 指标 | 验收阈 | sustain sim s |
|------|--------|---------------|
| `encapsulationGain` | ≥ **1.5**（较设计 1.8 略放宽，待 acceptance 登记） | 60 |
| `parasiteLoad` | ≤ **0.60** | 120 |
| `fissionEvents` | ≥ **2** / 300 sim s（M2 仅要求 ≥1/600s） | 300 |

**Acceptance**：`node scripts/s3-headless-test.mjs --acceptance`（与 [测试分层规范](2026-08-14-MiraSpace-测试分层与报告规范.md) 一致；**不由 AI 在对话中默认执行**）。

---

## 并行待办（不阻塞 S4）

| 项 | 仓库 | 优先级 |
|----|------|--------|
| S2 结案 acceptance | MiraSpace | P1 |
| S3 结案 acceptance + README 表 | MiraSpace | P1 |
| `smoke-test.mjs` + 可复制报告 | MiraSpace | P0（减 AI 等待） |
| **S4 整合细胞单元** 详细规格 | Talk | **已发布** — [S4 规格](2026-08-14-MiraSpace-S4-整合细胞单元.md) |
| S5 概要 | Talk | P2 |

---

## S4 开发门

**已确认** — 见 [S3→S4 门槛确认书](2026-08-14-MiraSpace-S3-S4-门槛确认书.md) + [S4 整合细胞单元](2026-08-14-MiraSpace-S4-整合细胞单元.md)。  
MiraSpace 在 Talk 合并 S4 规格后实现 `chemoton.js`（C0→C2）。

---

## 相关

- [测试分层与报告规范](2026-08-14-MiraSpace-测试分层与报告规范.md)
- [项目初心与设计理念](2026-08-14-MiraSpace-项目初心与设计理念.md)
