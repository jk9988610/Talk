---
title: MiraSpace 阶段导航 UI
category: projects
tags: [MiraSpace, UI, 导航, preset, v1后]
status: draft
created: 2026-08-14
updated: 2026-08-14
author: 
---

# MiraSpace 阶段导航 UI

> **定位**：v1 科学阶段全部实现后的 **体验层** 改进——在同一网页内切换 P0+S1→S5 preset，无需手改 URL。  
> **不改变**模拟规则；**不**新增科学阶段。  
> **父文档**：[v1 闭合登记](2026-08-14-MiraSpace-v1-闭合登记.md) · [项目初心与设计理念](2026-08-14-MiraSpace-项目初心与设计理念.md)

## 本任务要做什么（一句话）

在 `index.html` 增加 **阶段导航条**，让用户在横屏单页内切换 `stage0` → `stage5` preset（保留 `seed`），HUD 随阶段显示对应指标组，URL 与选择同步。

---

## 为何需要

| 现状 | 问题 |
|------|------|
| 每阶段独立 URL `?preset=stageN-default` | 观察者不知有哪些阶段、需记参数 |
| 无统一入口 | 难以向他人演示「从汤到多细胞」的递进 |

导航是 **体验层**（见 [初心 §三层模型](2026-08-14-MiraSpace-项目初心与设计理念.md)），与涌现机制无关。

---

## UI 规格

### 布局

```
┌─────────────────────────────────────────────────────────┐
│ [阶段导航]  原始汤 | 复制子 | 原细胞 | 化学子 | 多细胞  │  ← 固定顶栏或 HUD 上方
├─────────────────────────────────────────────────────────┤
│                    Canvas 全屏                           │
│                    （现有 HUD 不变）                      │
└─────────────────────────────────────────────────────────┘
```

- **横屏优先**；竖屏时导航可折行，不挡 canvas 主区域。
- 使用 **分段控件 / Tab**（5 项），不用下拉（仅 5 档，需一眼可见递进）。

### 阶段映射（定稿）

| UI 标签 | preset id | 科学阶段 | 主要 HUD 指标组 |
|---------|-----------|----------|-----------------|
| 原始汤 | `stage0-default` | P0+S1 | S1 三项 |
| 复制子 | `stage2-default` | S2 | S2 四项 |
| 原细胞 | `stage3-default` | S3 | S3 四项 |
| 化学子 | `stage4-default` | S4 | S4 四项 |
| 多细胞 | `stage5-default` | S5 | S5 四项 |

**跳过「stage1」命名** — 仓库无 `stage1-default.json；S1 合并在 stage0。

### 交互

| 行为 | 说明 |
|------|------|
| 点击 Tab | 加载对应 preset，**重置模拟世界**（新 run），保留当前 `seed` |
| URL 同步 | `history.replaceState` → `?seed=42&preset=stage3-default` |
| 深链接 | 打开带 `preset` 的 URL 时，导航高亮对应 Tab |
| 切换确认 | **不需要**确认框（观察者快速浏览）；可选首次切换 1 行 toast「已切换至：复制子」 |
| 暂停 | 切换后默认 **运行**（或继承切换前暂停状态 — 二选一，推荐 **重置为运行**） |

### 视觉

- 当前 Tab：**高亮** + 底部指示条。
- 非当前：低对比。
- 可选：每 Tab 下 **一行极短说明**（hover 或 subtitle），文案来自下表，**不写 RNA/DNA**：

| Tab | 说明（≤12 字） |
|-----|----------------|
| 原始汤 | 场与粒子，无遗传 |
| 复制子 | 信息串复制与选择 |
| 原细胞 | 膜泡包被与分裂 |
| 化学子 | 代谢·遗传·膜耦合 |
| 多细胞 | 群体连接与分工 |

### 外链（可选 P1）

HUD 角落「?」链到 Talk 对应规格（GitHub blob main），不强制。

---

## 技术要点（MiraSpace）

### 模块

```
site/js/
  stage-nav.js    # 新建：Tab UI、preset 切换、URL 同步
  preset.js       # 已有：扩展 loadPreset(name) 可被 nav 调用
  main.js         # 挂载 nav；切换时 teardown → init world
```

### 切换流程

```
user click Tab
  → parse preset id
  → replaceState URL (?seed=&preset=)
  → world.reset() / 重建 fields/particles/replicator/vesicle/chemoton/colony
  → metrics 切换指标组 visibility
  → camera 保持位置（可选）或回到世界中心（推荐 **回中心** 便于对比）
```

### 指标 HUD

- 各阶段指标 DOM **可并存**，用 `data-stage="s2"` 等控制 **显示/隐藏**，避免重复 id。
- sparkline 切换时 **清空 history** 重新采样。

### 非目标

- 不做时间轴「回放演化史」（不是把 5 阶段串成一条时间线模拟）
- 不做阶段间 **状态继承**（从 S2 切 S3 不是「升级存档」）
- 不做构建链 / 多页面 `s1.html` … `s5.html`

---

## 验收

| 项 | 要求 |
|----|------|
| 5 Tab 可切换 | 每档 preset 正确加载，无 console 错误 |
| URL | 切换后 `preset` 与 Tab 一致；刷新页面状态保持 |
| seed | 切换 Tab 后 seed 不变 |
| Smoke | `smoke-test.mjs` **仍 exit 0**（默认测 stage0；加 `--all-stages` 可选） |
| 回归 | 直接 URL `?preset=stage4-default` 仍可用（无 nav 时兼容） |

```bash
node scripts/smoke-test.mjs
node scripts/smoke-test.mjs --preset=stage5-default   # 若已有
```

---

## 实现任务（N0→N1）

| 步 | 内容 |
|----|------|
| **N0** | `stage-nav.js` + 5 Tab + URL 同步 + preset 切换 |
| **N1** | HUD 指标组显隐；短说明文案；styles 横屏适配 |
| **N2** | README 截图；smoke 文档更新 |

**AI 约束**：PR 只跑 Smoke；不改各 stage 模拟逻辑 unless bugfix。

---

## AI 启动模板（复制给 MiraSpace 仓库）

```
请阅读 Talk：
1. docs/07-projects/2026-08-14-MiraSpace-阶段导航UI.md
2. docs/07-projects/2026-08-14-MiraSpace-v1-闭合登记.md
3. docs/07-projects/2026-08-14-MiraSpace-测试分层与报告规范.md

在 MiraSpace 实现单页阶段导航（N0→N1）：
- stage-nav.js：5 Tab 映射 stage0/2/3/4/5-default，保留 seed，URL sync
- 切换时 reset 世界，HUD 指标组按阶段显隐
- 禁止多 html 页面、禁止阶段间状态继承
- smoke-test.mjs 仍 exit 0
```

---

## 相关

- [v1 闭合登记](2026-08-14-MiraSpace-v1-闭合登记.md)
- [AI-GUIDE](../AI-GUIDE.md)
