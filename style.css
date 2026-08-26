/* ============================================================
   VATE // 主逻辑
   ============================================================ */

(() => {
  'use strict';

  /* ----------------------------------------------------------
   * 1) 进度条递增算法
   * -------------------------------------------------------- */
  function easeCharge(t) {
    if (t <= 0.30) return t;
    const x = (t - 0.30) / 0.70;
    return 0.30 + (1 - 0.30) * (x * (2 - x));
  }

  function runChargeProgress(onUpdate, onDone) {
    const dur = 2500;
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / dur, 1);
      const v = easeCharge(t);
      onUpdate?.(v);
      if (t < 1) requestAnimationFrame(frame);
      else onDone?.();
    }
    requestAnimationFrame(frame);
  }

  /* ----------------------------------------------------------
   * 2) 搜索功能
   * -------------------------------------------------------- */
  const searchInput = document.getElementById('searchInput');
  const searchBtn   = document.getElementById('searchBtn');

  const commandMap = {
    'help':  () => console.log('[VATE] 帮助菜单'),
    'about': () => console.log('[VATE] 关于陨篂/YunXing'),
    'clear': () => { searchInput.value = ''; },
  };

  const matchList = ['vate', '褐蝎', 'star', 'yunxing', '陨篂'];

  function compareInput(raw) {
    const val = (raw || '').trim();
    if (!val) return { matched: false, value: '搜索失败/No text' };

    const lower = val.toLowerCase();
    if (commandMap.hasOwnProperty(lower)) return { matched: true, value: val };

    const hit = matchList.find(k => lower.includes(k));
    if (hit) return { matched: true, value: val };

    return { matched: false, value: '搜索失败/No text' };
  }

  function executeSearch() {
    const { matched, value } = compareInput(searchInput.value);
    if (matched) {
      searchInput.value = value;
      const fn = commandMap[value.toLowerCase()];
      if (fn) fn();
      console.log('[VATE] 命中:', value);
    } else {
      searchInput.value = value;
    }
  }

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') executeSearch();
  });
  searchBtn.addEventListener('click', executeSearch);

  /* ----------------------------------------------------------
   * 3) 世界时间 —— 实时显示用户设备本地时间
   * -------------------------------------------------------- */
  const timeEl = document.getElementById('worldTime');

  function updateTime() {
    const now = new Date();
    const h   = String(now.getHours()).padStart(2, '0');
    const m   = String(now.getMinutes()).padStart(2, '0');
    const s   = String(now.getSeconds()).padStart(2, '0');
    // 获取设备本地时区偏移（分钟 → ±HH:MM）
    const tzOffset = -now.getTimezoneOffset();
    const tzH = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, '0');
    const tzM = String(Math.abs(tzOffset) % 60).padStart(2, '0');
    const tzSign = tzOffset >= 0 ? '+' : '-';
    timeEl.textContent = `VATE TIME // ${h}:${m}:${s} UTC${tzSign}${tzH}:${tzM}`;
  }

  updateTime();
  setInterval(updateTime, 1000);

  /* ----------------------------------------------------------
   * 4) 开场动画
   * -------------------------------------------------------- */
  const introLayer   = document.getElementById('introLayer');
  const introLogoImg = document.getElementById('introLogoImg');
  const whiteSlash   = document.getElementById('whiteSlash');
  const triGrid      = document.getElementById('triangleGrid');

  function buildTriangles() {
    const cols = 8, rows = 8;
    const cellW = 320 / cols, cellH = 320 / rows;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const tri = document.createElement('div');
        tri.className = 'tri';
        const dist = (i / rows) + ((cols - 1 - j) / cols);
        const opacity = Math.min(0.60, 0.06 + dist * 0.32);
        tri.style.left = (j * cellW + cellW * 0.5 - 6) + 'px';
        tri.style.top  = (i * cellH + cellH * 0.5 - 5) + 'px';
        if ((i + j) % 2 === 0) tri.style.transform = 'rotate(180deg)';
        tri.style.setProperty('--op', opacity.toFixed(2));
        triGrid.appendChild(tri);
      }
    }
  }

  function startIntro() {
    buildTriangles();
    whiteSlash.classList.add('run');

    setTimeout(() => { introLogoImg.src = 'Logo1.png'; }, 2350);
    setTimeout(() => { triGrid.classList.add('show'); }, 2700);

    // ✅ 关键：用淡出 + remove() 彻底清理 DOM，不卡主线程
    setTimeout(() => {
      introLayer.style.transition = 'opacity 0.5s ease';
      introLayer.style.opacity = '0';
      setTimeout(() => introLayer.remove(), 550);
    }, 4500);
  }

  window.addEventListener('load', startIntro);

  /* ----------------------------------------------------------
   * 5) 蓄力进度可视化（调试用）
   * -------------------------------------------------------- */
  runChargeProgress((v) => {
    // console.log('charge:', (v*100).toFixed(1) + '%');
  });

})();
