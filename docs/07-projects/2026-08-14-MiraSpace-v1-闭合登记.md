---
title: MiraSpace v1 闭合登记
category: projects
tags: [MiraSpace, v1, S5, 验收]
status: published
created: 2026-08-14
updated: 2026-08-14
author: Talk
---

# MiraSpace v1 闭合登记

> MiraSpace [PR #8](https://github.com/jk9988610/MiraSpace/pull/8)（S5 colony T0–T2）提交后，**科学阶段 P0→S5 实现线闭合**。Acceptance 长跑仍由维护者后台登记，不阻塞 v1。

---

## v1 交付清单

| 阶段 | preset | 核心机制 |
|------|--------|----------|
| P0+S1+P2 | `stage0-default`（默认） | 画布、原始汤 |
| S2 | `stage2-default` | strand 复制子 |
| S3 | `stage3-default` | vesicle 膜 |
| S4 | `stage4-default` | chemoton 耦合 |
| S5 | `stage5-default` | colony 多细胞 |

**Smoke**：`s1–s5` exit 0（PR #8 报告）。

**预览**（PR #8 合并后）：`?seed=42&preset=stage5-default`

---

## v1 后 Talk 优先级

| 优先级 | 任务 | 仓库 |
|--------|------|------|
| **P0** | [阶段导航 UI](2026-08-14-MiraSpace-阶段导航UI.md) | MiraSpace |
| P1 | S2–S5 acceptance 登记 README | MiraSpace / 维护者 |
| P2 | `lab.html` 可复制测试报告（见测试分层规范） | MiraSpace |

v1 **不**新增 S6 科学阶段；扩展另开 Talk 议题。

---

## 相关

- [阶段导航 UI](2026-08-14-MiraSpace-阶段导航UI.md)
- [科学阶段路线图](2026-08-14-MiraSpace-科学阶段路线图.md)
