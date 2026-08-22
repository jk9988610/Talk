# Talk Pages 站点

本目录为 **Talk 想法文档仓库** 的 GitHub Pages 入口，不是具体项目的实现站点。

## 用途

- 展示仓库定位与文档分类导航
- 链接至 `docs/` 各分类与写作模板
- 列出已从本仓库孵化的独立项目

## 在线访问

https://jk9988610.github.io/Talk/

## 与项目仓库的关系

| 仓库 | 角色 | Pages |
|------|------|-------|
| **Talk**（本仓库） | 想法、构想、讨论文档 | 文档导航门户 |
| **CivSlice** | 文明切片 · 历史可视化 | 交互原型站点 |
| **MiraSpace** | 米拉空间 · 数字生命模拟 | 科学阶段演示 |
| **PixPack** | 素材工坊 · PixiJS | 画室与预览 |
| **MiraTown** | 米拉小镇 · DSL 演绎 | 播放 + 地图编辑器 |
| **征服三国** | TCG 卡牌框架 | 可玩原型 |

可视化原型代码应从本仓库迁移至 CivSlice，不在 Talk 的 `site/` 中维护。

## 本地预览

```bash
cd site && python3 -m http.server 8080
```

## 部署

由 `.github/workflows/pages.yml` 自动部署，推送 `main` 分支即更新。
