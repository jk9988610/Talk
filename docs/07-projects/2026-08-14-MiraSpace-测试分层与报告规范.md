---
title: MiraSpace 测试分层与报告规范
category: projects
tags: [MiraSpace, 测试, headless, CI, AI, 报告]
status: draft
created: 2026-08-14
updated: 2026-08-14
author: 
---

# MiraSpace 测试分层与报告规范

> **目的**：缩短 AI 与人类在改代码时的等待；长跑 acceptance 交给后台脚本或 CI，AI 默认只跑 **Smoke**。  
> **关联**：[项目初心与设计理念](2026-08-14-MiraSpace-项目初心与设计理念.md) · [AI-GUIDE](../AI-GUIDE.md)

---

## 问题

当前 `s*-headless-test.mjs` 常要求 **600 sim s × 多 seed**，即使用 headless 也需较长墙钟时间。AI 在对话中反复全量跑会：

- 阻塞回复；
- 鼓励「没跑完不敢交 PR」的不必要等待。

**原则**：**模拟时长 ≠ 墙钟等待**。AI 不应在默认工作流里承担 acceptance 长跑。

---

## 三层测试

| 层级 | 脚本（MiraSpace 目标） | 谁跑 | 模拟时长 | 用途 |
|------|------------------------|------|----------|------|
| **Smoke** | `scripts/smoke-test.mjs` | **AI 每次改代码后** | 10–15 sim s，seed=42 | 不崩、有 tick、阶段核心事件曾发生（粗检） |
| **Regression** | `scripts/regression-test.mjs` | CI 或本地 `--regression` | 固定 tick 快照 | 与 golden 哈希对比，防悄悄退化 |
| **Acceptance** | `s1/s2/s3-headless-test.mjs --acceptance` | **用户 / CI nightly**，非 AI 默认 | 600 sim s × seeds 42/7/99 | 科学结案、S sustained 门槛 |

### Smoke 通过条件（示例）

| preset | 最低要求 |
|--------|----------|
| stage0 | tick 前进；粒子数 > 0 |
| stage2 | ≥1 strand 成核或复制事件 |
| stage3 | ≥1 vesicle 成核或吞入 |

Smoke 须在 **5 s 墙钟内**完成（headless 批量 tick，无渲染）。

### Acceptance 不变

各阶段 headless 现有逻辑保留，但：

- 默认 **不**在 PR 描述中要求 AI 跑全量；
- 加 `--acceptance`  flag 才跑 600 s × 三 seed；
- 无 flag 时仅跑 Smoke 等价段（或 60 sim s 快速档，见 MiraSpace 实现）。

---

## 报告格式

所有 suite 输出 **同一份 Markdown 块**，便于复制：

```markdown
## MiraSpace Test Report
- runAt: 2026-08-14T14:00:00Z
- suite: smoke | acceptance
- preset: stage3-default
- seeds: 42
- simSeconds: 15
- wallMs: 842

### Results
| check | pass |
|-------|------|
| tickAdvances | yes |
| vesicleNucleation | yes |
| s1Regression | skipped |

### Metrics (final)
encapsulationGain: 1.2
...
```

**MiraSpace 实现要求**（后续 PR，不阻塞 S3 文档）：

1. `scripts/run-suite.mjs --smoke|--acceptance --preset=...` 统一入口；
2. 可选 `site/lab.html`：选 preset/seed/档位 → 运行 → **「复制报告」** 按钮；
3. CI：`push main` 跑 Smoke + Regression；`schedule` nightly 跑 Acceptance。

---

## AI 工作流（强制执行）

| 场景 | AI 必须 | AI 禁止 |
|------|---------|---------|
| 改 MiraSpace 代码后 | 跑 `node scripts/smoke-test.mjs`（或等价），贴 **≤20 行** 报告摘要 | 在对话中跑 `--acceptance` 全量，除非用户明确要求 |
| 用户粘贴完整报告 | 根据报告改代码 / 调 preset | 要求用户再等 AI 跑 600 s |
| 写 Talk 文档 | 引用本规范 | 在文档中要求 AI 默认跑三 seed 长跑 |

PR 描述模板：

```
Smoke: exit 0（wallMs: …）
Acceptance: 未在 PR 中运行；请维护者 CI / lab 页执行
```

---

## 相关

- [S3 验收与 S3→S4 门槛](2026-08-14-MiraSpace-S3-验收与S3-S4门槛.md)
- [项目初心与设计理念](2026-08-14-MiraSpace-项目初心与设计理念.md)
