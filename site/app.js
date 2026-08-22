const REPO = 'https://github.com/jk9988610/Talk';

const categories = [
  { icon: '💡', name: '想法速记', desc: '灵感与碎片思考', path: 'docs/01-ideas' },
  { icon: '✍️', name: '随笔', desc: '成型文字与观点', path: 'docs/02-essays' },
  { icon: '💻', name: '技术', desc: '编程与工程实践', path: 'docs/03-tech' },
  { icon: '🧠', name: '哲学思辨', desc: '认识、伦理与意义', path: 'docs/04-philosophy' },
  { icon: '🌱', name: '生活感悟', desc: '日常观察与体验', path: 'docs/05-life' },
  { icon: '📚', name: '读书笔记', desc: '摘要、批注与延伸', path: 'docs/06-reading' },
  { icon: '🚀', name: '项目构想', desc: '产品与应用创意', path: 'docs/07-projects' },
  { icon: '💬', name: '开放讨论', desc: '命题与多元观点', path: 'docs/08-discussions' },
  { icon: '📦', name: '归档', desc: '已完结内容', path: 'docs/99-archive' },
];

const projects = [
  {
    name: 'CivSlice',
    subtitle: '文明切片 · 历史可视化',
    desc: '证据驱动、十维（aspect）文明快照；区域→时段→泳道→比较导航。',
    ideaDoc: 'docs/07-projects/2026-08-12-多维文明历史可视化.md',
    repo: 'https://github.com/jk9988610/CivSlice',
    pages: 'https://jk9988610.github.io/CivSlice/',
    status: '已部署',
  },
  {
    name: 'MiraSpace',
    subtitle: '米拉空间 · 数字生命演化',
    desc: '涌现式 Canvas 模拟：P0→S5 科学阶段已闭合；地球生态基因表达规划中。',
    ideaDoc: 'docs/07-projects/2026-08-14-米拉空间数字生命演化.md',
    repo: 'https://github.com/jk9988610/MiraSpace',
    pages: 'https://jk9988610.github.io/MiraSpace/',
    status: '已部署',
  },
  {
    name: 'PixPack',
    subtitle: '素材工坊 · PixiJS + Supabase',
    desc: '网页像素精灵工具：Pack 加载、画室 9×9、云端素材库。',
    ideaDoc: 'docs/07-projects/2026-08-19-PixPack-素材工坊项目总览.md',
    repo: 'https://github.com/jk9988610/PixPack',
    pages: 'https://jk9988610.github.io/PixPack/',
    status: '已部署',
  },
  {
    name: 'MiraTown',
    subtitle: '米拉小镇 · DSL 演绎游戏',
    desc: 'AI 写剧本、引擎精确执行；地图编辑器 + Gate 0–3 已闭合。',
    ideaDoc: 'docs/07-projects/2026-08-22-MiraTown-米拉小镇项目总览.md',
    repo: 'https://github.com/jk9988610/MiraTown',
    pages: 'https://jk9988610.github.io/MiraTown/',
    status: '已部署',
  },
  {
    name: '征服三国',
    subtitle: 'TCG 卡牌框架',
    desc: '标准 TCG 尺寸、像素卡面、商店与战场拖拽；吕布等角色可玩。',
    ideaDoc: 'docs/07-projects/2026-08-22-征服三国-TCG卡牌框架总览.md',
    repo: 'https://github.com/jk9988610/Conquer-the-Three-Kingdoms',
    pages: 'https://jk9988610.github.io/Conquer-the-Three-Kingdoms/',
    status: '已部署',
  },
  {
    name: 'MyInventory',
    subtitle: '个人库存 · 微信小程序',
    desc: 'Termux + miniprogram-ci 流水线；微信云开发 MVP 待实现。',
    ideaDoc: 'docs/07-projects/2026-08-18-MyInventory-Agent实现提示词.md',
    repo: 'https://github.com/jk9988610/MyInventory',
    pages: null,
    status: '规划中',
  },
];

function renderCategories() {
  document.getElementById('categories').innerHTML = categories.map((c) => `
    <a class="card" href="${REPO}/tree/main/${c.path}">
      <span class="card-icon">${c.icon}</span>
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
    </a>
  `).join('');
}

function renderProjects() {
  document.getElementById('projects').innerHTML = projects.map((p) => {
    const pagesLink = p.pages
      ? `<a href="${p.pages}">Pages</a><span class="sep">·</span>`
      : '';
    return `
    <article class="card project-card">
      <h3>${p.name}</h3>
      <p class="project-sub">${p.subtitle}</p>
      <p>${p.desc}</p>
      <div class="project-links">
        <a href="${REPO}/blob/main/${p.ideaDoc}">原始构想</a>
        <span class="sep">·</span>
        <a href="${p.repo}">仓库</a>
        <span class="sep">·</span>
        ${pagesLink}
        <span class="badge">${p.status}</span>
      </div>
    </article>
  `;
  }).join('');
}

renderCategories();
renderProjects();
