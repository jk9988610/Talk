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
    name: 'MiraSpace',
    subtitle: '米拉空间 · 数字生命演化',
    desc: '涌现式数字生物模拟：从原始汤到 RNA、DNA、细胞与多细胞。观察者漫游 Canvas 空域。',
    ideaDoc: 'docs/07-projects/2026-08-14-米拉空间数字生命演化.md',
    repo: 'https://github.com/jk9988610/MiraSpace',
    pages: 'https://jk9988610.github.io/MiraSpace/',
    status: '规划中',
  },
  {
    name: 'CivSlice',
    subtitle: '文明切片 · 十维历史可视化',
    desc: '科学方法驱动的文明历史多维探索，含时间线交互原型。从本仓库项目构想孵化。',
    ideaDoc: 'docs/07-projects/2026-08-12-多维文明历史可视化.md',
    repo: 'https://github.com/jk9988610/CivSlice',
    pages: 'https://jk9988610.github.io/CivSlice/',
    status: '已部署',
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
  document.getElementById('projects').innerHTML = projects.map((p) => `
    <article class="card project-card">
      <h3>${p.name}</h3>
      <p class="project-sub">${p.subtitle}</p>
      <p>${p.desc}</p>
      <div class="project-links">
        <a href="${REPO}/blob/main/${p.ideaDoc}">原始构想</a>
        <span class="sep">·</span>
        <a href="${p.repo}">仓库</a>
        <span class="sep">·</span>
        <a href="${p.pages}">Pages</a>
        <span class="badge">${p.status}</span>
      </div>
    </article>
  `).join('');
}

renderCategories();
renderProjects();
