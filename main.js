/* ============================================================
   VATE // 主逻辑
   - 保留进度条「蓄力→冲刺」递增算法（用于开场缓动）
   - 搜索框：输入上限15字，回车/图标触发比较函数
   - 开场动画时序：Logo2 → 白条飞至一半 → 切 Logo1
   ============================================================ */

(() => {
  'use strict';

  /* ----------------------------------------------------------
   * 1) 进度条递增算法（蓄力 → 冲刺）
   *    前 30% 进度慢，之后加速冲过 —— 保留自上一版
   * -------------------------------------------------------- */
  function easeCharge(t) {
    // t ∈ [0,1]；返回填充量，同样在 t=0.30 时约 0.30 附近蓄力后提速
    if (t <= 0.30) {
      return t; // 前 30% 线性偏慢
    }
    // 30%→100%：二次缓出，快速冲至终点
    const x = (t - 0.30) / 0.70;
    return 0.30 + (1 - 0.30) * (x * (2 - x));
  }

  // 演示：按算法推进开场楔形（可视化校验，实际动画由 CSS 承担）
  function runChargeProgress(onUpdate, onDone) {
    const dur = 2500; // 2.5s，与 CSS wedgeIn 一致
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
   *    input 与任一「后续设定内容」匹配 → 执行对应逻辑
   *    否则把显示值置为「搜索失败/No text」
   * -------------------------------------------------------- */
  const searchInput = document.getElementById('searchInput');
  const searchBtn   = document.getElementById('searchBtn');

  // 【扩展点】后续在此对象里追加 关键词: 回调函数 即可
  const commandMap = {
    'help':    () => console.log('[VATE] 帮助菜单'),
    'about':   () => console.log('[VATE] 关于陨篂/YunXing'),
    'clear':   () => { searchInput.value = ''; setDisplay(''); },
    // ... 更多指令后续添加
  };

  // 兜底匹配数组（也支持数组里直接列字符串）
  const matchList = ['vate', '褐蝎', 'star', 'yunxing', '陨篂'];

  /**
   * 比较函数：把输入 string 与已设定内容比对
   * @param {string} raw
   * @returns {{matched:boolean, value:string}}
   */
  function compareInput(raw) {
    const val = (raw || '').trim();
    if (!val) {
      return { matched: false, value: '搜索失败/No text' };
    }

    const lower = val.toLowerCase();

    // 2a) 对象指令精确匹配
    if (commandMap.hasOwnProperty(lower)) {
      return { matched: true, value: val };
    }
    // 2b) 列表模糊匹配
    const hit = matchList.find(k => lower.includes(k));
    if (hit) {
      return { matched: true, value: val };
    }

    // 未匹配 → 显示失败文案
    return { matched: false, value: '搜索失败/No text' };
  }

  /** 执行搜索：存变量 + 比较 + 触发 */
  let lastSearch = '';
  function executeSearch() {
    lastSearch = searchInput.value;        // 存进变量
    const { matched, value } = compareInput(lastSearch);

    if (matched) {
      searchInput.value = value;           // 保留显示输入内容
      // 命中 → 执行对应函数（后续扩展入口）
      const fn = commandMap[value.toLowerCase()];
      if (fn) fn();
      console.log('[VATE] 命中:', value);
    } else {
      searchInput.value = value;           // 显示「搜索失败/No text」
    }
  }

  // 回车键
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') executeSearch();
  });
  // 放大镜图标点击
  searchBtn.addEventListener('click', executeSearch);

  /** 供外部直接设置显示内容（不触发比较） */
  function setDisplay(txt) { searchInput.value = txt; }

  /* ----------------------------------------------------------
   * 3) 开场动画时序
   *    t=0     : Logo2 居中显示
   *    t=2.0s  : 白色细斜梯形开始从右向左飞 (0.7s)
   *    t=2.35s : 白条飞行到一半(0.35s) → 隐藏 Logo2 / 显示 Logo1
   *    t=2.7s+ : 白条飞过，右上角三角形阵列渐显
   * -------------------------------------------------------- */
  const introLayer   = document.getElementById('introLayer');
  const introLogo    = document.getElementById('introLogo');
  const introLogoImg = document.getElementById('introLogoImg');
  const whiteSlash   = document.getElementById('whiteSlash');
  const triGrid      = document.getElementById('triangleGrid');

  function buildTriangles() {
    // 右上角规律排列的白色三角形阵列（固定 8x8 网格，不依赖运行时尺寸）
    // 越靠近右上角透明度越低，越靠近中间侧越高，最高 60%
    const cols = 8, rows = 8;
    const gridSize = 320;
    const cellW = gridSize / cols, cellH = gridSize / rows;

    for (let i = 0; i < rows; i++) {        // i=0 最靠上(贴近右上角)
      for (let j = 0; j < cols; j++) {      // j 越大越靠右(贴近右上角)
        const tri = document.createElement('div');
        tri.className = 'tri';

        // 距离因子：越靠右上角(远离中心)越透明；越靠中间侧越不透明，封顶 0.60
        const dist = (i / rows) + ((cols - 1 - j) / cols); // 0(右上) → ~2(左下)
        const opacity = Math.min(0.60, 0.06 + dist * 0.32);

        tri.style.left = (j * cellW + cellW * 0.5 - 6) + 'px';
        tri.style.top  = (i * cellH + cellH * 0.5 - 5) + 'px';
        // 方向规律交替（上下朝向不一但井然有序）
        if ((i + j) % 2 === 0) {
          tri.style.transform = 'rotate(180deg)'; // 朝下
        }
        tri.style.setProperty('--op', opacity.toFixed(2));
        triGrid.appendChild(tri);
      }
    }
  }

  function startIntro() {
    buildTriangles();

    // 启动白条动画（CSS animation-delay: 2s）
    whiteSlash.classList.add('run');

    // 白条飞到一半 = 2s + 0.35s = 2.35s → 切换 Logo
    setTimeout(() => {
      introLogoImg.src = 'Logo1.png';   // 同位置切为 Logo1
    }, 2350);

    // 白条飞完（2.7s）后 → 三角形阵列缓慢显示
    setTimeout(() => {
      triGrid.classList.add('show');
    }, 2700);

    // 整体开场约 4.5s 后收尾隐藏（可选保留巨神氛围）
    setTimeout(() => {
      introLayer.classList.add('hide');
    }, 4500);
  }

  // 启动
  window.addEventListener('load', startIntro);

  /* ----------------------------------------------------------
   * 4) （可选）开场楔形进度可视化 —— 复用蓄力算法
   * -------------------------------------------------------- */
  runChargeProgress((v) => {
    // v: 0→1 的蓄力-冲刺进度，可用于驱动其他数值
    // console.log('charge:', (v*100).toFixed(1) + '%');
  });

})();
