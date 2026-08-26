/* ============================================================
   VATE // 陨篂 YunXing 个人网址
   风格：黑金 · 巨神科幻 · PC级浏览器对象
   ============================================================ */

/* ============ 全局重置 ============ */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --red:        #c0392b;      /* 主红 */
  --red-soft:   #e57373;      /* 淡红 */
  --red-glow:   rgba(229,115,115,0.55);
  --gold:       #c9a227;      /* 金 */
  --gold-light: #e8c96a;
  --gold-soft:  rgba(201,162,39,0.35);
  --bg-deep:    #050505;
  --bg-panel:   #0c0c0c;
  --text:       #e8ddc4;
  --text-dim:   rgba(232,221,196,0.55);
  /* 沿用旧版 //SDF 青色作为搜索图标/点缀色 */
  --cyan:       #00ffc8;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  font-family: "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif;
  background: var(--bg-deep);
  color: var(--text);
  /* PC 固定视口，移动端强制按设备宽度但渲染 PC 布局 */
  min-width: 1024px;
}

/* ============ 主应用容器（PC 全屏） ============ */
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* 黑金渐变背景（色差柔和） */
  background:
    radial-gradient(ellipse at 20% 0%, rgba(40,28,10,0.55) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(60,42,14,0.45) 0%, transparent 60%),
    linear-gradient(160deg, #0a0a0a 0%, #050505 100%);
}

/* ============================================================
   顶部黑色标题框
   ============================================================ */
.top-bar {
  position: relative;
  flex: 0 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: linear-gradient(90deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%);
  border-bottom: 1px solid rgba(229,115,115,0.28);
  box-shadow: 0 2px 24px rgba(0,0,0,0.6);
  z-index: 20;
  overflow: hidden;
}

/* 顶部黑色与下方微妙的色差感 */
.top-bar::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--red-glow), transparent);
}

/* 左上角淡红斜梯形背景 */
.top-red-wedge {
  position: absolute;
  top: 0; left: 0;
  width: 220px; height: 100%;
  background: linear-gradient(135deg, rgba(229,115,115,0.16) 0%, rgba(229,115,115,0.05) 60%, transparent 100%);
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
  pointer-events: none;
}

/* ============ 角标（红色，四角） ============ */
.corner {
  position: absolute;
  width: 12px; height: 12px;
  border: 2px solid var(--red);
  pointer-events: none;
}
.corner-tl { top: 6px;    left: 6px;    border-right: none; border-bottom: none; }
.corner-tr { top: 6px;    right: 6px;   border-left: none;  border-bottom: none; }
.corner-bl { bottom: 6px; left: 6px;    border-right: none; border-top: none; }
.corner-br { bottom: 6px; right: 6px;   border-left: none;  border-top: none; }

/* ============ 左侧品牌 VATE ============ */
.top-left {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2;
}

.brand {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-name {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 6px;   /* 与 ATLAS 差不多大小间距 */
  color: #fff;
  text-shadow: 0 0 12px rgba(229,115,115,0.5);
}

.brand-sub {
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--red-soft);
  /* 淡红渐变文字 */
  background: linear-gradient(90deg, var(--red-soft), #f0a0a0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ============ 中间搜索框 ============ */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 340px;
  height: 38px;
  padding: 0 14px 0 40px;
  background: rgba(10,10,10,0.85);
  border: 1px solid rgba(229,115,115,0.3);
  border-radius: 2px;
  z-index: 2;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--cyan);   /* 放大镜颜色沿用 //SDF 青色不变 */
  cursor: pointer;
  display: flex;
  z-index: 3;
  transition: opacity .15s;
}
.search-icon:hover { opacity: .8; }

.search-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;           /* 输入内容白色 */
  font-size: 14px;
  letter-spacing: 1px;
  font-family: inherit;
}
.search-input::placeholder { color: rgba(255,255,255,0.35); }

/* 搜索框内高光闪动（淡红色，保留） */
.search-shine {
  position: absolute;
  top: 0; bottom: 0;
  left: -40%;
  width: 40%;
  background: linear-gradient(100deg, transparent, rgba(229,115,115,0.35), transparent);
  transform: skewX(-18deg);
  animation: searchShine 3.2s ease-in-out infinite;
  pointer-events: none;
}
@keyframes searchShine {
  0%, 60% { left: -40%; }
  100%   { left: 120%; }
}

/* ============ 右侧标题 + 状态 ============ */
.top-right {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 2;
}

.site-title {
  font-size: 13px;
  letter-spacing: 1px;
  color: var(--text-dim);
}

.status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  letter-spacing: 2px;
}

/* online 浅红色（与闪烁点同色） */
.status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--red-soft);
  box-shadow: 0 0 8px var(--red-glow);
  animation: pulse 1.6s infinite;
}
.status-text { color: var(--red-soft); }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }

/* ============================================================
   主体内容区
   ============================================================ */
.content {
  position: relative;
  flex: 1 1 auto;
  margin: 18px;
  border: 1px solid rgba(201,162,39,0.25);
  background:
    linear-gradient(135deg, rgba(20,16,8,0.5), rgba(8,8,8,0.5));
  overflow: hidden;
}

/* 动态黑金渐变抛光层 */
.gold-polish {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg,
    transparent 0%,
    rgba(201,162,39,0.06) 35%,
    rgba(232,201,106,0.12) 50%,
    rgba(201,162,39,0.06) 65%,
    transparent 100%);
  background-size: 220% 100%;
  animation: polish 7s ease-in-out infinite;
  pointer-events: none;
}
@keyframes polish {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}

.content-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  text-align: center;
}

.content-inner .label {
  font-size: 12px;
  letter-spacing: 6px;
  color: var(--gold);
}

.content-inner .title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 4px;
  background: linear-gradient(90deg, #e8c96a, #c9a227, #e8c96a);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleShine 5s ease-in-out infinite;
}
@keyframes titleShine { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

.content-inner .subtitle {
  font-size: 13px;
  letter-spacing: 3px;
  color: var(--text-dim);
}

/* ============================================================
   开场动画层（覆盖整屏）
   ============================================================ */
.intro-layer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
  background: var(--bg-deep);
}

/* 中心 Logo */
.intro-logo {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  z-index: 5;
}
.intro-logo img {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 30px rgba(229,115,115,0.45));
}

/* ---------- 左侧淡红色斜梯形背景 ----------
   左半屏约 38% 面积，与黑色低违和衔接
   2.5s 从左侧屏幕外斜切入（缓动/晃动进入感 = 进度条同款曲线）
------------------------------------------- */
.red-wedge {
  position: absolute;
  top: 0; bottom: 0;
  left: -45%;                /* 起始于屏幕左侧之外 */
  width: 55%;                /* 进入后约占左半屏 ~38% 可视 */
  background: linear-gradient(135deg,
    rgba(180,50,45,0.55) 0%,
    rgba(120,30,30,0.30) 55%,
    rgba(60,15,15,0.12) 100%);
  clip-path: polygon(0 0, 100% 0, 78% 100%, 0 100%);
  filter: blur(1.5px);
  /* 同款缓动曲线：前段慢蓄力，后段冲入 */
  animation: wedgeIn 2.5s cubic-bezier(0.55, 0.06, 0.35, 1) forwards;
  z-index: 2;
}
@keyframes wedgeIn {
  0%   { left: -45%; }
  30%  { left: 8%; }          /* 30% 进度仅到约对应位置（慢） */
  100% { left: 0%; }          /* 最终落位 */
}

/* ---------- 右侧白色细斜梯形 ----------
   页面打开 2s 后（wedage 还差 0.5s 结束）触发
   0.7s 从右向左匀速飞过
------------------------------------------- */
.white-slash {
  position: absolute;
  top: -10%;
  right: -20%;
  width: 22%;
  height: 120%;
  background: linear-gradient(100deg,
    transparent 0%,
    rgba(255,255,255,0.95) 45%,
    #fff 55%,
    transparent 100%);
  clip-path: polygon(30% 0, 70% 0, 40% 100%, 0 100%);
  transform: rotate(-8deg);
  opacity: 0;
  z-index: 6;
}
.white-slash.run {
  animation: slashFly 0.7s linear forwards;
  animation-delay: 2s;       /* 2s 后开始 */
}
@keyframes slashFly {
  0%   { right: -20%; opacity: 1; }
  100% { right: 110%; opacity: 1; }   /* 飞出左侧屏幕外 */
}

/* ---------- 右上角白色三角形阵列 ----------
   白条飞过（≈2.7s）后从透明缓慢显示
   越靠近右上角透明度越低，靠近中间侧最高 60%
------------------------------------------- */
.triangle-grid {
  position: absolute;
  top: 40px;
  right: 40px;
  width: 320px;
  height: 320px;
  z-index: 4;
  opacity: 0;
  transition: opacity 1.4s ease;
}
.triangle-grid.show { opacity: 1; }

.tri {
  position: absolute;
  width: 0; height: 0;
  /* 朝向外（放射状），方向不一但有序 */
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 11px solid #fff;
  opacity: 0;
  transition: opacity 1.6s ease;
}
.triangle-grid.show .tri { opacity: var(--op); }

/* ============================================================
   入场后隐藏开场层
   ============================================================ */
.intro-layer.hide { display: none; }

/* 角标统一样式已在 .corner 定义，此处确保内容区角标定位 */
.content .corner { }
