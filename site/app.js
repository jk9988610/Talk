let data = null;
let currentYear = -2500;
let selectedCivs = [];
let compareMode = false;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

async function init() {
  const res = await fetch('data/civilizations.json');
  data = await res.json();

  const { yearMin, yearMax, yearStep } = data.meta;
  const slider = $('#year-slider');
  slider.min = yearMin;
  slider.max = yearMax;
  slider.step = yearStep;
  slider.value = currentYear;

  selectedCivs = [data.civilizations[0].id, data.civilizations[1]?.id].filter(Boolean);

  buildTimelineTicks(yearMin, yearMax);
  buildCivTabs();
  bindEvents();
  render();
}

function buildTimelineTicks(min, max) {
  const ticks = $('#timeline-ticks');
  const count = 5;
  const step = (max - min) / (count - 1);
  ticks.innerHTML = Array.from({ length: count }, (_, i) => {
    const y = Math.round(min + step * i);
    return `<span>${formatYear(y)}</span>`;
  }).join('');
}

function buildCivTabs() {
  const container = $('#civ-tabs');
  container.innerHTML = data.civilizations.map((civ) => `
    <button class="civ-tab" data-id="${civ.id}" style="--civ-color:${civ.color}">
      ${civ.name}
    </button>
  `).join('');
  updateTabStyles();
}

function updateTabStyles() {
  $$('.civ-tab').forEach((tab) => {
    const id = tab.dataset.id;
    const civ = data.civilizations.find((c) => c.id === id);
    const active = selectedCivs.includes(id);
    tab.classList.toggle('active', active);
    tab.style.borderColor = active ? civ.color : '';
    tab.style.color = active ? civ.color : '';
  });
}

function bindEvents() {
  $('#year-slider').addEventListener('input', (e) => {
    currentYear = Number(e.target.value);
    render();
  });

  $('#btn-prev').addEventListener('click', () => stepYear(-1));
  $('#btn-next').addEventListener('click', () => stepYear(1));

  $('#compare-mode').addEventListener('change', (e) => {
    compareMode = e.target.checked;
    if (compareMode && selectedCivs.length < 2) {
      const second = data.civilizations.find((c) => c.id !== selectedCivs[0]);
      if (second) selectedCivs.push(second.id);
    }
    if (!compareMode) selectedCivs = [selectedCivs[0]];
    updateTabStyles();
    render();
  });

  $('#civ-tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('.civ-tab');
    if (!tab) return;
    const id = tab.dataset.id;

    if (compareMode) {
      if (selectedCivs.includes(id)) {
        if (selectedCivs.length > 1) selectedCivs = selectedCivs.filter((x) => x !== id);
      } else if (selectedCivs.length < 2) {
        selectedCivs.push(id);
      } else {
        selectedCivs[1] = id;
      }
    } else {
      selectedCivs = [id];
    }
    updateTabStyles();
    render();
  });
}

function stepYear(dir) {
  const step = data.meta.yearStep;
  currentYear = Math.max(data.meta.yearMin, Math.min(data.meta.yearMax, currentYear + dir * step));
  $('#year-slider').value = currentYear;
  render();
}

function formatYear(year) {
  if (year < 0) return `公元前 ${Math.abs(year)} 年`;
  if (year === 0) return '公元元年';
  return `公元 ${year} 年`;
}

function findNearestSnapshot(civ, year) {
  if (!civ.snapshots.length) return null;
  return civ.snapshots.reduce((best, snap) =>
    Math.abs(snap.year - year) < Math.abs(best.year - year) ? snap : best
  );
}

function render() {
  $('#year-display').textContent = formatYear(currentYear);

  const primary = data.civilizations.find((c) => c.id === selectedCivs[0]);
  const snap = primary ? findNearestSnapshot(primary, currentYear) : null;

  $('#era-label').textContent = snap?.eraLabel || '该时段';
  $('#world-context').textContent = snap?.worldContext
    ? `世界背景：${snap.worldContext}`
    : '该年份附近暂无世界背景记录。';

  const grid = $('#main-grid');
  grid.classList.toggle('compare', compareMode);

  if (compareMode) {
    renderCompareMode();
  } else {
    renderSingleMode(primary, snap);
  }
}

function renderSingleMode(civ, snap) {
  const hasSnap = civ && snap && Math.abs(snap.year - currentYear) <= 400;

  const overviewHtml = hasSnap
    ? `
      <h2 style="color:${civ.color}">${civ.name}</h2>
      <p class="overview-region">${civ.region}</p>
      <span class="overview-era">${snap.eraLabel}</span>
      <p class="overview-note">
        快照年份：${formatYear(snap.year)}<br>
        与当前选择相差 ${Math.abs(snap.year - currentYear)} 年
      </p>
      <p class="overview-note">
        九维等级为 1–5 的<strong>相对概括</strong>，非精确统计。未记录维度在雷达图上留空。
      </p>
    `
    : `
      <h2>${civ?.name || '—'}</h2>
      <p class="no-snapshot" style="margin-top:1rem;padding:1rem;">该文明在 ${formatYear(currentYear)} 附近暂无快照记录。</p>
    `;

  const vizHtml = hasSnap
    ? `
      <div class="radar-wrap">
        <canvas id="radar-canvas" width="360" height="360"></canvas>
        <p class="radar-legend">
          <span class="dot documented"></span>有据
          <span class="dot inferred"></span>推断
          <span class="dot speculative"></span>猜测
          <span class="dot absent"></span>未记录
        </p>
      </div>
      <div class="dimension-grid" id="dimension-grid"></div>
    `
    : '<p class="no-snapshot">请选择其他年代或文明，或补充数据。</p>';

  $('#main-grid').innerHTML = `
    <aside class="overview-panel" id="overview-panel">${overviewHtml}</aside>
    <div class="viz-panel">${vizHtml}</div>
  `;

  if (hasSnap) {
    drawRadar(snap, civ.color);
    renderDimensionGrid(snap, '#dimension-grid');
  }
}

function renderCompareMode() {
  $('#overview-panel').style.display = 'none';

  const columns = selectedCivs.map((id) => {
    const civ = data.civilizations.find((c) => c.id === id);
    const snap = civ ? findNearestSnapshot(civ, currentYear) : null;
    return { civ, snap };
  });

  const html = `
    <div class="compare-columns">
      ${columns.map(({ civ, snap }, i) => `
        <div class="civ-column" data-idx="${i}">
          <div class="civ-column-header" style="color:${civ?.color}">${civ?.name || '—'}</div>
          ${!snap || Math.abs(snap.year - currentYear) > 400
            ? '<p class="no-snapshot">该时段暂无记录</p>'
            : `
              <div class="radar-wrap">
                <canvas class="radar-canvas" width="300" height="300" data-idx="${i}"></canvas>
              </div>
              <div class="dimension-grid dim-grid-compare" data-idx="${i}"></div>
            `}
        </div>
      `).join('')}
    </div>
  `;

  $('#main-grid').innerHTML = html;

  columns.forEach(({ civ, snap }, i) => {
    if (!snap || Math.abs(snap.year - currentYear) > 400) return;
    const canvas = $(`.radar-canvas[data-idx="${i}"]`);
    drawRadar(snap, civ.color, canvas);
    renderDimensionGrid(snap, `.dim-grid-compare[data-idx="${i}"]`);
  });
}

function renderDimensionGrid(snap, selector) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  grid.innerHTML = data.dimensions.map((dim) => {
    const d = snap.dimensions[dim.id] || { confidence: 'absent', summary: '', level: null };
    const conf = d.confidence || 'absent';
    const badgeClass = `badge-${conf}`;
    const label = data.confidenceLabels[conf] || conf;

    if (conf === 'absent') {
      return `
        <div class="dim-card confidence-absent">
          <div class="dim-header">
            <span class="dim-label">${dim.label}</span>
            <span class="dim-badge ${badgeClass}">${label}</span>
          </div>
          <p class="dim-summary">—</p>
        </div>
      `;
    }

    const levelBar = d.level ? `等级 ${d.level}/5` : '';
    return `
      <div class="dim-card confidence-${conf}">
        <div class="dim-header">
          <span class="dim-label">${dim.label}</span>
          <span class="dim-badge ${badgeClass}">${label}</span>
        </div>
        ${levelBar ? `<div class="dim-level">${levelBar}</div>` : ''}
        <p class="dim-summary">${d.summary}</p>
      </div>
    `;
  }).join('');
}

function drawRadar(snap, color, canvasEl) {
  const canvas = canvasEl || $('#radar-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) * 0.38;
  const dims = data.dimensions;
  const n = dims.length;

  ctx.clearRect(0, 0, w, h);

  // grid rings
  for (let ring = 1; ring <= 5; ring++) {
    ctx.beginPath();
    const r = (maxR * ring) / 5;
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#2e3344';
    ctx.stroke();
  }

  // axes + labels
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#9aa3b5';
  dims.forEach((dim, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const x2 = cx + maxR * Math.cos(angle);
    const y2 = cy + maxR * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#2e3344';
    ctx.stroke();

    const lx = cx + (maxR + 18) * Math.cos(angle);
    const ly = cy + (maxR + 18) * Math.sin(angle);
    ctx.textAlign = Math.abs(Math.cos(angle)) < 0.1 ? 'center' : Math.cos(angle) > 0 ? 'left' : 'right';
    ctx.textBaseline = Math.abs(Math.sin(angle)) < 0.1 ? 'middle' : Math.sin(angle) > 0 ? 'top' : 'bottom';
    ctx.fillText(dim.short, lx, ly);
  });

  // data polygon
  const points = dims.map((dim, i) => {
    const d = snap.dimensions[dim.id];
    const level = d && d.confidence !== 'absent' && d.level ? d.level : 0;
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = (maxR * level) / 5;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), level, dim: dim.id, d };
  });

  if (points.some((p) => p.level > 0)) {
    ctx.beginPath();
    points.forEach((p, i) => {
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = color + '33';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // vertices colored by confidence
  points.forEach((p) => {
    if (p.level <= 0) return;
    const conf = p.d?.confidence || 'absent';
    const colors = {
      documented: '#4ade80',
      inferred: '#60a5fa',
      speculative: '#fbbf24',
      absent: '#4b5563',
    };
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = colors[conf] || colors.absent;
    ctx.fill();
  });
}

init().catch(console.error);
