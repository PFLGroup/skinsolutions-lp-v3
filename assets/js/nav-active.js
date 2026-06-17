/* Scrollspy — podświetla w menu link aktualnie oglądanej sekcji (.is-active + aria-current).
   Osobny moduł (NIE rusza main.js/protect()). Vanilla, defensywny, respektuje brak IO. */
(function () {
  'use strict';
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var nav = document.getElementById('primary-nav');
    if (!nav || !('IntersectionObserver' in window)) return;

    var links = Array.prototype.slice.call(
      nav.querySelectorAll('li:not(.nav__cta) a[href^="#"]')
    );
    if (!links.length) return;

    var map = {};
    var sections = [];
    links.forEach(function (a) {
      var id = (a.getAttribute('href') || '').slice(1);
      if (!id) return;
      var sec = document.getElementById(id);
      if (sec) { map[id] = a; sections.push(sec); }
    });
    if (!sections.length) return;

    var current = null;
    function setActive(a) {
      if (a === current) return;
      links.forEach(function (l) {
        l.classList.remove('is-active');
        l.removeAttribute('aria-current');
      });
      if (a) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'true');
      }
      current = a;
    }

    // Śledzi sekcję będącą w środkowym pasie viewportu.
    var visible = {};
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        visible[e.target.id] = e.isIntersecting;
      });
      // Wybierz pierwszą widoczną sekcję w kolejności dokumentu.
      for (var i = 0; i < sections.length; i++) {
        if (visible[sections[i].id]) { setActive(map[sections[i].id]); return; }
      }
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { obs.observe(s); });
  });
})();
