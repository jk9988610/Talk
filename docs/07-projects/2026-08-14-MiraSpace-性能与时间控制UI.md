---
title: MiraSpace 性能与时间控制 UI
category: projects
tags: [MiraSpace, UI, 性能, 时间倍率, v1后]
status: draft
created: 2026-08-14
updated: 2026-08-14
author: 
---

# MiraSpace 性能与时间控制 UI

> **定位**：v1 后 **体验层** 改进——解决网页「跑得慢、等演化太久」的观感问题；提供 **时间倍率** 与 **渲染性能** 开关，并把常用操作集中到 **右下角浮动控制区**。  
> **不改变**模拟规则与涌现机制；**不**影响 headless / Smoke / Acceptance 的物理 tick 语义。  
> **父文档**：[阶段导航 UI](2026-08-14-MiraSpace-阶段导航UI.md) · [v1 闭合登记](2026-08-14-MiraSpace-v1-闭合登记.md) · [项目初心与设计理念](2026-08-14-MiraSpace-项目初心与设计理念.md)

## 本任务要做什么（一句话）

在浏览器端实现 **逻辑 tick 与渲染帧解耦**、**可调时间倍率**（×1 / ×5 / ×20）、**可选轻量动画**；将暂停、速度、视图开关、重置等 **功能按钮独立到右下角**，与顶栏阶段导航分工。

---

## 为何需要

| 现状 | 问题 |
|------|------|
| 逻辑 tick 与每帧 1:1 绑定 | S3+ 实体增多后帧率下降，演化「看起来」极慢 |
| 控制分散在 HUD 或隐式 | 暂停、网格、场可视化等不易发现 |
| 无时间加速 | 观察者需长时间等待复制子/膜泡/群体涌现 |

这是 **观察者体验** 优化（见 [初心 §体验](2026-08-14-MiraSpace-项目初心与设计理念.md)），不是改 preset 阈值或 spawn 逻辑。

---

## UI 规格

### 整体布局（与阶段导航配合）

```
┌─────────────────────────────────────────────────────────┐
│ [阶段导航]  原始汤 | 复制子 | 原细胞 | 化学子 | 多细胞  │  ← 顶栏（见阶段导航 UI）
├─────────────────────────────────────────────────────────┤
│  HUD 指标（左上/现有位置，只读）                          │
│                    Canvas 全屏                           │
│                                                          │
│                              ┌─────────────────────────┐ │
│                              │  ⏸/▶   1×  5×  20×     │ │  ← 右下角浮动控制区
│                              │  网格  场   重置         │ │
│                              └─────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

| 区域 | 职责 |
|------|------|
| **顶栏** | 阶段 Tab、preset 切换（[阶段导航 UI](2026-08-14-MiraSpace-阶段导航UI.md)） |
| **HUD** | 指标与 sparkline（只读，不放置高频操作按钮） |
| **右下角控制区** | 运行控制、时间倍率、视图开关、重置 |

- **横屏优先**；控制区 `position: fixed; right: 12px; bottom: 12px`（或 safe-area 内边距）。
- 竖屏时控制区 **不遮挡** canvas 中心；可略缩小按钮或两行排列。
- 控制区背景：半透明圆角面板，`pointer-events: auto`；canvas 其余区域仍接收平移手势。

### 右下角控件（定稿）

| 控件 | id 建议 | 行为 |
|------|---------|------|
| **暂停 / 继续** | `btn-pause` | 切换 `sim.running`；图标 ⏸ / ▶ |
| **时间倍率** | `speed-1x` `speed-5x` `speed-20x` | 分段单选；见下文「时间倍率」 |
| **网格** | `toggle-grid` | 显示/隐藏世界网格（已有则迁移至此） |
| **场** | `toggle-field` | 显示/隐藏场可视化（如浓度 heatmap） |
| **重置** | `btn-reset` | 当前 preset + seed **重新 init 世界**（等同刷新该 run） |

**不放入**右下角（仍留 HUD 或顶栏）：

- 阶段 Tab（顶栏）
- 指标数值、sparkline（HUD）
- seed 显示（HUD 只读即可）

**可选 P1**：「轻量动画」总开关（见渲染档位）并入同一面板第二行。

### 时间倍率

| 档位 | `timeScale` | 含义 |
|------|-------------|------|
| 正常 | `1` | 每逻辑 tick 对应 1 单位 sim 时间（默认） |
| 快 | `5` | 每渲染帧内最多推进 **5** 个逻辑 tick |
| 极快 | `20` | 每渲染帧内最多推进 **20** 个逻辑 tick |

**规则**：

1. **只加速 sim 时钟**，不改变单 tick 内物理/化学规则（不跳步改公式）。
2. 倍率仅影响 **浏览器交互模式**；`headless-test.mjs` / Smoke **固定 `timeScale = 1`**（或通过 `--no-ui` 忽略 URL 中的倍率参数）。
3. URL 可选同步：`?timeScale=5`（默认省略即 1）；切换档位 `replaceState`，刷新保持。
4. 暂停时倍率选择 **保留**，继续后生效。
5. HUD 显示的 **sim 时间**（若有）须按 **实际推进的 tick 数** 累加，而非按 wall clock。

**实现要点**（MiraSpace）：

```javascript
// 伪代码 — 每 animation frame
const budget = sim.paused ? 0 : sim.timeScale;
for (let i = 0; i < budget && sim.running; i++) {
  world.tick(); // 固定 dt 的一步
}
render(); // 每帧最多 render 一次
```

高倍率下若单帧仍超时，可 **动态减 budget**（保持 UI 可响应），但不得跳过 tick 内的子步骤。

### 渲染与动画（性能）

目标：在 **timeScale > 1** 时仍保持可交互帧率（目标 ≥ 24 fps 观感，低端机可降级）。

| 策略 | 说明 |
|------|------|
| **tick / render 解耦** | 见上；渲染频率 ≤ 显示器 refresh，逻辑可 1 帧多 tick |
| **轻量动画档** | 默认 **开**；关闭时：粒子/膜 **无插值**、sparkline 降采样（如每 3 tick 一点）、场 heatmap 降分辨率或每 N tick 更新一次 |
| **实体数 cap 可视化** | 超过 preset 内 `renderParticleCap`（可选）时 **抽样绘制**，sim 仍全量计算（或文档注明仅视觉抽样） |
| **requestAnimationFrame 单循环** | 禁止 tick 与 render 各起一套 rAF |

**「快速动画」定义**（本规格语境）：

- **不是**加快 easing 时长，而是 **减少每帧绘制成本** + **允许时间倍率**，使演化 **在 wall clock 上更快可见**。
- 可选：高倍率下关闭 trail / glow 等纯装饰层（P1）。

### 交互细节

| 行为 | 说明 |
|------|------|
| 切换倍率 | 立即生效；当前 tick 可截断，不 rewind |
| 重置 | 确认 **不需要**（与阶段切换一致）；重置后默认 **运行**、倍率 **继承** |
| 阶段 Tab 切换 | 见 [阶段导航 UI](2026-08-14-MiraSpace-阶段导航UI.md)；切换后倍率 **继承**（推荐）或重置为 ×1（二选一，**推荐继承**） |
| 键盘（P2） | 空格暂停、`1/2/3` 切倍率 — 不强制 |

### 视觉

- 控制区：半透明深色底、`border-radius: 12px`、按钮最小触控 **44×44 px**（移动端）。
- 当前倍率 Tab：**高亮**；暂停时倍率按钮仍可选。
- 与阶段导航 **同一 design token**（字体、accent 色）。

---

## 技术要点（MiraSpace）

### 模块

```
site/js/
  sim-clock.js      # 新建：timeScale、pause、每帧 tick budget、headless 忽略
  control-panel.js  # 新建：右下角 DOM、事件、URL sync
  main.js           # rAF 循环：sim-clock.step() → render
  stage-nav.js      # 已有：顶栏，不与 control-panel 耦合实现细节
```

### 状态

```javascript
sim = {
  running: true,
  paused: false,
  timeScale: 1,        // 1 | 5 | 20
  simTime: 0,          // 累计逻辑 tick
  lightAnimation: true // 可选
};
```

### headless / 测试

| 模式 | timeScale | 控制 UI |
|------|-----------|---------|
| 浏览器默认 | 1（或 URL） | 显示 |
| `smoke-test.mjs` | **1** | 不挂载 / 忽略 |
| `--acceptance` | **1** | 不挂载 |

Smoke 断言 **不得**依赖 wall-clock 时长随倍率变化。

### 非目标

- 不做「跳到达标 tick」的作弊快进（如直接 `simTime += 600`）
- 不改 preset 内阈值与突变/成核公式
- 不把观察者改成「育种员」工具栏（无个体选中、无 spawn）
- 不用 Web Worker 作为本任务硬性要求（P2 可评估）

---

## 验收

| 项 | 要求 |
|----|------|
| 倍率 | ×1 / ×5 / ×20 可切换；HUD sim 时间与 tick 一致加速 |
| 暂停 | 暂停后 world 冻结；继续后恢复 |
| 右下角 | 五类控件齐全且不挡顶栏阶段导航 |
| 性能 | ×20 时 S5 preset 仍可操作平移（无明显卡死 >3s） |
| URL | `timeScale` 可选深链接；headless 忽略 |
| 回归 | 直接 `?preset=stage4-default` 无 UI 时行为与现网一致 |
| Smoke | `node scripts/smoke-test.mjs` **exit 0**（各 stage preset） |

```bash
node scripts/smoke-test.mjs
node scripts/smoke-test.mjs --preset=stage5-default
```

---

## 实现任务（T0→T2）

| 步 | 内容 |
|----|------|
| **T0** | `sim-clock.js`：tick/render 解耦 + timeScale 1/5/20 + pause |
| **T1** | `control-panel.js`：右下角 UI + URL sync + 网格/场/重置迁移 |
| **T2** | 轻量动画档；styles 安全区；README 截图；与阶段导航同 PR 或紧随 |

**推荐顺序**：先合并 [阶段导航 UI](2026-08-14-MiraSpace-阶段导航UI.md) N0，再本规格 T0→T1；或 **同一 PR** 一并交付（顶栏 + 右下）。

**AI 约束**：PR 只跑 Smoke；不改各 stage 模拟逻辑 unless bugfix。

---

## AI 启动模板（复制给 MiraSpace 仓库）

```
请阅读 Talk：
1. docs/07-projects/2026-08-14-MiraSpace-性能与时间控制UI.md
2. docs/07-projects/2026-08-14-MiraSpace-阶段导航UI.md
3. docs/07-projects/2026-08-14-MiraSpace-测试分层与报告规范.md

在 MiraSpace 实现（T0→T1，可与阶段导航同 PR）：
- sim-clock.js：每帧 timeScale 次 world.tick()，再 render 一次；headless 固定 timeScale=1
- control-panel.js：右下角 ⏸/▶、1×/5×/20×、网格、场、重置；URL ?timeScale=
- 从 HUD 迁出操作按钮，指标只读留原位
- smoke-test.mjs 仍 exit 0（s1–s5）
```

---

## 相关

- [阶段导航 UI](2026-08-14-MiraSpace-阶段导航UI.md)
- [v1 闭合登记](2026-08-14-MiraSpace-v1-闭合登记.md)
- [测试分层与报告规范](2026-08-14-MiraSpace-测试分层与报告规范.md)
- [AI-GUIDE](../AI-GUIDE.md)
