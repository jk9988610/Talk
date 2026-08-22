---
title: MiraSpace 地球生态 · 基因表达（摘要）
category: projects
tags: [MiraSpace, 地球生态, 基因表达, 营养级, 涌现]
status: draft
created: 2026-08-22
updated: 2026-08-22
author:
---

# MiraSpace 地球生态 · 基因表达（摘要）

> **父文档**：[米拉空间数字生命演化](2026-08-14-米拉空间数字生命演化.md) · [科学阶段路线图](2026-08-14-MiraSpace-科学阶段路线图.md)  
> **权威规格**（实现仓）：[EARTH_GENE_EXPRESSION.md](https://github.com/jk9988610/MiraSpace/blob/main/docs/EARTH_GENE_EXPRESSION.md) · [EARTH_ECOSPHERE_ROADMAP.md](https://github.com/jk9988610/MiraSpace/blob/main/docs/EARTH_ECOSPHERE_ROADMAP.md)  
> **状态**：设计已确认（2026-08-14），**待分阶段实现**；v1（P0→S5）已独立于本路线闭合。

---

## 定位

在现有 **S2 复制子 / S4 chemoton** 代码之上，扩展「**米拉地球**」生态时代：用 **12 bit 表达头** 驱动代谢 archetype、营养级与 **O₂ / CO₂ / 有机碳** 场交换——**不模拟真实酶动力学**，用查表与小公式；**涌现约束不变**（无脚本 spawn）。

---

## 序列布局（12 bit 表达头）

```
索引:  0–3  | 4–7  | 8–11 | 12…
模块:   M   |  T   |  R   | junk（复制/寄生/冗余）
```

| 模块 | 含义 | 示例 |
|------|------|------|
| **M** | 代谢模块 | 氧合光合、化能自养、好氧呼吸、发酵、分解、渗漏 |
| **T** | 营养级 | 自养、食草、捕食、分解、混合营养 |
| **R** | 调控 | 好氧耐受等位域 |
| **junk** | 非编码 | 影响复制 motif、storageEmergence、寄生 |

若 `sequence.length < 12`：代谢退化为渗漏型（低通量、少量 CO₂）。

---

## 与现有代码映射

| 现有 | 生态扩展 |
|------|----------|
| `strand.sequence[]` | 前 12 bit = M\|T\|R |
| `replicator.motifs` | 保留，影响复制率 |
| `chemoton.geneticActivity` | × `decode(...)` 表达强度 |
| `chemoton.role` | UI 营养级中文；底层 `archetype` |

---

## 深链接示例

```
?seed=42&preset=stage-earth-default
```

在线站点：[MiraSpace](https://jk9988610.github.io/MiraSpace/)

---

## Talk 维护说明

- **不在 Talk 维护**完整代谢查表与路线图任务列表
- 实现进度以 MiraSpace `docs/EARTH_ECOSPHERE_ROADMAP.md` 为准
- 生物学界面称谓见实现仓 `docs/BIOLOGY_NOMENCLATURE.md`
