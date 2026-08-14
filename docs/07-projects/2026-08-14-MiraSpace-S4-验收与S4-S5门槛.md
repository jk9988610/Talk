---
title: MiraSpace S4 验收与 S4→S5 门槛
category: projects
tags: [MiraSpace, S4, S5, 验收, chemoton]
status: published
created: 2026-08-14
updated: 2026-08-14
author: Talk
---

# MiraSpace S4 验收与 S4→S5 门槛

> **用途**：登记 MiraSpace [PR #7](https://github.com/jk9988610/MiraSpace/pull/7) S4 开发门完成情况；定义 S5 开发门与 S4 结案门。  
> **关联**：[S4 整合细胞单元](2026-08-14-MiraSpace-S4-整合细胞单元.md) · [S3→S4 门槛确认书](2026-08-14-MiraSpace-S3-S4-门槛确认书.md)

---

## S4 开发门（C0–C2 — 已完成）

| 交付物 | 状态 |
|--------|------|
| `chemoton.js` 三子耦合 + `chemotonFitness` | ✅ |
| 分裂须 fitness 门控（非半径 alone） | ✅ |
| `stage4-default.json` extends stage3 | ✅ |
| S4 指标 HUD + sparkline | ✅ |
| `s4-headless-test.mjs` 短档 | ✅ |
| `smoke-test.mjs` stage4 exit 0 | ✅ |
| `s1`–`s3` smoke/回归 | ✅ |
| 裸 strand 保留；无 S5 | ✅ |
| Acceptance 全量 | 待维护者 `--acceptance` |

**预览**（PR #7 合并后）：`https://jk9988610.github.io/MiraSpace/?seed=42&preset=stage4-default`

---

## 两类门槛（S4 → S5）

| 类型 | 问题 | 要求 sustained |
|------|------|----------------|
| **A. 开发门** — 可否开写 S5 | S4 机制可信、Smoke 通过 | **否** — **已满足**，Talk 可撰写 S5 规格 |
| **B. 结案门** — S4 科学阶段标记完成 | chemoton 自维持稳定 | **是** — 见下表 |

**策略**（与 S2/S3 一致）：S5 编码**不等待** S4 结案 acceptance。

---

## B. S4 结案门（preset 阈，acceptance 跑）

| 指标 | 验收阈 | sustain sim s |
|------|--------|---------------|
| `chemotonCoherence` | ≥ **0.20**（较设计 0.25 略放宽） | 120 |
| `lineagePersistence` | ≥ **6** 代（较设计 8 略放宽） | 300 |
| `storageFidelity` | 只观测 | — |

```bash
node scripts/s4-headless-test.mjs --acceptance   # 维护者 / CI，非 AI 默认
```

未结案时 MiraSpace README 标「S4 结案待定」。

---

## S5 开发门（预告）

Talk 将撰写 **S5 多细胞性** 规格（adhesion、分工、发育式模式）。  
MiraSpace 在 Talk S5 文档合并 **前** 不实现多细胞模块。

| S5 开写条件 | 状态 |
|-------------|------|
| S4 PR #7 合并 main | 待合并 |
| S4 Smoke exit 0 | ✅ |
| Talk S5 规格 | Talk 下一步 |

---

## 维护者待办

| 优先级 | 任务 | 仓库 |
|--------|------|------|
| P0 | 合并 [MiraSpace PR #7](https://github.com/jk9988610/MiraSpace/pull/7) | MiraSpace |
| P1 | `s4-headless-test.mjs --acceptance` + README 表 | MiraSpace |
| P1 | S2/S3 结案 acceptance（若尚未跑） | MiraSpace |
| P0 | **S5 多细胞性** 详细规格 | Talk |

---

## 相关

- [测试分层与报告规范](2026-08-14-MiraSpace-测试分层与报告规范.md)
- [项目初心与设计理念](2026-08-14-MiraSpace-项目初心与设计理念.md)
