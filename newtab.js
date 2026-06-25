const API_KEY = 'YOUR_PIXABAY_API_KEY'; // Replace with your actual Pixabay API <key></key>
const API_URL = 'https://pixabay.com/api/';

const QUERIES = [
  'landscape', 'nature', 'mountain', 'ocean', 'forest',
  'city', 'architecture', 'space', 'sunset', 'flowers'
];
const PER_PAGE = 50;
const MAX_PAGE = 10;
const MIN_HD_WIDTH = 1920;

const SEARCH_ENGINES = {
  google: { name: 'Google', url: 'https://www.google.com/search?q=' },
  bing: { name: 'Bing', url: 'https://www.bing.com/search?q=' },
  baidu: { name: '百度', url: 'https://www.baidu.com/s?wd=' },
  duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
};

const state = {
  currentImage: null,
  isLoading: false,
  currentEngine: localStorage.getItem('newtab-search-engine') || 'google',
};

const PINNED_KEY = 'snap-start-pinned-image';

const els = {
  bg: document.getElementById('bg'),
  loading: document.getElementById('loading'),
  error: document.getElementById('error'),
  retryBtn: document.getElementById('retry-btn'),
  refreshBtn: document.getElementById('refresh-btn'),
  pinBtn: document.getElementById('pin-btn'),
  infoBar: document.getElementById('info-bar'),
  infoToggle: document.getElementById('info-toggle'),
  infoLink: document.getElementById('info-link'),
  infoUser: document.getElementById('info-user'),
  infoTags: document.getElementById('info-tags'),
  searchEngine: document.getElementById('search-engine'),
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  clockTime: document.getElementById('clock-time'),
  clockDate: document.getElementById('clock-date'),
};

function normalizeImage(hit) {
  return {
    id: hit.id,
    pageURL: hit.pageURL,
    fullHDURL: hit.fullHDURL || '',
    largeImageURL: hit.largeImageURL || hit.webformatURL,
    webformatURL: hit.webformatURL,
    hdURL: hit.fullHDURL || hit.largeImageURL || hit.webformatURL,
    imageWidth: hit.imageWidth || 0,
    imageHeight: hit.imageHeight || 0,
    user: hit.user,
    tags: hit.tags,
  };
}

function setLoading(show) {
  state.isLoading = show;
  els.loading.classList.toggle('hidden', !show);
}

function showError(message) {
  els.error.classList.remove('hidden');
  if (message) {
    els.error.querySelector('p').textContent = message;
  }
}

function hideError() {
  els.error.classList.add('hidden');
}

function renderTags(tagsString) {
  els.infoTags.innerHTML = '';
  if (!tagsString) return;
  const tags = tagsString.split(',').map((t) => t.trim()).filter(Boolean);
  tags.slice(0, 8).forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    els.infoTags.appendChild(span);
  });
}

function showImageInfo(image) {
  els.infoLink.href = image.pageURL || '#';
  const res = image.imageWidth ? ` · ${image.imageWidth}×${image.imageHeight}` : '';
  els.infoUser.textContent = image.user ? `摄影师：${image.user}${res}` : '';
  renderTags(image.tags);
  els.infoBar.classList.remove('hidden');
}

function showImage(image) {
  if (!image) return;
  hideError();
  state.currentImage = image;
  els.bg.classList.remove('loaded');
  els.infoBar.classList.remove('expanded');
  els.infoToggle.classList.remove('expanded');

  const url = image.hdURL || image.largeImageURL || image.webformatURL;
  els.bg.src = url;

  els.bg.onload = () => {
    els.bg.classList.add('loaded');
    showImageInfo(image);
  };

  els.bg.onerror = () => {
    showError('图片加载失败，请尝试刷新。');
  };
}

function pickHighResHit(hits) {
  const hd = hits.filter((h) => h.fullHDURL && h.imageWidth >= MIN_HD_WIDTH);
  if (hd.length > 0) return hd[Math.floor(Math.random() * hd.length)];

  const large = hits.filter((h) => h.imageWidth >= MIN_HD_WIDTH);
  if (large.length > 0) return large[Math.floor(Math.random() * large.length)];

  const sorted = [...hits].sort((a, b) => (b.imageWidth || 0) - (a.imageWidth || 0));
  return sorted[0] || hits[0];
}

async function fetchRandomImage() {
  if (state.isLoading) return;
  setLoading(true);
  hideError();

  try {
    const query = QUERIES[Math.floor(Math.random() * QUERIES.length)];
    const page = Math.floor(Math.random() * MAX_PAGE) + 1;
    const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}&order=popular`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`请求失败：${response.status}`);

    const data = await response.json();
    if (!data.hits || data.hits.length === 0) throw new Error('未找到图片');

    const hit = pickHighResHit(data.hits);
    showImage(normalizeImage(hit));
  } catch (err) {
    showError(err.message || '无法加载图片');
  } finally {
    setLoading(false);
  }
}

function setEngine(engineKey) {
  if (!SEARCH_ENGINES[engineKey]) return;
  state.currentEngine = engineKey;
  localStorage.setItem('newtab-search-engine', engineKey);
  updateEngineUI();
}

function updateEngineUI() {
  Array.from(els.searchEngine.children).forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.engine === state.currentEngine);
  });
}

function doSearch(query) {
  const engine = SEARCH_ENGINES[state.currentEngine] || SEARCH_ENGINES.google;
  const url = engine.url + encodeURIComponent(query);
  window.location.href = url;
}

function toggleInfoBar() {
  els.infoBar.classList.toggle('expanded');
  els.infoToggle.classList.toggle('expanded');
}

function getPinnedImage() {
  try {
    return JSON.parse(localStorage.getItem(PINNED_KEY));
  } catch {
    return null;
  }
}

function setPinnedImage(image) {
  localStorage.setItem(PINNED_KEY, JSON.stringify(image));
}

function clearPinnedImage() {
  localStorage.removeItem(PINNED_KEY);
}

function updatePinUI() {
  const pinned = getPinnedImage();
  els.pinBtn.classList.toggle('active', !!pinned);
  els.pinBtn.title = pinned ? '取消钉住' : '钉住当前图片';
}

function togglePin() {
  const pinned = getPinnedImage();
  if (pinned) {
    clearPinnedImage();
  } else if (state.currentImage) {
    setPinnedImage(state.currentImage);
  }
  updatePinUI();
}

function refreshImage() {
  if (getPinnedImage()) return;
  fetchRandomImage();
}

function updateClock() {
  const now = new Date();
  const timeStr = [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0')
  ].join('');

  const digits = els.clockTime.querySelectorAll('.flip-digit');
  digits.forEach((digit, index) => {
    const newVal = timeStr[index];
    if (digit.textContent === newVal) return;

    digit.classList.remove('flip');
    void digit.offsetWidth;
    digit.classList.add('flip');

    setTimeout(() => {
      digit.textContent = newVal;
    }, 225);

    setTimeout(() => {
      digit.classList.remove('flip');
    }, 460);
  });

  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const weekday = weekdays[now.getDay()];
  const month = now.getMonth() + 1;
  const date = now.getDate();
  els.clockDate.textContent = `${weekday} ${month}月${date}日`;
}

function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function bindEvents() {
  els.refreshBtn.addEventListener('click', refreshImage);
  els.retryBtn.addEventListener('click', fetchRandomImage);
  els.pinBtn.addEventListener('click', togglePin);
  els.infoToggle.addEventListener('click', toggleInfoBar);

  els.searchEngine.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      setEngine(e.target.dataset.engine);
    }
  });

  els.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = els.searchInput.value.trim();
    if (query) doSearch(query);
  });
}

async function init() {
  bindEvents();
  updateEngineUI();
  updatePinUI();
  startClock();

  const pinned = getPinnedImage();
  if (pinned) {
    showImage(pinned);
  } else {
    await fetchRandomImage();
  }
}

init();
