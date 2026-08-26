/* ============================================================
   VATE // 主逻辑
   - 保留进度条「蓄力→冲刺」递增算法（驱动红楔形缓动）
   - 搜索框：输入上限15字，回车/图标触发比较函数
   - 动画在下方 .stage 显示区内播放（页面一体，不跳页）：
       t=0     : Logo2 显示 + 红楔形斜切入(2.5s)
       t=2.0s  : 白色细条(\)从右向左飞 (1.2s, 透明度80%)
       t=2.6s  : 白条飞到一半(0.6s) → Logo2 切 Logo1
       t=3.2s  : 白条飞完 → 右上角 7 个三角形渐显
     动画结束后：红背景 / 中间图片 / 7个三角形 均保留
   ============================================================ */

(() => {
  'use strict';

  /* ----------------------------------------------------------
   * 1) 进度条递增算法（蓄力 → 冲刺）
   *    前 30% 进度慢，之后加速冲过 —— 保留自上一版
   * -------------------------------------------------------- */
  function easeCharge(t) {
    if (t <= 0.30) {
      return t;
    }
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
   * 2) 搜索比较函数（可扩展）
   * -------------------------------------------------------- */
  const searchInput = document.getElementById('searchInput');
  const searchBtn   = document.getElementById('searchBtn');

  // 【扩展点】后续追加 关键词: 回调 即可
  const commandMap = {
    'help':  () => console.log('[VATE] 帮助菜单'),
    'about': () => console.log('[VATE] 关于陨篂/YunXing'),
    'clear': () => { searchInput.value = ''; },
  };

  const matchList = ['vate', '褐蝎', 'star', 'yunxing', '陨篂'];

  function compareInput(raw) {
    const val = (raw || '').trim();
    if (!val) {
      return { matched: false, value: '搜索失败/No text' };
    }
    const lower = val.toLowerCase();

    if (commandMap.hasOwnProperty(lower)) {
      return { matched: true, value: val };
    }
    const hit = matchList.find(k => lower.includes(k));
    if (hit) {
      return { matched: true, value: val };
    }
    return { matched: false, value: '搜索失败/No text' };
  }

  let lastSearch = '';
  function executeSearch() {
    lastSearch = searchInput.value;
    const { matched, value } = compareInput(lastSearch);
    if (matched) {
      searchInput.value = value;
      const fn = commandMap[value.toLowerCase()];
      if (fn) fn();
      console.log('[VATE] 命中:', value);
    } else {
      searchInput.value = value; // 「搜索失败/No text」
    }
  }

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') executeSearch();
  });
  searchBtn.addEventListener('click', executeSearch);

  /* ----------------------------------------------------------
   * 3) 动画时序（在下方 .stage 内播放，页面一体不跳页）
   *    DOM 元素全部位于 stage 内部，动画结束后保留显示
   * -------------------------------------------------------- */
  const redWedge   = document.getElementById('redWedge');
  const logoImg    = document.getElementById('logoImg');
  const streak     = document.getElementById('whiteStreak');
  const triGroup   = document.getElementById('triGroup');

  /**
   * 右上角 7 个错列大等腰三角形
   * 布局：2 行错列（上一行 3 个 / 下一行 4 个），整体靠右上
   * 方向：从右到左「上 下 上 下 ...」规律交替
   */
  function buildTriangles() {
    triGroup.innerHTML = '';

    // 7 个三角形：上一行 3 个，下一行 4 个（错列，类似巨神名片）
    const rows = [
      [1, 1, 1], // 上一行 3 个
      [1, 1, 1, 1], // 下一行 4 个（错列）
    ];

    // 从右到左 上/下 交替：索引 0 朝上，依次上下上下...
    let dirIndex = 0;

    rows.forEach((row) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'tri-row';
      row.forEach(() => {
        const tri = document.createElement('div');
        // 方向规律交替：上下上下
        tri.className = (dirIndex % 2 === 0) ? 'tri up' : 'tri down';
        dirIndex++;
        rowEl.appendChild(tri);
      });
      triGroup.appendChild(rowEl);
    });
  }

  function startIntro() {
    // 起始状态：Logo2 已在 HTML 中，红楔形 + Logo 可见
    buildTriangles();

    // 红楔形立即开始斜切入（2.5s）
    requestAnimationFrame(() => redWedge.classList.add('run'));

    // t=2.0s：白条(\)从右向左飞（1.2s，透明度80%）
    setTimeout(() => {
      streak.classList.add('run');
    }, 2000);

    // t=2.6s：白条飞到一半(0.6s) → 切换 Logo2 → Logo1
    setTimeout(() => {
      logoImg.src = 'Logo1.png';
    }, 2600);

    // t=3.2s：白条飞完 → 7 个三角形缓慢渐显
    // （动画结束后红背景 / 图片 / 三角形均保留在页面中）
    setTimeout(() => {
      triGroup.classList.add('show');
    }, 3200);
  }

  // 启动
  window.addEventListener('load', startIntro);

  /* ----------------------------------------------------------
   * 4) 复用蓄力算法（可用于其它数值驱动）
   * -------------------------------------------------------- */
  runChargeProgress((v) => {
    // console.log('charge:', (v * 100).toFixed(1) + '%');
  });

})();
