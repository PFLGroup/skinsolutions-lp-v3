/* =========================================================================
   Skin Solutions — landing v2 (LUXE) — interakcje + ochrona (vanilla JS)
   Zero zależności. ES2017+. Passive listeners + rAF throttle + IO.
   prefers-reduced-motion respektowany. Defensywnie: if(!el)return.
   ========================================================================= */
(function () {
  'use strict';

  /* --- Anti-rehost: uruchom JAK NAJWCZEŚNIEJ --------------------------- */
  (function antiRehost() {
    var h = location.hostname;
    var ok = (h === '' || h === 'localhost' || h === '127.0.0.1' || h.endsWith('github.io'));
    if (!ok) { location.replace('https://www.pflgroup.pl'); }
  })();

  var prefersReducedMotion = (function () {
    try {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  })();

  /* ====================================================================
     1. Mobile nav
     ==================================================================== */
  function initMobileNav() {
    var toggle = document.querySelector('.js-nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    var body = document.body;

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    function openNav() {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Zamknij menu');
      body.classList.add('nav-open');
    }

    function closeNav(returnFocus) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Otwórz menu');
      body.classList.remove('nav-open');
      if (returnFocus) {
        try { toggle.focus(); } catch (e) {}
      }
    }

    toggle.addEventListener('click', function () {
      if (isOpen()) {
        closeNav(false);
      } else {
        openNav();
        // przenieś focus do pierwszego linku menu
        var firstLink = nav.querySelector('a');
        if (firstLink) {
          try { firstLink.focus(); } catch (e) {}
        }
      }
    });

    // zamknij po kliknięciu linku w menu
    nav.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a') : null;
      if (link && isOpen()) {
        closeNav(false);
      }
    });

    // Esc zamyka menu (i przywraca focus na toggle)
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && isOpen()) {
        closeNav(true);
      }
    });
  }

  /* ====================================================================
     2. Sticky header
     ==================================================================== */
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var ticking = false;

    function update() {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // stan początkowy
  }

  /* ====================================================================
     3. Smooth scroll (offset = wysokość headera)
     ==================================================================== */
  function initSmoothScroll() {
    var header = document.querySelector('.site-header');

    function headerOffset() {
      return header ? header.getBoundingClientRect().height : 0;
    }

    document.addEventListener('click', function (e) {
      var anchor = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!anchor) return;

      var href = anchor.getAttribute('href');
      if (!href || href === '#' || href.charAt(0) !== '#') return;

      // tylko czyste kotwice wewnętrzne (np. "#oferta")
      var id = href.slice(1);
      if (!id) return;

      var target = document.getElementById(id);
      if (!target) return; // nie psuj — pozwól domyślnemu zachowaniu

      e.preventDefault();

      var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset() - 8;
      if (top < 0) top = 0;

      window.scrollTo({
        top: top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      // przenieś focus do sekcji (dostępność)
      var hadTabindex = target.hasAttribute('tabindex');
      if (!hadTabindex) {
        target.setAttribute('tabindex', '-1');
      }
      try { target.focus({ preventScroll: true }); } catch (err) {
        try { target.focus(); } catch (e2) {}
      }
      if (!hadTabindex) {
        target.addEventListener('blur', function onBlur() {
          target.removeAttribute('tabindex');
          target.removeEventListener('blur', onBlur);
        });
      }
    });
  }

  /* ====================================================================
     4. Scroll-reveal (IntersectionObserver)
     ==================================================================== */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    var i;

    function revealAll() {
      for (i = 0; i < items.length; i++) {
        items[i].classList.add('is-visible');
      }
    }

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealAll();
      return;
    }

    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    for (i = 0; i < items.length; i++) {
      io.observe(items[i]);
    }
  }

  /* ====================================================================
     5. Licznik 0 -> data-target (easeOut, ~1.6s)
     ==================================================================== */
  function initCounters() {
    var counters = document.querySelectorAll('.counter[data-target]');
    if (!counters.length) return;

    function format(n) {
      // bez separatorów dla zgodności z designem (1000)
      return String(n);
    }

    function animate(el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      if (prefersReducedMotion) {
        el.textContent = format(target);
        return;
      }

      var duration = 1600;
      var start = null;

      function step(ts) {
        if (start === null) start = ts;
        var elapsed = ts - start;
        var t = Math.min(elapsed / duration, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - t, 3);
        var value = Math.round(eased * target);
        el.textContent = format(value);
        if (t < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = format(target);
        }
      }

      window.requestAnimationFrame(step);
    }

    if (typeof IntersectionObserver === 'undefined') {
      // brak IO — animuj od razu (lub od razu target)
      counters.forEach(function (el) { animate(el); });
      return;
    }

    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { io.observe(el); });
  }

  /* ====================================================================
     6. Rok — DWA różne hooki: #year ORAZ .js-year
     ==================================================================== */
  function initYear() {
    var year = String(new Date().getFullYear());

    var byId = document.getElementById('year');
    if (byId) byId.textContent = year;

    var byClass = document.querySelectorAll('.js-year');
    for (var i = 0; i < byClass.length; i++) {
      byClass[i].textContent = year;
    }
  }

  /* ====================================================================
     7. FAQ akordeon (single-open)
     ==================================================================== */
  function initFaq() {
    var buttons = document.querySelectorAll('.faq__q');
    if (!buttons.length) return;

    function close(btn) {
      btn.setAttribute('aria-expanded', 'false');
      var item = btn.closest ? btn.closest('.faq__item') : null;
      if (item) item.classList.remove('is-open');
    }

    function open(btn) {
      btn.setAttribute('aria-expanded', 'true');
      var item = btn.closest ? btn.closest('.faq__item') : null;
      if (item) item.classList.add('is-open');
    }

    for (var i = 0; i < buttons.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var expanded = btn.getAttribute('aria-expanded') === 'true';
          if (expanded) {
            close(btn);
          } else {
            // single-open: zamknij pozostałe
            for (var j = 0; j < buttons.length; j++) {
              if (buttons[j] !== btn) close(buttons[j]);
            }
            open(btn);
          }
        });
      })(buttons[i]);
    }
    // Klawiatura: button natywny obsługuje Enter/Space przez 'click' — nic dodatkowo.
  }

  /* ====================================================================
     8. Sticky mobile CTA (po przewinięciu hero)
     ==================================================================== */
  function initMobileCta() {
    var cta = document.querySelector('.mobile-cta');
    if (!cta) return;

    var hero = document.querySelector('.hero');
    var ticking = false;

    function threshold() {
      if (hero) {
        var h = hero.getBoundingClientRect().height;
        if (h > 0) return h * 0.8;
      }
      return 600;
    }

    function update() {
      if (window.scrollY > threshold()) {
        cta.classList.add('is-visible');
      } else {
        cta.classList.remove('is-visible');
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  }

  /* ====================================================================
     9. Formularz — walidacja klienta (mailto fallback)
     ==================================================================== */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var nameEl = document.getElementById('cf-name');
    var emailEl = document.getElementById('cf-email');
    var consentEl = document.getElementById('cf-consent');

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // region aria-live na komunikaty
    var live = document.createElement('p');
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('role', 'status');
    live.className = 'form-error';
    live.style.margin = '0 0 1rem';
    live.style.minHeight = '1px';
    live.style.color = '#E4C98C';
    live.style.fontSize = '.88rem';
    form.insertBefore(live, form.firstChild);

    function setMessage(msg) {
      live.textContent = msg || '';
    }

    function validate() {
      var firstInvalid = null;
      var msgs = [];

      if (nameEl && !nameEl.value.trim()) {
        if (!firstInvalid) firstInvalid = nameEl;
        msgs.push('Podaj imię i nazwisko.');
      }
      if (emailEl && !EMAIL_RE.test(emailEl.value.trim())) {
        if (!firstInvalid) firstInvalid = emailEl;
        msgs.push('Podaj poprawny adres e-mail.');
      }
      if (consentEl && !consentEl.checked) {
        if (!firstInvalid) firstInvalid = consentEl;
        msgs.push('Zaznacz zgodę na kontakt.');
      }

      return { firstInvalid: firstInvalid, msgs: msgs };
    }

    form.addEventListener('submit', function (e) {
      var result = validate();
      if (result.firstInvalid) {
        e.preventDefault();
        setMessage(result.msgs.join(' '));
        try {
          result.firstInvalid.setAttribute('aria-invalid', 'true');
          result.firstInvalid.focus();
        } catch (err) {}
      } else {
        setMessage('');
        // walidacja OK — pozwól natywnemu mailto: zadziałać (bez preventDefault)
      }
    });

    // czyść błąd przy edycji pól
    [nameEl, emailEl, consentEl].forEach(function (el) {
      if (!el) return;
      var evt = (el.type === 'checkbox') ? 'change' : 'input';
      el.addEventListener(evt, function () {
        el.removeAttribute('aria-invalid');
        if (live.textContent) setMessage('');
      });
    });
  }

  /* ====================================================================
     PROTECT — anti-copy (deterrenty). NIE łamie pól/CTA/nav/a11y.
     ==================================================================== */
  function protect() {
    function inEditable(target) {
      if (!target) return false;
      var tag = (target.tagName || '').toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
      if (target.isContentEditable) return true;
      if (target.closest && target.closest('input, textarea, [contenteditable], [contenteditable="true"]')) return true;
      return false;
    }

    // menu kontekstowe
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    // copy / cut — poza polami formularza
    function blockClipboard(e) {
      if (inEditable(e.target)) return; // formularz musi działać
      e.preventDefault();
    }
    document.addEventListener('copy', blockClipboard);
    document.addEventListener('cut', blockClipboard);

    // przeciąganie obrazów
    document.addEventListener('dragstart', function (e) {
      var t = e.target;
      if (t && (t.tagName || '').toUpperCase() === 'IMG') {
        e.preventDefault();
      }
    });

    // skróty devtools / view-source / save (best-effort deterrent)
    document.addEventListener('keydown', function (e) {
      var key = (e.key || '').toLowerCase();
      var ctrlOrCmd = e.ctrlKey || e.metaKey;

      // F12
      if (key === 'f12') {
        e.preventDefault();
        return;
      }
      // Ctrl/Cmd+Shift+I / J / C
      if (ctrlOrCmd && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
        e.preventDefault();
        return;
      }
      // Ctrl/Cmd+U (view-source) — NIE blokuj zwykłego wpisywania w polach
      if (ctrlOrCmd && !e.shiftKey && !e.altKey && key === 'u' && !inEditable(e.target)) {
        e.preventDefault();
        return;
      }
      // Ctrl/Cmd+S (save) — best-effort
      if (ctrlOrCmd && !e.shiftKey && !e.altKey && key === 's' && !inEditable(e.target)) {
        e.preventDefault();
        return;
      }
    });
  }

  /* ====================================================================
     Bootstrap
     ==================================================================== */
  function init() {
    protect();
    initMobileNav();
    initStickyHeader();
    initSmoothScroll();
    initReveal();
    initCounters();
    initYear();
    initFaq();
    initMobileCta();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
