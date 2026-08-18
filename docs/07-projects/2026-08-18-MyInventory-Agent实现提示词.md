---
title: MyInventory Agent 实现提示词（个人库存 · 微信小程序）
category: projects
tags: [MyInventory, 微信小程序, Agent, 提示词, 个人库存, Termux]
status: active
created: 2026-08-18
updated: 2026-08-18
author:
---

# MyInventory Agent 实现提示词

> **父文档**：[微信小程序 Termux 平板开发落实规划](2026-08-18-微信小程序-Termux平板开发落实规划.md)  
> **实现仓库**：[MyInventory](https://github.com/jk9988610/MyInventory)

本文档供 **MyInventory** 实现仓中的 Cursor Agent 使用。Talk 仓库只存提示词与规划，不写产品代码。

---

## 一句话指导（复制到 MyInventory 仓库 Agent 对话）

在 **MyInventory** 仓库 Cursor Agent 中**只发这一句**即可；**无需**你手动复制任何文档，由 Agent 完成同步与后续全部实现：

```
本仓库为 MyInventory 实现仓。请先自行从 Talk 获取规范写入 docs/REFERENCE-AGENT-PROMPT.md 与 docs/REFERENCE-PLAN.md，再按缩短版提示词从阶段 0 推进至 MVP 验收，后续全程由你完成。
```

Talk 源文档地址（供 Agent 拉取）：

- https://raw.githubusercontent.com/jk9988610/Talk/main/docs/07-projects/2026-08-18-MyInventory-Agent实现提示词.md
- https://raw.githubusercontent.com/jk9988610/Talk/main/docs/07-projects/2026-08-18-微信小程序-Termux平板开发落实规划.md

---

## 使用说明（用户侧）

| 步骤 | 操作 |
|------|------|
| 1 | 已建 GitHub 仓 **[MyInventory](https://github.com/jk9988610/MyInventory)**，用 Cursor 打开 |
| 2 | 发送上方 **一句话指导** |
| 3 | Agent 负责：拉取 Talk 文档 → 写入本仓 `docs/` → 按缩短版实现 MVP |
| 4 | 你仅在需要时填写 `WECHAT_APPID`、密钥路径、云环境 ID（README 会说明） |

**完整版**（含可选网页管理端）见本文 §完整版提示词；默认走 **§缩短版提示词**（仅小程序）。

---

## 完整版提示词

以下整段供 Agent 同步进 `docs/REFERENCE-AGENT-PROMPT.md` 时保留，或作为完整版任务说明。

```
# 项目任务：个人库存管理（微信小程序 + 网页 + 微信云开发）

## 你的角色

你是本仓库（MyInventory）的实现 Agent。请**先阅读外部参考文档**，再在本仓库落地代码、脚本与文档。本仓库是**产品实现仓**，不是想法文档仓。

## 必读外部参考（Talk 仓库）

在动手写代码前，请通过 GitHub 阅读并遵循以下文档（若可访问本地路径也可直接读）：

1. **主规划文档（必须全文理解）**
   https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-18-微信小程序-Termux平板开发落实规划.md

2. **Talk 仓库 AI 协作原则（了解 Talk 与实现仓分工）**
   https://github.com/jk9988610/Talk/blob/main/docs/AI-GUIDE.md

规划文档中的「小仓库存」垂直，在本项目中**收敛为「个人家用库存管理」**：单用户自用，架构与 Termux 流水线不变。

## 开发者环境与约束（必须遵守）

- 主开发环境：**安卓平板 + Termux**；写码可用 Cursor；**没有**微信开发者工具 GUI 模拟器。
- 预览/上传必须用 **`miniprogram-ci`** 命令行：`preview` 终端二维码 → 手机微信扫码真机测；`upload` 上传体验版。
- 小程序主体：**个人**（MVP 不做微信支付、不做需企业资质的能力）。
- 后端 MVP：**微信云开发**（云数据库 + 云函数），避免自建备案域名。
- 密钥：`private.*.key` 与 AppID **不得提交 Git**；用环境变量 + `.gitignore` + README 说明。
- 技术栈 MVP：**原生微信小程序**（不用 uni-app/Taro，减轻 Termux 构建压力）。
- 可选后续：网页管理端与 Termux APK 壳；MVP 可先小程序为主，网页管理端若工期紧可第二期，但数据模型须预留。

## 产品定义：个人库存管理

### 目标用户与场景

- **唯一用户**：开发者本人（家用物品管理）。
- **典型场景**：食品保质期、日用品余量、工具/电子配件、书籍、杂物；知道「家里还有什么、放在哪、还剩多少」。

### MVP 必须实现（P0）

**微信小程序端**

1. 微信登录（云开发获取 openid，单用户即可）。
2. **物品列表**：名称、分类、数量、单位、存放位置（如厨房/书房/工具箱）、备注。
3. **新增/编辑物品**（手输；有条码则填 barcode 字段）。
4. **扫码**：`wx.scanCode` 扫条形码后，若已有则跳转该物品，否则带条码进入新增页。
5. **入库 / 出库**：调整数量并写入流水（原因可选：购买/消耗/丢弃/赠送）。
6. **首页概览**：物品总数、今日变动笔数、低库存提醒（数量 ≤ 阈值，阈值可 per-item 或全局默认）。
7. **搜索**：按名称/位置/分类过滤。

**云开发**

1. 云数据库集合与安全规则（仅当前用户可读写自己的数据）。
2. 云函数（如需要）：登录登记、批量导出、库存变更校验（出库不能为负）。

**工程与 Termux**

1. monorepo 结构与 `project.config.json`。
2. `scripts/preview.sh`、`scripts/upload.sh`（依赖 `miniprogram-ci`）。
3. `README.md`：Termux 安装、环境变量、首次云开发初始化步骤、真机预览流程。
4. `docs/DATA-MODEL.md`：字段说明。
5. `docs/SMOKE-TEST.md`：无模拟器下的冒烟清单（登录→新增→入库→出库→搜索→低库存）。

### MVP 明确不做（勿过度工程）

- 多用户/家庭共享账号、权限角色
- 微信支付、商城、进货渠道
- 复杂报表、AI Agent、多门店
- 自建服务器后端（MVP 阶段）
- uni-app/Taro 多端编译

### 可选 P1（时间允许再做）

- 简单 **网页管理端**（`admin-web/`）：表格 CRUD、流水查询、导出 CSV（与小程序同一云数据库）。
- 物品 **照片**（云存储）。
- **保质期**字段与临期提醒（首页展示「即将过期」）。
- GitHub Actions 仅做 lint/结构检查（不上传密钥）。

## 建议仓库结构

```
/
├── miniprogram/
│   ├── app.js / app.json / app.wxss
│   ├── pages/
│   │   ├── index/          # 概览
│   │   ├── items/          # 列表与搜索
│   │   ├── item-edit/      # 新增/编辑
│   │   ├── stock-in/       # 入库
│   │   ├── stock-out/      # 出库
│   │   └── scan/           # 扫码入口（可合并到 in/out）
│   ├── components/
│   └── utils/
├── cloudfunctions/
│   ├── login/
│   └── stock/              # 变更库存、校验
├── admin-web/              # P1 可选，可先空目录 + README
├── scripts/
│   ├── preview.sh
│   └── upload.sh
├── docs/
│   ├── DATA-MODEL.md
│   └── SMOKE-TEST.md
├── project.config.json
├── package.json
├── .gitignore
└── README.md
```

## 数据模型（MVP 建议，可微调但须写进 DATA-MODEL.md）

**items**
- `_openid`（所有者）
- `name`, `barcode?`, `category?`, `location?`, `unit?`（个/包/瓶…）
- `quantity`（number）
- `lowStockThreshold?`（number，默认如 1 或 2）
- `expiryDate?`（P1）
- `note?`, `updatedAt`, `createdAt`

**stock_logs**
- `_openid`, `itemId`, `itemName`（冗余便于列表）
- `type`: `in` | `out`
- `delta`（正数）
- `reason?`: `purchase` | `consume` | `discard` | `gift` | `other`
- `note?`, `createdAt`

库存变更：**通过云函数或数据库事务逻辑**保证 `quantity` 与流水一致；出库时 `quantity` 不得小于 0。

## 交互原则

- 主流程 ≤ 3 步（例如：扫码 → 数量 → 确认）。
- 弱网/失败要有明确提示（个人开发者主要靠真机测，错误信息要可读）。
- UI 简洁实用，不追求精美；中文界面。

## 分阶段交付（请按序执行，每阶段可运行）

**阶段 1**：空仓库骨架 + `preview.sh` 能预览空白首页 + README Termux 说明。
**阶段 2**：云开发初始化说明 + `items` CRUD + 列表页。
**阶段 3**：入库/出库 + `stock_logs` + 首页概览与低库存。
**阶段 4**：扫码流程打通。
**阶段 5**：`upload.sh` + SMOKE-TEST 文档 + 体验版上传说明。

每个阶段结束：提交 git，并在 README 更新「当前进度」。

## 验收标准（全部满足才算 MVP 完成）

1. Termux 执行 `bash scripts/preview.sh` 后，手机微信可完成：**登录 → 新增物品 → 入库 → 出库 → 搜索 → 看到低库存提示**。
2. `bash scripts/upload.sh` 可上传体验版（用户本地配置密钥后）。
3. 密钥与 AppID 不在仓库内。
4. `docs/SMOKE-TEST.md` 可照做一遍通过。

## 用户本地配置（占位，写入 README）

- `WECHAT_APPID` = 【待填：wx........】
- `WECHAT_PRIVATE_KEY_PATH` = 【待填：~/.wechat-miniprogram/private.xxx.key】
- 云开发环境 ID = 【待填：cloud1-xxx】

## 工作方式要求

1. 先输出简短「实现计划」（对照上面阶段），再写代码。
2. 不要一次生成无法维护的巨大单文件；页面与云函数拆分清晰。
3. 注释从简，README 与 docs 写清楚运维步骤。
4. 遇到微信官方能力不确定时，标注文档链接，不要臆造 API。
5. 本仓库独立实现；不要把代码写回 Talk 仓库。

请从**阶段 1**开始：创建仓库骨架、`miniprogram-ci` 脚本、`.gitignore`、README，并说明我如何在 Termux 里第一次跑通 preview。
```

---

## 缩短版提示词（MyInventory 默认路径）

仅 **微信小程序 + 云开发**，无网页。Agent 同步文档后按本段执行。

```
# 任务：MyInventory 个人库存管理微信小程序 MVP（仅小程序，无网页）

## 角色

你是 MyInventory 实现仓的 Agent。先完成阶段 0 同步 Talk 文档，再在本仓库写代码。

## 阶段 0（用户未复制文档，必须由你完成）

用户**不会**手动从 Talk 复制文件。你必须：

1. 从 Talk 获取以下源文件**全文**（优先 `raw.githubusercontent.com`，其次 GitHub API / 页面抓取）：
   - `docs/07-projects/2026-08-18-MyInventory-Agent实现提示词.md`
     → 写入本仓 `docs/REFERENCE-AGENT-PROMPT.md`
   - `docs/07-projects/2026-08-18-微信小程序-Termux平板开发落实规划.md`
     → 写入本仓 `docs/REFERENCE-PLAN.md`
2. 在每个 REFERENCE 文件顶部注明：源仓库 Talk、源路径、同步日期、raw URL。
3. 提交 git：`docs: 从 Talk 同步参考文档`。
4. 若暂时无法访问 GitHub：在 README 写明阻塞原因与所需 raw URL，并**仅**向用户索要粘贴内容，不要假设用户会主动复制。

完成阶段 0 后，继续阅读 `docs/REFERENCE-PLAN.md` 与本缩短版内容，从阶段 1 推进。

## 必读参考

- 本仓 `docs/REFERENCE-PLAN.md`（Termux 流水线、云开发选型）
- Talk：https://github.com/jk9988610/Talk/blob/main/docs/07-projects/2026-08-18-微信小程序-Termux平板开发落实规划.md

将规划中「小仓库存」改为 **个人家用库存**（单用户自用）。**不要**做网页管理端、不要 uni-app/Taro、不要自建服务器。

## 环境约束（必须遵守）

- 开发：安卓平板 + Termux + Cursor；**无**微信开发者工具模拟器。
- 预览/上传：仅用 `miniprogram-ci`（`preview` 终端二维码 → 微信扫码；`upload` 体验版）。
- 主体：个人（不做支付、不做企业能力）。
- 后端：微信云开发（数据库 + 云函数）。
- 技术：原生小程序（WXML/JS）。
- `private.*.key`、AppID **禁止进 Git**。

## MVP 功能（只做这些）

1. 微信登录（openid，单用户）。
2. 物品列表：名称、分类、数量、单位、存放位置、备注。
3. 新增/编辑物品；支持 barcode 字段。
4. 扫码 `wx.scanCode`：已有条码→打开物品；没有→新增页带条码。
5. 入库/出库：改数量并记流水（类型 in/out，原因可选）。
6. 首页：物品总数、今日变动、低库存提醒（数量 ≤ 阈值）。
7. 搜索：名称/分类/位置。

## 不做

网页端、多用户、支付、报表、AI、云存储照片、保质期（可留字段但不实现）。

## 仓库结构（精简）

```
miniprogram/          # 页面：index, items, item-edit, stock-in, stock-out
cloudfunctions/       # login, stock（出库不可为负）
scripts/preview.sh
scripts/upload.sh
docs/DATA-MODEL.md
docs/SMOKE-TEST.md
docs/REFERENCE-AGENT-PROMPT.md   # 阶段 0 写入
docs/REFERENCE-PLAN.md           # 阶段 0 写入
project.config.json
package.json
.gitignore
README.md
```

## 数据（写入 DATA-MODEL.md）

- `items`: openid, name, barcode?, category?, location?, unit?, quantity, lowStockThreshold?, note?, timestamps
- `stock_logs`: openid, itemId, itemName, type(in|out), delta, reason?, note?, createdAt

库存变更须校验：出库后 quantity ≥ 0。

## 交付顺序（按序提交）

0. 从 Talk 同步 REFERENCE 文档（见阶段 0）。
1. 骨架 + `preview.sh` 能预览空白页 + README（Termux 步骤）。
2. 物品 CRUD + 列表。
3. 入库/出库 + 首页概览/低库存。
4. 扫码流程。
5. `upload.sh` + SMOKE-TEST。

## 验收

Termux `bash scripts/preview.sh` 后，手机完成：登录→新增→入库→出库→搜索→低库存提示。密钥不在仓库。

## 本地配置（写进 README）

WECHAT_APPID=【待填】
WECHAT_PRIVATE_KEY_PATH=【待填】
云环境 ID=【待填】

请先输出 6 步计划（含阶段 0），然后从阶段 0 开始实现；阶段 0 完成后无需等待用户确认，连续推进至 MVP 验收。
```

---

## 一周节奏参考（缩短版）

| 天 | 目标 |
|----|------|
| 0 | Agent 同步 Talk → `docs/REFERENCE-*` |
| 1 | 注册小程序、云开发、密钥；阶段 1，`preview` 空白页 |
| 2～3 | 阶段 2 物品 CRUD |
| 4～5 | 阶段 3 出入库 + 首页 |
| 6 | 阶段 4 扫码 |
| 7 | 阶段 5 上传体验版 + SMOKE-TEST |

---

## 文档维护

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-08-18 | 完整版 + 缩短版提示词 + 一句话指导 |
| v1.1 | 2026-08-18 | 仓库更名为 MyInventory；阶段 0 由 Agent 同步 Talk 文档 |
