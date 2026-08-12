# GitHub Pages 发布说明

本目录为「多维文明历史可视化」的静态交互原型。

## 启用步骤

1. 进入仓库 **Settings → Pages**
2. **Source** 选择 `Deploy from a branch`
3. **Branch** 选 `main`，目录选 **`/site`**
4. 保存后等待几分钟，访问 `https://jk9988610.github.io/Talk/`

## 本地预览

```bash
cd site
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

> 必须通过 HTTP 服务访问，`fetch` 无法从 `file://` 加载 JSON。

## 文件结构

```
site/
├── index.html          # 页面入口
├── styles.css          # 样式
├── app.js              # 时间线、雷达图、维度卡片逻辑
├── data/
│   └── civilizations.json  # 文明快照数据
└── README.md
```

## 贡献数据

在 `data/civilizations.json` 中为文明添加 `snapshots`，每条快照包含：

- `year` — 快照年份（公元前为负）
- `eraLabel` — 时代标签
- `worldContext` — 世界背景一句
- `dimensions` — 九维对象，每维含 `level`（1–5 或 null）、`summary`、`confidence`

`confidence` 取值：`documented` | `inferred` | `speculative` | `absent`

详细设计见 [项目文档](../docs/07-projects/2026-08-12-多维文明历史可视化.md)。
