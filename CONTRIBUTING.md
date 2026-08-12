# 贡献指南

感谢你愿意在这里交流想法。本仓库以 Markdown 文档为主，通过 GitHub 的 Pull Request 与 Issue 协作。

## 贡献方式

### 方式一：Pull Request（推荐）

1. Fork 本仓库
2. 在对应分类目录下新建文档（见[分类说明](docs/README.md)）
3. 复制 [templates/](templates/) 中的合适模板
4. 填写 frontmatter 与正文
5. 发起 Pull Request，简要说明内容与分类选择

### 方式二：Issue

若尚未成文，可使用 Issue 模板：

- **新想法** — 抛出灵感，等待讨论或他人执笔
- **开放讨论** — 发起命题，征集多元观点
- **站点反馈** — 报告文档结构、链接等问题

## 文档元数据

每篇文档开头使用 YAML frontmatter：

```yaml
---
title: 文档标题
category: ideas          # ideas | essays | tech | philosophy | life | reading | projects | discussions
tags: [标签1, 标签2]
status: draft            # draft | review | published | archived
created: 2026-08-12
updated: 2026-08-12
author: 你的名字         # 可选
---
```

## 文件命名

```
docs/<分类目录>/YYYY-MM-DD-简短标题.md
```

规则：

- 日期为创建日，使用 `YYYY-MM-DD`
- 标题使用中文或英文，单词间用连字符 `-` 分隔
- 避免空格与特殊字符
- 同一目录下文件名不得重复

示例：

```
docs/03-tech/2026-08-12-rust-ownership-notes.md
docs/02-essays/2026-08-12-关于慢思考.md
```

## 分类边界

一篇文档只归属一个主分类。若跨域：

- 选**最主要**的主题作为 `category` 与存放目录
- 用 `tags` 标注次要主题
- 可在文末添加「相关阅读」链接到其他文档

## 写作建议

- **想法速记**可简短，几条 bullet 即可
- **随笔**应有清晰结构：引言、论述、结语
- **开放讨论**应明确命题，并列出你已有的初步观点
- 引用他人观点请注明出处
- 尊重不同立场，避免人身攻击

## 归档

当文档不再维护或观点已过时：

1. 将 `status` 改为 `archived`
2. 移动文件至 `docs/99-archive/`，保持原文件名
3. 在原分类的 README 中删除对应链接（如有）

## Pull Request 检查清单

- [ ] 文件放在正确的分类目录
- [ ] 文件名符合命名约定
- [ ] frontmatter 字段完整
- [ ] 无敏感个人信息（地址、电话等）
- [ ] 链接可正常访问

## 许可

除非单篇文档 frontmatter 或文末另有声明，贡献内容默认以 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 许可发布。
