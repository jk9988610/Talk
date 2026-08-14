---
title: MiraSpace S3→S4 门槛确认书
category: projects
tags: [MiraSpace, S3, S4, 门槛, 确认]
status: published
created: 2026-08-14
updated: 2026-08-14
author: Talk
---

# MiraSpace S3→S4 门槛确认书

> **Talk 正式确认**（2026-08-14）：MiraSpace S3 已合并 `main`，Smoke 分层测试已就绪；**准许开始 S4 chemoton 实现**。  
> 规格：[S4 整合细胞单元](2026-08-14-MiraSpace-S4-整合细胞单元.md)

---

## 一、S3→S4 开发门（开 chemoton 编码）

| # | 条件 | 要求 | 状态 |
|---|------|------|------|
| 1 | S3 合并 `main` | vesicle 全功能 | ✅ |
| 2 | 回归测试 | `s1`/`s2`/`s3` headless exit 0 | ✅ |
| 3 | Smoke 分层 | `smoke-test.mjs` 可用 | ✅ |
| 4 | 约束 | 无 spawn vesicle；裸 strand 保留 | ✅ |
| 5 | Talk S4 规格 | 本文档 + S4 规格合并 `main` | **本 PR 起生效** |

**结论**：**开发门已全部满足。** MiraSpace 在 Talk S4 文档合并后按 [S4 规格](2026-08-14-MiraSpace-S4-整合细胞单元.md) 实现 `chemoton.js`（C0→C2）。

**不要求** S3 结案门 sustained 达标后再开 S4（与 S2→S3 策略一致）。

---

## 二、S3 结案门（不阻塞 S4，并行执行）

| 指标 | 验收阈 | sustain |
|------|--------|---------|
| `encapsulationGain` | ≥ 1.5 | 60 sim s |
| `parasiteLoad` | ≤ 0.60 | 120 sim s |
| `fissionEvents` | ≥ 2 / 300 sim s | 300 sim s |

执行：`node scripts/s3-headless-test.mjs --acceptance`（维护者 / CI，非 AI 默认）。

未结案时在 MiraSpace README 标「S3 结案待定」即可。

---

## 三、S4 开发门 vs S5 开发门（预告）

| 类型 | 触发 S5 规格编写 |
|------|------------------|
| S4 **开发门** | `s4-headless` 短档 exit 0 + chemoton 分裂需 fitness |
| S4 **结案门** | `chemotonCoherence`、`lineagePersistence` sustained（见 S4 规格） |

S5 规格在 S4 开发门完成后由 Talk 撰写。

---

## 四、测试分工（重申）

| 层级 | 执行者 |
|------|--------|
| Smoke | MiraSpace AI 每次 PR |
| Acceptance | 维护者 / CI / lab 页 |
| 报告 | 复制 Markdown 给 AI，AI 不自行长跑 |

见 [测试分层与报告规范](2026-08-14-MiraSpace-测试分层与报告规范.md)。

---

## 相关

- [S4 整合细胞单元](2026-08-14-MiraSpace-S4-整合细胞单元.md)
- [S3 验收与 S3→S4 门槛](2026-08-14-MiraSpace-S3-验收与S3-S4门槛.md)
