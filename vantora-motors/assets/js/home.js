/* VANTORA MOTORS — homepage choreography */
(function () {
  'use strict';
  const D = document, W = window;
  const { VEHICLES, COLLECTIONS, U, fmtPrice, fmtMiles } = W.VANTORA;
  const reduced = VM.reduced;
  const mobile = VM.isMobile();

  /* ---------- Hero ---------- */
  const hero = D.querySelector('.hero');
  const near = hero.querySelector('.hero__layer--near');
  const far = hero.querySelector('.hero__layer--far');
  const light = hero.querySelector('.hero__light');
  const title = hero.querySelector('.hero__title');
  const lines = hero.querySelectorAll('.split-line > span');
  const heroBits = hero.querySelectorAll('[data-hero]');
  const content = hero.querySelector('.hero__content');

  if (!reduced) {
    gsap.set(heroBits, { opacity: 0, y: 24 });
    gsap.set(light, { '--lx': '15%', '--ly': '70%', opacity: 1 });
    gsap.set(far, { opacity: 0 });
    gsap.set(hero.querySelector('.hero__scroll'), { opacity: 0 });
  }

  let introTl = null;
  const intro = () => {
    if (reduced) { gsap.set(heroBits, { opacity: 1, y: 0 }); gsap.set(lines, { yPercent: 0, y: 0 }); gsap.set(light, { opacity: 0 }); gsap.set(far, { opacity: 1 }); return; }
    const tl = (introTl = gsap.timeline({ defaults: { ease: 'power3.out' } }));
    // light sweeps across the body of the car, revealing it in parts
    tl.to(light, { '--lx': '48%', '--ly': '45%', duration: 1.8, ease: 'power2.inOut' }, 0)
      .to(light, { '--lx': '78%', '--ly': '40%', duration: 1.6, ease: 'power2.inOut' }, 1.3)
      .to(light, { opacity: 0.35, duration: 1.4, ease: 'power2.inOut' }, 2.0)
      .fromTo(near, { scale: 1.5 }, { scale: 1.35, duration: 3.6, ease: 'power2.out' }, 0)
      .fromTo(lines, { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: 1.4, stagger: 0.14, ease: 'power4.out' }, 0.9)
      .to(heroBits, { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, 1.5)
      .to(hero.querySelector('.hero__scroll'), { opacity: 1, duration: 1 }, 2.4);
  };

  const heroScroll = () => {
    if (reduced) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: mobile ? '+=120%' : '+=170%', pin: true, scrub: 0.6, anticipatePin: 1,
      onUpdate: (self) => { if (self.progress > 0.02 && introTl && introTl.isActive()) introTl.progress(1); } } });
    tl.fromTo(near, { scale: 1.35 }, { scale: 1, xPercent: -4, duration: 1, ease: 'none', immediateRender: false }, 0)
      .to(light, { opacity: 0, duration: 0.5, ease: 'none' }, 0)
      .to(far, { opacity: 1, duration: 0.5, ease: 'none' }, 0.35)
      .fromTo(far, { scale: 1.18 }, { scale: 1, duration: 1, ease: 'none' }, 0)
      .to(near, { opacity: 0, duration: 0.35, ease: 'none' }, 0.55)
      .to(title, { z: 260, y: -60, opacity: 0, duration: 0.55, ease: 'power1.in' }, 0.15)
      .to(hero.querySelector('.hero__meta'), { y: 80, opacity: 0, duration: 0.45, ease: 'power1.in' }, 0.1)
      .to(hero.querySelectorAll('.hero__scroll, .hero__coords, .hero__ring'), { opacity: 0, duration: 0.2 }, 0.05)
      .to(far, { scale: 0.92, filter: 'brightness(0.35)', duration: 0.4, ease: 'none' }, 0.7);
  };

  /* ---------- Showroom: Velocity Reveal ---------- */
  const buildShowroom = () => {
    const featured = VEHICLES.filter((v) => v.featured);
    const wrapEl = D.querySelector('.showroom__slides');
    D.querySelector('.showroom__total').textContent = String(featured.length).padStart(2, '0');
    featured.forEach((v, i) => {
      const s = D.createElement('article');
      s.className = 'showroom__slide' + (i === 0 ? ' is-active' : '');
      s.innerHTML = `
        <div class="showroom__visual"><img src="${U(v.photos.hero, 2000)}" alt="${v.make} ${v.model}" loading="${i === 0 ? 'eager' : 'lazy'}"><div class="showroom__sweep"></div><div class="showroom__shade"></div></div>
        <div class="annot annot--1"><div class="annot__line"></div><span class="annot__k">Power</span><span class="annot__v">${v.power}<small>PS</small></span></div>
        <div class="annot annot--2"><div class="annot__line"></div><span class="annot__k">0–100 km/h</span><span class="annot__v">${v.accel.toFixed(1)}<small>s</small></span></div>
        <div class="annot annot--3"><div class="annot__line"></div><span class="annot__k">Top speed</span><span class="annot__v">${v.topSpeed}<small>km/h</small></span></div>
        <div class="annot annot--4"><div class="annot__line"></div><span class="annot__k">Engine</span><span class="annot__v" style="font-size:clamp(16px,1.5vw,22px)">${v.engineShort}</span></div>
        <div class="showroom__text">
          <h3 class="showroom__title"><em>${v.make}</em>${v.model}</h3>
          <p class="showroom__desc body">${v.description}</p>
          <div class="showroom__actions"><a class="btn" href="vehicle.html?id=${v.id}" data-cursor="View"><span>View vehicle</span></a><span class="showroom__price">${fmtPrice(v)} · ${v.year} · ${fmtMiles(v.mileage)}</span></div>
        </div>`;
      wrapEl.appendChild(s);
    });
    VM.watchImages(wrapEl);

    const slides = wrapEl.querySelectorAll('.showroom__slide');
    const index = D.querySelector('.showroom__index b');
    const prog = D.querySelector('.showroom__progress i');

    if (mobile || reduced) {
      // Stacked cinematic cards with reveal on enter
      slides.forEach((s) => {
        gsap.set(s, { opacity: 1 });
        if (reduced) return;
        const img = s.querySelector('img');
        const tl = gsap.timeline({ scrollTrigger: { trigger: s, start: 'top 75%', once: true } });
        tl.fromTo(img, { scale: 1.25, filter: 'blur(18px) brightness(0.3)' }, { scale: 1, filter: 'blur(0px) brightness(1)', duration: 1.6, ease: 'power3.out' })
          .fromTo(s.querySelector('.showroom__sweep'), { xPercent: -120, x: 0 }, { xPercent: 120, duration: 1.4, ease: 'power2.inOut' }, 0.2)
          .fromTo(s.querySelectorAll('.showroom__text > *'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.5);
      });
      return;
    }

    const n = slides.length;
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: '.showroom', start: 'top top', end: `+=${n * 110}%`, pin: '.showroom__pin', scrub: 0.8, anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const cur = Math.min(n - 1, Math.floor(p * n + 0.0001));
          index.textContent = String(cur + 1).padStart(2, '0');
          prog.style.transform = `scaleX(${p})`;
          slides.forEach((s, i) => s.classList.toggle('is-active', i === cur));
        }
      }
    });
    slides.forEach((s, i) => {
      const img = s.querySelector('img');
      const sweep = s.querySelector('.showroom__sweep');
      const text = s.querySelectorAll('.showroom__text > *');
      const annots = s.querySelectorAll('.annot');
      const at = i * 10;
      gsap.set(s, { opacity: i === 0 ? 1 : 0 });
      gsap.set(img, { scale: 1.3, xPercent: 9, filter: 'blur(22px) brightness(0.25)' });
      if (i > 0) master.to(s, { opacity: 1, duration: 0.8, ease: 'none' }, at);
      master.to(img, { scale: 1, xPercent: 0, filter: 'blur(0px) brightness(1)', duration: 3.2, ease: 'power2.out' }, at)
        .fromTo(sweep, { xPercent: -120, x: 0 }, { xPercent: 120, duration: 2.6, ease: 'power1.inOut' }, at + 0.6)
        .fromTo(text, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.6, stagger: 0.25, ease: 'power3.out' }, at + 1.6);
      annots.forEach((a, k) => {
        master.to(a.querySelector('.annot__line'), { scaleX: 1, duration: 1, ease: 'power3.out' }, at + 2.2 + k * 0.35)
          .to(a.querySelectorAll('.annot__k, .annot__v'), { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, at + 2.7 + k * 0.35);
      });
      // hold, then exit (except the last slide, which stays for the hand-off)
      if (i < n - 1) {
        master.to(img, { xPercent: -7, scale: 1.06, filter: 'blur(14px) brightness(0.2)', duration: 2, ease: 'power2.in' }, at + 8.2)
          .to([text, annots], { opacity: 0, y: -20, duration: 1.2, ease: 'power2.in' }, at + 8.2)
          .to(s, { opacity: 0, duration: 0.8, ease: 'none' }, at + 9.4);
      } else {
        master.to({}, { duration: 2 }, at + 8.2);
      }
    });
  };

  /* ---------- Arrivals ---------- */
  const buildArrivals = () => {
    const track = D.querySelector('.arrivals__track');
    const recent = VEHICLES.filter((v) => v.tags.includes('recent')).concat(VEHICLES.filter((v) => !v.tags.includes('recent'))).slice(0, 6);
    const shapes = ['arrival--tall', '', 'arrival--wide', 'arrival--tall', '', 'arrival--wide'];
    recent.forEach((v, i) => {
      const a = D.createElement('a');
      a.className = 'arrival ' + shapes[i % shapes.length];
      a.href = `vehicle.html?id=${v.id}`;
      a.setAttribute('data-cursor', 'View');
      a.innerHTML = `
        <div class="arrival__img"><img src="${U(v.photos.card, 1000)}" alt="${v.make} ${v.model}" loading="lazy">${v.tags.includes('recent') ? '<span class="arrival__tag">Just arrived</span>' : ''}
          <div class="arrival__meta"><h3 class="arrival__name"><small>${v.make} · ${v.year}</small>${v.model}</h3><span class="arrival__price">${fmtPrice(v)}</span></div></div>
        <div class="arrival__specs"><span><b>${v.power}</b> PS</span><span><b>${v.accel.toFixed(1)}</b>s 0–100</span><span><b>${v.mileage.toLocaleString('en-GB')}</b> mi</span></div>`;
      track.appendChild(a);
    });
    const end = D.createElement('div');
    end.className = 'arrivals__end';
    end.innerHTML = `<a href="inventory.html" data-cursor="Open"><div class="ring"><svg width="18" height="18" viewBox="0 0 16 16"><path d="M2 8h11M9 3l5 5-5 5" stroke="currentColor" fill="none" stroke-width="1.3"/></svg></div><span class="mono" style="color:var(--text)">Full inventory<br>${VEHICLES.length} vehicles</span></a>`;
    track.appendChild(end);
    VM.watchImages(track);

    const bar = D.querySelector('.arrivals__bar .track i');
    const pct = D.querySelector('.arrivals__pct');
    const setBar = (p) => { bar.style.transform = `translateX(${p * (bar.parentElement.offsetWidth - bar.offsetWidth)}px)`; pct.textContent = String(Math.round(p * 100)).padStart(2, '0') + '%'; };

    if (mobile || reduced) {
      track.addEventListener('scroll', () => setBar(track.scrollLeft / (track.scrollWidth - track.clientWidth)), { passive: true });
      return;
    }
    const section = D.querySelector('.arrivals');
    const getDist = () => track.scrollWidth - W.innerWidth;
    gsap.to(track, {
      x: () => -getDist(), ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${getDist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (s) => setBar(s.progress) }
    });
  };

  /* ---------- Collections ---------- */
  const buildCollections = () => {
    const list = D.querySelector('.collections__list');
    const vis = D.querySelector('.collections__visual');
    const cap = D.querySelector('.collections__cap');
    COLLECTIONS.forEach((c, i) => {
      const count = c.id === 'recent' ? VEHICLES.filter((v) => v.tags.includes('recent')).length : VEHICLES.filter((v) => v.category.includes(c.id)).length;
      const a = D.createElement('a');
      a.className = 'collection' + (i === 0 ? ' is-hover' : '');
      a.href = `inventory.html?c=${c.id}`;
      a.innerHTML = `<span class="i">0${i + 1}</span><span class="n">${c.name}</span><span class="c"><b>${count} vehicle${count === 1 ? '' : 's'}</b>${c.note}</span>`;
      list.appendChild(a);
      const img = D.createElement('img');
      img.src = U(c.photo, 1200); img.alt = ''; img.loading = 'lazy';
      if (i === 0) img.classList.add('is-active');
      vis.insertBefore(img, vis.firstChild);
      const activate = () => {
        list.querySelectorAll('.collection').forEach((x) => x.classList.toggle('is-hover', x === a));
        vis.querySelectorAll('img').forEach((im) => im.classList.toggle('is-active', im === img));
        cap.textContent = c.name;
      };
      a.addEventListener('mouseenter', activate);
      a.addEventListener('focus', activate);
    });
    VM.watchImages(vis);
    if (!reduced) gsap.fromTo(list.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, scrollTrigger: { trigger: list, start: 'top 85%', once: true } });
  };

  /* ---------- Statement (scrub word opacity) ---------- */
  const statement = () => {
    const el = D.querySelector('[data-statement]');
    if (!el) return;
    const words = VM.splitWords(el);
    if (reduced) { words.forEach((w) => (w.style.opacity = 1)); return; }
    gsap.to(words, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
  };

  /* ---------- Sourcing steps ---------- */
  const sourcing = () => {
    const steps = D.querySelectorAll('.step');
    const imgs = D.querySelectorAll('.sourcing__visual img');
    const rail = D.querySelector('.steps__rail i');
    steps.forEach((s, i) => {
      ScrollTrigger.create({ trigger: s, start: 'top 60%', end: 'bottom 60%',
        onToggle: (self) => { if (self.isActive) { steps.forEach((x) => x.classList.toggle('is-active', x === s)); imgs.forEach((im, k) => im.classList.toggle('is-active', k === i)); } } });
    });
    if (!reduced) gsap.to(rail, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 60%', end: 'bottom 60%', scrub: true } });
    else rail.style.transform = 'none';
  };

  /* ---------- Testimonials ---------- */
  const voices = () => {
    const items = D.querySelectorAll('.voice');
    const dots = D.querySelectorAll('.voices__dots i');
    let cur = 0, timer;
    const go = (n) => {
      const next = (n + items.length) % items.length;
      if (next === cur) return;
      const out = items[cur], inn = items[next];
      cur = next;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === cur));
      if (reduced) { items.forEach((x, i) => x.classList.toggle('is-active', i === cur)); return; }
      gsap.timeline()
        .to(out.querySelectorAll('blockquote, figcaption'), { y: -20, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.in', onComplete: () => out.classList.remove('is-active') })
        .add(() => inn.classList.add('is-active'))
        .fromTo(inn.querySelectorAll('blockquote, figcaption'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' });
    };
    const arm = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), 6500); };
    D.querySelector('.voices__next').addEventListener('click', () => { go(cur + 1); arm(); });
    D.querySelector('.voices__prev').addEventListener('click', () => { go(cur - 1); arm(); });
    D.querySelector('.voices').addEventListener('mouseenter', () => clearInterval(timer));
    D.querySelector('.voices').addEventListener('mouseleave', arm);
    arm();
  };

  /* ---------- Boot ---------- */
  heroScroll();
  buildShowroom();
  buildArrivals();
  buildCollections();
  statement();
  sourcing();
  voices();
  D.addEventListener('vantora:ready', () => { intro(); ScrollTrigger.refresh(); }, { once: true });
})();
