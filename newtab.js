const API_KEY = (typeof CONFIG !== 'undefined' && CONFIG.API_KEY) ? CONFIG.API_KEY : '';
const API_URL = 'https://pixabay.com/api/';

const QUERIES = [
  'landscape', 'nature', 'mountain', 'ocean', 'forest',
  'city', 'architecture', 'space', 'sunset', 'flowers'
];
const PER_PAGE = 50;
const MAX_PAGE = 10;
const MIN_HD_WIDTH = 1920;

const QUOTES = [
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "You are never too old to set another goal or to dream a new dream.",
  "It always seems impossible until it's done.",
  "The best way to predict the future is to create it.",
  "Your time is limited, don't waste it living someone else's life.",
  "Dream big and dare to fail.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Happiness depends upon ourselves.",
  "Turn your wounds into wisdom.",
  "Do what you can, with what you have, where you are.",
  "Start where you are. Use what you have. Do what you can.",
  "Every moment is a fresh beginning.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do something today that your future self will thank you for.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Fall seven times, stand up eight.",
  "You don't have to be great to start, but you have to start to be great.",
  "A journey of a thousand miles begins with a single step.",
  "The secret of getting ahead is getting started.",
  "Don't wish it were easier. Wish you were better.",
  "If you can dream it, you can do it.",
  "Act as if what you do makes a difference. It does.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Opportunities don't happen. You create them.",
  "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "It's not whether you get knocked down, it's whether you get up.",
  "Failure is the opportunity to begin again more intelligently.",
  "The best revenge is massive success.",
  "Your life does not get better by chance, it gets better by change.",
  "Pain is temporary. Quitting lasts forever.",
  "We become what we think about.",
  "The only place where success comes before work is in the dictionary.",
  "Don't limit your challenges. Challenge your limits.",
  "Everything you've ever wanted is on the other side of fear.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "Success is walking from failure to failure with no loss of enthusiasm.",
  "If opportunity doesn't knock, build a door.",
  "Work hard in silence, let your success be your noise.",
  "I have not failed. I've just found 10,000 ways that won't work.",
  "Don't let yesterday take up too much of today.",
  "You miss 100% of the shots you don't take.",
  "The only person you are destined to become is the person you decide to be.",
  "Be the change that you wish to see in the world.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "The mind is everything. What you think you become.",
  "An unexamined life is not worth living.",
  "Life is 10% what happens to you and 90% how you react to it.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Whether you think you can or you think you can't, you're right.",
  "The two most important days in your life are the day you are born and the day you find out why.",
  "I am not a product of my circumstances. I am a product of my decisions.",
  "The biggest risk is not taking any risk.",
  "Winners never quit and quitters never win.",
  "Perfection is not attainable, but if we chase perfection we can catch excellence.",
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "If you want to lift yourself up, lift up someone else.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Limit your 'always' and your 'nevers'.",
  "Nothing will work unless you do.",
  "Change your thoughts and you change your world.",
  "In the middle of every difficulty lies opportunity.",
  "Do what you feel in your heart to be right, for you'll be criticized anyway.",
  "Never give up on a dream just because of the time it will take to accomplish it.",
  "The man who moves a mountain begins by carrying away small stones.",
  "He who has a why to live can bear almost any how.",
  "Don't count the days, make the days count.",
  "Courage is resistance to fear, mastery of fear—not absence of fear.",
  "Light tomorrow with today.",
  "A winner is a dreamer who never gives up.",
  "The only thing standing between you and your goal is the story you keep telling yourself.",
  "Make each day your masterpiece.",
  "You can't go back and change the beginning, but you can start where you are and change the ending.",
  "Tough times never last, but tough people do.",
  "Believe in yourself and all that you are.",
  "Strive for progress, not perfection.",
  "The best way out is always through.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Work until your idols become your rivals.",
  "You are the author of your own life story.",
  "Doubt kills more dreams than failure ever will.",
  "If you want to achieve greatness, stop asking for permission.",
  "Success doesn't just find you. You have to go out and get it.",
  "Great things never came from comfort zones.",
  "Stay hungry, stay foolish.",
  "Don't let small minds convince you that your dreams are too big.",
  "Your only limit is you.",
  "When you feel like quitting, think about why you started.",
  "Success is a journey, not a destination.",
  "You become unstoppable when you realize you can do it alone.",
  "Make your life a masterpiece; imagine no limitations on what you can be.",
  "Push yourself, because no one else is going to do it for you.",
  "Don't be afraid to give up the good to go for the great.",
  "The future depends on what you do today.",
  "Stop being afraid of what could go wrong and think of what could go right.",
  "You are enough just as you are.",
  "Everything you can imagine is real.",
  "Let your smile change the world, but don't let the world change your smile."
];

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
const CACHED_KEY = 'snap-start-cached-image';

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
  engineIndicator: document.querySelector('.engine-indicator'),
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  clockTime: document.getElementById('clock-time'),
  clockDate: document.getElementById('clock-date'),
  quote: document.getElementById('quote'),
};

function normalizeImage(hit) {
  return {
    id: hit.id,
    pageURL: hit.pageURL,
    fullHDURL: hit.fullHDURL || '',
    largeImageURL: hit.largeImageURL || hit.webformatURL,
    webformatURL: hit.webformatURL,
    hdURL: hit.fullHDURL || hit.largeImageURL || hit.webformatURL,
    dataURL: '',
    imageWidth: hit.imageWidth || 0,
    imageHeight: hit.imageHeight || 0,
    user: hit.user,
    tags: hit.tags,
  };
}

function getImageUrl(image) {
  return image.dataURL || image.hdURL || image.largeImageURL || image.webformatURL;
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

  els.bg.src = getImageUrl(image);

  els.bg.onload = () => {
    els.bg.classList.add('loaded');
    showImageInfo(image);
  };

  els.bg.onerror = () => {
    showError('图片加载失败，请尝试刷新。');
  };
}

function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
}

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function urlToDataURL(url) {
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error(`请求失败：${response.status}`);
    const blob = await response.blob();
    return await blobToDataURL(blob);
  } catch (err) {
    console.warn('转换为 Data URL 失败：', err);
    return '';
  }
}

function applyImage(image) {
  if (!image) return;
  state.currentImage = image;
  els.infoBar.classList.remove('expanded');
  els.infoToggle.classList.remove('expanded');
  els.bg.src = getImageUrl(image);
  showImageInfo(image);
}

function pickHighResHit(hits) {
  const hd = hits.filter((h) => h.fullHDURL && h.imageWidth >= MIN_HD_WIDTH);
  if (hd.length > 0) return hd[Math.floor(Math.random() * hd.length)];

  const large = hits.filter((h) => h.imageWidth >= MIN_HD_WIDTH);
  if (large.length > 0) return large[Math.floor(Math.random() * large.length)];

  const sorted = [...hits].sort((a, b) => (b.imageWidth || 0) - (a.imageWidth || 0));
  return sorted[0] || hits[0];
}

async function fetchRandomImage(silent = false) {
  if (state.isLoading) return;
  state.isLoading = true;
  if (!silent) setLoading(true);
  hideError();

  try {
    if (!API_KEY) {
      throw new Error('请在 config.js 中配置 Pixabay API Key');
    }

    const query = QUERIES[Math.floor(Math.random() * QUERIES.length)];
    const page = Math.floor(Math.random() * MAX_PAGE) + 1;
    const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}&order=popular`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`请求失败：${response.status}`);

    const data = await response.json();
    if (!data.hits || data.hits.length === 0) throw new Error('未找到图片');

    const hit = pickHighResHit(data.hits);
    const image = normalizeImage(hit);
    const imageUrl = getImageUrl(image);

    await preloadImage(imageUrl);
    const dataURL = await urlToDataURL(imageUrl);
    if (dataURL) {
      image.dataURL = dataURL;
    }

    setCachedImage(image);

    if (!getPinnedImage()) {
      applyImage(image);
    }
  } catch (err) {
    if (!silent) showError(err.message || '无法加载图片');
  } finally {
    state.isLoading = false;
    if (!silent) setLoading(false);
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
  updateEngineIndicator();
}

function updateEngineIndicator() {
  const active = els.searchEngine.querySelector('button.active');
  if (!active || !els.engineIndicator) return;

  const containerRect = els.searchEngine.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  const borderLeft = parseFloat(getComputedStyle(els.searchEngine).borderLeftWidth) || 0;

  const width = activeRect.width;
  const left = activeRect.left - containerRect.left - borderLeft;

  els.engineIndicator.style.width = `${width}px`;
  els.engineIndicator.style.transform = `translateX(${left}px)`;
}

function doSearch(query) {
  const engine = SEARCH_ENGINES[state.currentEngine] || SEARCH_ENGINES.google;
  const url = engine.url + encodeURIComponent(query);
  window.location.href = url;
}

function showRandomQuote() {
  if (!els.quote) return;
  const index = Math.floor(Math.random() * QUOTES.length);
  els.quote.textContent = QUOTES[index];
}

function toggleInfoBar() {
  els.infoBar.classList.toggle('expanded');
  els.infoToggle.classList.toggle('expanded');
}

function getStoredImage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function setStoredImage(key, image) {
  try {
    localStorage.setItem(key, JSON.stringify(image));
  } catch (err) {
    console.warn('保存图片到本地失败（可能超出容量）：', err);
  }
}

function clearStoredImage(key) {
  localStorage.removeItem(key);
}

function getPinnedImage() {
  return getStoredImage(PINNED_KEY);
}

function setPinnedImage(image) {
  setStoredImage(PINNED_KEY, image);
}

function clearPinnedImage() {
  clearStoredImage(PINNED_KEY);
}

function getCachedImage() {
  return getStoredImage(CACHED_KEY);
}

function setCachedImage(image) {
  setStoredImage(CACHED_KEY, image);
}

function updatePinUI() {
  const pinned = getPinnedImage();
  els.pinBtn.classList.toggle('active', !!pinned);
  els.pinBtn.title = pinned ? '取消钉住' : '钉住当前图片';
}

async function togglePin() {
  const pinned = getPinnedImage();
  if (pinned) {
    clearPinnedImage();
  } else if (state.currentImage) {
    let image = state.currentImage;
    if (!image.dataURL) {
      const dataURL = await urlToDataURL(getImageUrl(image));
      if (dataURL) image.dataURL = dataURL;
    }
    setPinnedImage(image);
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

  window.addEventListener('resize', updateEngineIndicator);
}

async function init() {
  bindEvents();
  updateEngineUI();
  updatePinUI();
  startClock();
  showRandomQuote();

  const pinned = getPinnedImage();
  if (pinned) {
    showImage(pinned);
    return;
  }

  const cached = getCachedImage();
  if (cached) {
    showImage(cached);
  }

  await fetchRandomImage(true);
}

init();
