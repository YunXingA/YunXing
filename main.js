// ============ 搜索逻辑 ============
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// 后续扩展：在这里加关键词和对应回调
const commandMap = {
  // 示例：
  // "hello": () => { console.log("Hello matched!"); },
};

const matchList = [
  // 示例："test", "admin"
];

function compareInput(raw) {
  const val = raw.trim().toLowerCase();
  if (!val) return false;

  // 精确匹配 commandMap
  if (commandMap[val]) {
    commandMap[val]();
    return true;
  }

  // 模糊匹配列表
  if (matchList.some(m => m.toLowerCase() === val)) {
    return true;
  }

  return false;
}

function handleSearch() {
  const val = searchInput.value;
  const matched = compareInput(val);

  if (!matched) {
    searchInput.value = "搜索失败/No text";
  }
  // 匹配成功则保留用户输入内容
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});

// ============ Logo 切换（白条飞到一半 = 0.6s 时） ============
// 白条 animation-delay: 2.0s, duration: 1.2s
// 一半 = 2.0 + 0.6 = 2.6s 后切换
setTimeout(() => {
  const logo = document.getElementById('centerLogo');
  if (logo) {
    logo.src = 'Logo1.png';
  }
}, 2600);
