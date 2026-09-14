/* VANTORA MOTORS — core engine
   Smooth scroll (Lenis), GSAP/ScrollTrigger wiring, loader, cursor, navigation,
   reveal utilities, page transitions, forms. Page-specific choreography lives in
   home.js / inventory.js / vehicle.js. */
(function () {
  'use strict';

  const D = document;
  const W = window;
  const reduced = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = W.matchMedia('(pointer: fine)').matches;
  const isMobile = () => W.matchMedia('(max-width: 900px)').matches;

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 1 });

  const VM = (W.VM = { reduced, finePointer, isMobile, lenis: null, ready: false });

  /* ---------- Smooth scroll ---------- */
  if (!reduced && typeof Lenis !== 'undefined') {
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true, syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    VM.lenis = lenis;
    D.documentElement.classList.add('lenis');
  }
  VM.scrollTo = (target, opts) => {
    if (VM.lenis) VM.lenis.scrollTo(target, Object.assign({ offset: -70, duration: 1.4 }, opts || {}));
    else {
      const el = typeof target === 'string' ? D.querySelector(target) : target;
      if (el && el.getBoundingClientRect) W.scrollTo({ top: el.getBoundingClientRect().top + W.scrollY - 70, behavior: 'smooth' });
      else if (typeof target === 'number') W.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  /* ---------- Images: fade in on load ---------- */
  const style = D.createElement('style');
  style.textContent = 'img[data-fade]{opacity:0;transition:opacity .9s ease}img[data-fade].is-loaded{opacity:1}';
  D.head.appendChild(style);
  VM.watchImages = (root) => {
    (root || D).querySelectorAll('img:not([data-fade])').forEach((img) => {
      img.setAttribute('data-fade', '');
      const done = () => img.classList.add('is-loaded');
      if (img.complete && img.naturalWidth > 0) done();
      else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
    });
  };

  /* ---------- Split text ---------- */
  VM.splitWords = (el) => {
    if (el.dataset.splitDone) return el.querySelectorAll('.w');
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = D.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(D.createTextNode(' '));
            else { const s = D.createElement('span'); s.className = 'w'; s.style.display = 'inline-block'; s.textContent = part; frag.appendChild(s); }
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && !n.classList.contains('w')) walk(n);
      });
    };
    walk(el);
    el.dataset.splitDone = '1';
    return el.querySelectorAll('.w');
  };

  /* ---------- Generic reveals ---------- */
  VM.initReveals = (root) => {
    const scope = root || D;
    if (reduced) {
      scope.querySelectorAll('[data-reveal], [data-split]').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
      return;
    }
    scope.querySelectorAll('[data-split]').forEach((el) => {
      if (el.dataset.revealDone) return; el.dataset.revealDone = '1';
      const words = VM.splitWords(el);
      gsap.set(words, { yPercent: 110, opacity: 0, rotateX: -30, transformOrigin: '0 100%' });
      gsap.to(words, { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.1, ease: 'power4.out', stagger: 0.035,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    scope.querySelectorAll('[data-reveal]').forEach((el) => {
      if (el.dataset.revealDone) return; el.dataset.revealDone = '1';
      const delay = parseFloat(el.dataset.reveal) || 0;
      gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    scope.querySelectorAll('.reveal-mask').forEach((el) => {
      if (el.dataset.revealDone) return; el.dataset.revealDone = '1';
      const img = el.querySelector('img');
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      const cover = D.createElement('div');
      cover.style.cssText = 'position:absolute;inset:0;background:#070708;transform-origin:top;z-index:2;pointer-events:none';
      el.appendChild(cover);
      tl.to(cover, { scaleY: 0, duration: 1.4, ease: 'power4.inOut' }, 0);
      if (img) tl.to(img, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0.1);
    });
    scope.querySelectorAll('.rule--draw').forEach((el) => {
      if (el.dataset.revealDone) return; el.dataset.revealDone = '1';
      gsap.to(el, { scaleX: 1, duration: 1.6, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
    scope.querySelectorAll('[data-stagger]').forEach((el) => {
      if (el.dataset.revealDone) return; el.dataset.revealDone = '1';
      const kids = el.children;
      gsap.fromTo(kids, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    scope.querySelectorAll('[data-count]').forEach((el) => {
      if (el.dataset.revealDone) return; el.dataset.revealDone = '1';
      const target = parseFloat(el.dataset.count);
      const dec = (el.dataset.dec || '0') | 0;
      const obj = { v: 0 };
      gsap.to(obj, { v: target, duration: 1.8, ease: 'power3.out',
        onUpdate: () => { el.textContent = obj.v.toLocaleString('en-GB', { minimumFractionDigits: dec, maximumFractionDigits: dec }); },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
  };
  // The .reveal-mask::after pseudo is replaced by the JS overlay above; hide the CSS one.
  const s2 = D.createElement('style');
  s2.textContent = '.reveal-mask::after{display:none}';
  D.head.appendChild(s2);

  /* ---------- Parallax ---------- */
  VM.parallax = () => {
    if (reduced) return;
    D.querySelectorAll('[data-parallax]').forEach((el) => {
      const amt = parseFloat(el.dataset.parallax) || 12;
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  };

  /* ---------- Magnetic ---------- */
  VM.magnetic = () => {
    if (!finePointer || reduced) return;
    D.querySelectorAll('[data-magnetic], .btn').forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' }));
    });
  };

  /* ---------- Cursor ---------- */
  const initCursor = () => {
    if (!finePointer || reduced) return;
    const c = D.createElement('div');
    c.className = 'cursor';
    c.innerHTML = '<div class="cursor__dot"></div><div class="cursor__ring"><span class="cursor__label"></span></div>';
    D.body.appendChild(c);
    D.body.classList.add('has-cursor');
    const label = c.querySelector('.cursor__label');
    const pos = { x: W.innerWidth / 2, y: W.innerHeight / 2 };
    const qx = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3.out' });
    const qy = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3.out' });
    W.addEventListener('mousemove', (e) => { pos.x = e.clientX; pos.y = e.clientY; qx(pos.x); qy(pos.y); c.style.opacity = 1; });
    D.addEventListener('mouseleave', () => (c.style.opacity = 0));
    D.addEventListener('mousedown', () => c.classList.add('is-down'));
    D.addEventListener('mouseup', () => c.classList.remove('is-down'));
    const hoverSel = 'a, button, [data-cursor], input, select, textarea, label';
    D.addEventListener('mouseover', (e) => {
      const t = e.target.closest(hoverSel);
      if (!t) { c.classList.remove('is-active', 'is-label'); label.textContent = ''; return; }
      c.classList.add('is-active');
      const lbl = t.closest('[data-cursor]');
      if (lbl) { label.textContent = lbl.dataset.cursor; c.classList.add('is-label'); }
      else { c.classList.remove('is-label'); label.textContent = ''; }
    });
  };

  /* ---------- Header ---------- */
  const initHeader = () => {
    const header = D.querySelector('.header');
    if (!header) return;
    let last = 0;
    const onScroll = () => {
      const y = W.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      if (!D.body.classList.contains('menu-open')) header.classList.toggle('is-hidden', y > 300 && y > last + 4);
      if (y < last - 4) header.classList.remove('is-hidden');
      last = y;
    };
    W.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    // current link
    const path = location.pathname.split('/').pop() || 'index.html';
    D.querySelectorAll('.nav a').forEach((a) => { const h = a.getAttribute('href'); if (!h.includes('#') && h === path) a.classList.add('is-current'); });
  };

  /* ---------- Fullscreen menu ---------- */
  const initMenu = () => {
    const menu = D.querySelector('.menu');
    const burger = D.querySelector('.burger');
    if (!menu || !burger) return;
    const links = menu.querySelectorAll('.menu__list a');
    const imgs = menu.querySelectorAll('.menu__visual img');
    const cap = menu.querySelector('.menu__caption .h3');
    let open = false;
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.inOut' } });
    tl.set(menu, { visibility: 'visible' })
      .to(menu, { clipPath: 'inset(0 0 0% 0)', duration: 0.9 })
      .fromTo(menu.querySelectorAll('.menu__list a .t'), { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: 0.9, stagger: 0.05, ease: 'power4.out' }, 0.35)
      .fromTo(menu.querySelectorAll('.menu__foot > *'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0.7);
    if ('inert' in menu) menu.inert = true;
    const setImg = (i) => { imgs.forEach((im, k) => im.classList.toggle('is-active', k === i)); if (cap && imgs[i]) cap.textContent = imgs[i].dataset.caption || ''; };
    setImg(0);
    const toggle = (force) => {
      open = typeof force === 'boolean' ? force : !open;
      D.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open);
      menu.setAttribute('aria-hidden', !open);
      if ('inert' in menu) menu.inert = !open;
      if (!open) burger.focus();
      if (open) { VM.lenis && VM.lenis.stop(); D.body.classList.add('no-scroll'); tl.timeScale(1).play(); D.querySelector('.header').classList.remove('is-hidden'); }
      else { VM.lenis && VM.lenis.start(); D.body.classList.remove('no-scroll'); tl.timeScale(1.6).reverse(); }
    };
    burger.addEventListener('click', () => toggle());
    D.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) toggle(false); });
    links.forEach((a, i) => {
      a.addEventListener('mouseenter', () => setImg(Math.min(i, imgs.length - 1)));
      a.addEventListener('focus', () => setImg(Math.min(i, imgs.length - 1)));
    });
    VM.closeMenu = () => open && toggle(false);
  };

  /* ---------- Loader ---------- */
  const initLoader = () => {
    const loader = D.querySelector('.loader');
    const finish = () => {
      D.documentElement.classList.add('loaded');
      VM.ready = true;
      D.dispatchEvent(new CustomEvent('vantora:ready'));
      VM.lenis && VM.lenis.start();
    };
    if (!loader) { finish(); return; }
    let seen = false;
    try { seen = sessionStorage.getItem('vantora-seen') === '1'; sessionStorage.setItem('vantora-seen', '1'); } catch (e) {}
    VM.lenis && VM.lenis.stop();
    W.scrollTo(0, 0);
    if (reduced || seen) {
      gsap.to(loader, { opacity: 0, duration: seen ? 0.5 : 0.01, delay: seen ? 0.25 : 0, onComplete: finish });
      return;
    }
    const letters = loader.querySelectorAll('.loader__word span');
    const count = loader.querySelector('.loader__count b');
    const bar = loader.querySelector('.loader__bar');
    const sub = loader.querySelector('.loader__sub');
    const obj = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => {
      gsap.timeline({ onComplete: finish })
        .to(loader.querySelectorAll('.loader__word, .loader__sub, .loader__gauge, .loader__track, .loader__ticks'), { opacity: 0, y: -10, duration: 0.4, stagger: 0.03, ease: 'power2.in' })
        .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power4.inOut' }, '-=0.15');
    } });
    tl.to(letters, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, stagger: 0.06, ease: 'power3.out' }, 0.1)
      .to(sub, { opacity: 1, duration: 0.7 }, 0.8)
      .to(obj, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => (count.textContent = Math.round(obj.v).toString().padStart(3, '0')) }, 0.15)
      .to(bar, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0.15);
  };

  /* ---------- Page transitions ---------- */
  const initTransitions = () => {
    const veil = D.querySelector('.veil');
    if (!veil || reduced) return;
    D.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank' || /^https?:/.test(href)) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      const [file, hash] = href.split('#');
      const here = location.pathname.split('/').pop() || 'index.html';
      if ((file === '' || file === here) && hash) return; // same-page anchor
      e.preventDefault();
      VM.closeMenu && VM.closeMenu();
      gsap.timeline()
        .set(veil, { transformOrigin: 'bottom' })
        .to(veil, { scaleY: 1, duration: 0.7, ease: 'power4.inOut' })
        .to(veil.querySelector('.veil__logo'), { opacity: 1, duration: 0.3 }, '-=0.2')
        .add(() => { location.href = href; }, '+=0.05');
    });
    W.addEventListener('pageshow', (e) => { if (e.persisted) gsap.set(veil, { scaleY: 0 }); });
  };

  /* ---------- Same-page anchors ---------- */
  const initAnchors = () => {
    D.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href === '#') { e.preventDefault(); return; }
      const [file, hash] = href.split('#');
      const here = location.pathname.split('/').pop() || 'index.html';
      if (hash && (file === '' || file === here)) {
        const target = D.getElementById(hash);
        if (!target) return;
        e.preventDefault();
        VM.closeMenu && VM.closeMenu();
        setTimeout(() => VM.scrollTo(target), VM.closeMenu ? 250 : 0);
      }
    });
    if (location.hash) {
      const target = D.getElementById(location.hash.slice(1));
      if (target) D.addEventListener('vantora:ready', () => setTimeout(() => VM.scrollTo(target, { duration: 1.8 }), 300), { once: true });
    }
  };

  /* ---------- Forms ---------- */
  VM.initForms = (root) => {
    (root || D).querySelectorAll('.form').forEach((form) => {
      form.querySelectorAll('.field').forEach((f) => {
        const input = f.querySelector('input, select, textarea');
        if (!input) return;
        const check = () => f.classList.toggle('is-filled', !!input.value);
        input.addEventListener('input', check); input.addEventListener('change', check); check();
      });
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        const btn = form.querySelector('button[type=submit] span');
        if (btn) btn.textContent = 'Sending';
        setTimeout(() => {
          form.classList.add('is-sent');
          const s = form.querySelector('.form__success');
          if (s && !reduced) gsap.fromTo(s, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
        }, 700);
      });
    });
  };

  /* ---------- Marquee ---------- */
  VM.marquee = () => {
    D.querySelectorAll('.marquee__track').forEach((track) => {
      if (reduced) return;
      const clone = track.innerHTML; track.innerHTML = clone + clone;
      const w = track.scrollWidth / 2;
      gsap.to(track, { x: -w, duration: w / 60, ease: 'none', repeat: -1 });
    });
  };

  /* ---------- Boot ---------- */
  D.addEventListener('DOMContentLoaded', () => {
    VM.watchImages();
    initCursor();
    initHeader();
    initMenu();
    initTransitions();
    initAnchors();
    VM.initForms();
    VM.marquee();
    initLoader();
    D.addEventListener('vantora:ready', () => { VM.initReveals(); VM.parallax(); VM.magnetic(); ScrollTrigger.refresh(); }, { once: true });
    W.addEventListener('load', () => ScrollTrigger.refresh());
    let rt; W.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 200); });
  });
})();
