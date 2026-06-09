(function () {
  const SUPPORTED = ['en', 'pl', 'uk'];
  const STORAGE_KEY = 'cv_lang';
  let translations = {};
  let currentLang = 'en';
  let pendingReq = 0;

  function detectLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;

    const navLang = (navigator.language || '').slice(0, 2);
    if (SUPPORTED.includes(navLang)) return navLang;

    return 'en';
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    translatePage();
    updateSwitcher();
  }

  async function translatePage() {
    const req = ++pendingReq;
    let data;
    try {
      const resp = await fetch('/lang/' + currentLang + '.json?t=' + Date.now());
      data = await resp.json();
    } catch {
      if (currentLang !== 'en') {
        currentLang = 'en';
        document.documentElement.lang = 'en';
        localStorage.setItem(STORAGE_KEY, 'en');
        return translatePage();
      }
      return;
    }

    if (req !== pendingReq) return;

    translations = data;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = translations[key];
      if (text !== undefined) {
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });
  }

  function updateSwitcher() {
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const lang = btn.getAttribute('data-lang-btn');
      btn.classList.toggle('text-aws-accent', lang === currentLang);
      btn.classList.toggle('font-black', lang === currentLang);
      btn.classList.toggle('text-aws-muted', lang !== currentLang);
      btn.classList.toggle('font-bold', lang !== currentLang);
    });
  }

  function initSwitcher() {
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang-btn');
        if (lang !== currentLang) setLang(lang);
      });
    });
  }

  currentLang = detectLang();
  document.documentElement.lang = currentLang;
  updateSwitcher();
  initSwitcher();
  translatePage();
})();
