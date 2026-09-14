/* VANTORA MOTORS — vehicle detail page (data-driven from data.js via ?id=) */
(function () {
  'use strict';
  const D = document, W = window;
  const { VEHICLES, U, fmtPrice, fmtMiles } = W.VANTORA;
  const reduced = VM.reduced;
  const mobile = VM.isMobile();
  const $ = (s) => D.querySelector(s);

  const id = new URL(location.href).searchParams.get('id');
  let idx = VEHICLES.findIndex((v) => v.id === id);
  if (idx < 0) idx = 0;
  const v = VEHICLES[idx];
  const prev = VEHICLES[(idx - 1 + VEHICLES.length) % VEHICLES.length];
  const next = VEHICLES[(idx + 1) % VEHICLES.length];
  const name = `${v.make} ${v.model}`;

  /* ---------- Populate ---------- */
  D.title = `${name} — VANTORA MOTORS`;
  const hero = $('#v-hero'); hero.src = U(v.photos.hero, 2200); hero.alt = `${name} in ${v.exterior}`;
  $('#v-crumb').textContent = v.model;
  $('#v-make').textContent = v.make;
  $('#v-model').textContent = v.model;
  $('#v-price').textContent = fmtPrice(v);
  $('#v-sub').textContent = `${v.year} · ${fmtMiles(v.mileage)} · ${v.exterior.split(',')[0]}`;
  $('#v-desc').textContent = v.description;
  $('#v-story').textContent = v.story;
  $('#v-short').textContent = `the ${v.short}`;
  $('#v-form-id').value = v.id;

  const facts = [['Model year', v.year], ['Mileage', fmtMiles(v.mileage)], ['Engine', v.engine], ['Power', `${v.power} PS`], ['Transmission', v.transmission], ['Drive', v.drive], ['Exterior', v.exterior], ['Interior', v.interior]];
  $('#v-facts').innerHTML = facts.map(([k, val]) => `<div class="fact">${k}<b>${val}</b></div>`).join('');

  const specs = [
    ['Manufacturer', v.make], ['Model', v.model], ['Model year', v.year], ['Mileage', fmtMiles(v.mileage)],
    ['Engine', v.engine], ['Power', `${v.power} PS`], ['Torque', `${v.torque} Nm`], ['Transmission', v.transmission],
    ['Drivetrain', v.drive], ['0–100 km/h', `${v.accel.toFixed(1)} s`], ['Top speed', `${v.topSpeed} km/h`], ['Exterior colour', v.exterior],
    ['Interior', v.interior], ['Owners', v.history.filter((h) => /owner|supplied|delivered|collection/i.test(h.text)).length || 1], ['Service history', 'Complete, main dealer'], ['Inspection', 'VANTORA 172-point, passed']
  ];
  $('#v-specs').innerHTML = specs.map(([k, val]) => `<div class="spec">${k}<b>${val}</b></div>`).join('');

  const capsExt = ['Front three-quarter', 'Profile', 'Bodywork detail', 'Rear aero'];
  $('#v-exterior').innerHTML = v.photos.exterior.map((p, i) => `<figure><div class="ratio"><img src="${U(p, 1400)}" alt="${name} — ${capsExt[i] || 'exterior'}" loading="lazy" draggable="false"></div><figcaption>${String(i + 1).padStart(2, '0')} — ${capsExt[i] || 'Exterior'}</figcaption></figure>`).join('');
  const capsInt = ['Cabin', 'Controls', 'Detail'];
  $('#v-interior').innerHTML = v.photos.interior.map((p, i) => `<figure><img src="${U(p, 1400)}" alt="${name} interior — ${capsInt[i] || 'interior'}" loading="lazy"><figcaption>${capsInt[i] || 'Interior'}</figcaption></figure>`).join('');
  const capsDet = ['Wheel & brake', 'Lighting', 'Carbon fibre'];
  $('#v-details').innerHTML = v.photos.details.map((p, i) => `<figure data-cursor="Open" data-full="${U(p, 2000)}" data-cap="${capsDet[i] || 'Detail'}"><img src="${U(p, 900)}" alt="${name} — ${capsDet[i] || 'detail'}" loading="lazy"><figcaption>${capsDet[i] || 'Detail'}</figcaption></figure>`).join('');

  const eng = $('#v-engine-img'); eng.src = U(v.photos.engine, 1400); eng.alt = `${name} — engine and bodywork detail`;
  $('#v-engine-title').innerHTML = `${v.engineShort.replace(/ /g, ' ')} — <em>${v.power} PS</em>`;
  $('#v-engine-lead').textContent = `${v.engine}, ${v.torque} Nm, ${v.transmission.toLowerCase()}. ${v.drive}.`;
  $('#v-tech').innerHTML = v.technology.map((t, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${t}</li>`).join('');

  $('#v-timeline').insertAdjacentHTML('beforeend', v.history.map((h) => `<div class="tl"><div class="y">${h.year}</div><p>${h.text}</p></div>`).join(''));

  const view = $('#v-viewing-img'); view.src = U(v.photos.exterior[1] || v.photos.hero, 2000); view.alt = '';
  const pv = $('#v-prev'); pv.href = `vehicle.html?id=${prev.id}`; pv.querySelector('img').src = U(prev.photos.card, 1200); pv.querySelector('.n').textContent = `${prev.make} ${prev.model}`;
  const nx = $('#v-next'); nx.href = `vehicle.html?id=${next.id}`; nx.querySelector('img').src = U(next.photos.card, 1200); nx.querySelector('.n').textContent = `${next.make} ${next.model}`;
  VM.watchImages();

  /* ---------- Hero motion ---------- */
  const heroTitleBits = D.querySelectorAll('.vhero__title small, .vhero__title span, .vhero__side > *, .vhero__crumb');
  if (!reduced) {
    gsap.set(heroTitleBits, { y: 40, opacity: 0 });
    D.addEventListener('vantora:ready', () => {
      gsap.timeline()
        .to(hero, { scale: 1, filter: 'brightness(0.75)', duration: 2.4, ease: 'power3.out' }, 0)
        .to(heroTitleBits, { y: 0, opacity: 1, duration: 1.3, stagger: 0.1, ease: 'power4.out' }, 0.4);
    }, { once: true });
    gsap.to(hero, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.vhero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.vhero__content', { y: -60, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.vhero', start: '40% top', end: 'bottom top', scrub: true } });
  } else gsap.set(hero, { scale: 1 });

  /* ---------- Section bar ---------- */
  const barLinks = D.querySelectorAll('.vbar__inner a:not(.vbar__cta)');
  barLinks.forEach((a) => {
    const sec = D.getElementById(a.getAttribute('href').slice(1));
    if (!sec) return;
    ScrollTrigger.create({ trigger: sec, start: 'top 45%', end: 'bottom 45%', onToggle: (s) => { if (s.isActive) barLinks.forEach((x) => x.classList.toggle('is-active', x === a)); } });
  });

  /* ---------- Gauges ---------- */
  const ticks = D.querySelectorAll('[data-ticks]');
  ticks.forEach((g) => {
    let s = '';
    for (let i = 0; i <= 28; i++) {
      const ang = (-225 + (270 * i) / 28) * Math.PI / 180;
      const r1 = 95, r2 = i % 7 === 0 ? 86 : 91;
      s += `<line x1="${100 + r1 * Math.cos(ang)}" y1="${100 + r1 * Math.sin(ang)}" x2="${100 + r2 * Math.cos(ang)}" y2="${100 + r2 * Math.sin(ang)}"/>`;
    }
    g.innerHTML = s;
  });
  const gaugeVals = { power: [v.power, v.power / 1000, 0], accel: [v.accel, 1 - (v.accel - 2) / 4, 1], speed: [v.topSpeed, v.topSpeed / 400, 0] };
  Object.entries(gaugeVals).forEach(([k, [val, ratio, dec]]) => {
    const path = D.querySelector(`[data-gauge="${k}"]`);
    const out = D.querySelector(`[data-val="${k}"]`);
    const len = path.getTotalLength();
    path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
    const obj = { v: 0 };
    const target = Math.max(0.05, Math.min(1, ratio));
    if (reduced) { path.style.strokeDashoffset = len * (1 - target); out.textContent = val.toFixed(dec); return; }
    gsap.timeline({ scrollTrigger: { trigger: path.closest('.gauge'), start: 'top 80%', once: true } })
      .to(path, { strokeDashoffset: len * (1 - target), duration: 2, ease: 'power3.out' }, 0)
      .to(obj, { v: val, duration: 2, ease: 'power3.out', onUpdate: () => (out.textContent = dec ? obj.v.toFixed(1) : Math.round(obj.v).toString()) }, 0);
  });
  const bars = [['Torque', v.torque / 1000, `${v.torque} Nm`], ['Power', v.power / 1000, `${v.power} PS`], ['Top speed', v.topSpeed / 400, `${v.topSpeed} km/h`], ['Response', 1 - (v.accel - 2) / 4, `${v.accel.toFixed(1)} s to 100`]];
  $('#v-bars').innerHTML = bars.map(([k, r, l]) => `<div class="bar"><span>${k}</span><div class="track"><i data-r="${Math.min(1, r)}"></i></div><b>${l}</b></div>`).join('');
  D.querySelectorAll('.bar i').forEach((i) => {
    if (reduced) { i.style.transform = `scaleX(${i.dataset.r})`; return; }
    gsap.to(i, { scaleX: parseFloat(i.dataset.r), duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: i, start: 'top 90%', once: true } });
  });

  /* ---------- Gallery ---------- */
  D.querySelectorAll('.gallery__tabs button').forEach((b) => {
    b.addEventListener('click', () => {
      D.querySelectorAll('.gallery__tabs button').forEach((x) => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); });
      D.querySelectorAll('.gallery__pane').forEach((p) => p.classList.toggle('is-active', p.dataset.pane === b.dataset.pane));
      const pane = D.querySelector('.gallery__pane.is-active');
      if (!reduced) gsap.fromTo(pane.querySelectorAll('figure'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out' });
      if (b.dataset.pane === 'interior') revealMosaic();
      ScrollTrigger.refresh();
    });
  });

  // Exterior: drag with inertia (desktop), native scroll on mobile
  const drag = $('#v-exterior');
  if (!mobile && !reduced) {
    let x = 0, startX = 0, startT = 0, lastX = 0, lastT = 0, dragging = false, min = 0;
    const setX = gsap.quickTo(drag, 'x', { duration: 0.6, ease: 'power3.out' });
    const bounds = () => { min = -(drag.scrollWidth - W.innerWidth); };
    bounds(); W.addEventListener('resize', bounds);
    drag.addEventListener('pointerdown', (e) => { dragging = true; drag.classList.add('is-dragging'); startX = e.clientX - x; startT = performance.now(); lastX = e.clientX; lastT = startT; drag.setPointerCapture(e.pointerId); });
    drag.addEventListener('pointermove', (e) => { if (!dragging) return; x = Math.max(min - 80, Math.min(80, e.clientX - startX)); gsap.set(drag, { x }); lastX = e.clientX; lastT = performance.now(); });
    const release = () => {
      if (!dragging) return; dragging = false; drag.classList.remove('is-dragging');
      const dt = Math.max(16, performance.now() - lastT);
      const vel = (lastX - (startX + x)) / dt; // px per ms approx
      x = Math.max(min, Math.min(0, x + vel * 260));
      gsap.to(drag, { x, duration: 1.2, ease: 'power3.out' });
    };
    drag.addEventListener('pointerup', release); drag.addEventListener('pointercancel', release); drag.addEventListener('pointerleave', release);
    drag.addEventListener('wheel', (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); x = Math.max(min, Math.min(0, x - e.deltaX)); setX(x); } }, { passive: false });
    drag.querySelectorAll('a, img').forEach((el) => el.addEventListener('dragstart', (e) => e.preventDefault()));
    // hint bar follows position
    const hint = D.querySelector('.drag__hint .track i');
    gsap.ticker.add(() => { const p = min ? gsap.getProperty(drag, 'x') / min : 0; hint.style.transform = `translateX(${p * 120}px)`; });
  }

  // Interior mosaic reveal
  let mosaicDone = false;
  const revealMosaic = () => {
    if (mosaicDone || reduced) return; mosaicDone = true;
    D.querySelectorAll('#v-interior figure').forEach((f, i) => {
      const img = f.querySelector('img');
      gsap.fromTo(img, { scale: 1.15, clipPath: 'inset(0 0 100% 0)' }, { scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.4, delay: i * 0.12, ease: 'power4.out' });
    });
  };
  if (reduced) D.querySelectorAll('#v-interior img').forEach((i) => (i.style.transform = 'none'));

  // Details lightbox
  const lb = $('.lightbox'), lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.lightbox__cap');
  const closeLb = () => { lb.classList.remove('is-open'); VM.lenis && VM.lenis.start(); D.body.classList.remove('no-scroll'); };
  D.querySelectorAll('#v-details figure').forEach((f) => f.addEventListener('click', () => {
    lbImg.src = f.dataset.full; lbImg.alt = f.querySelector('img').alt; lbCap.textContent = `${name} — ${f.dataset.cap}`;
    lb.classList.add('is-open'); VM.lenis && VM.lenis.stop(); D.body.classList.add('no-scroll');
    if (!reduced) gsap.fromTo(lbImg, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' });
  }));
  lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  D.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLb(); });

  /* ---------- Timeline draw ---------- */
  if (!reduced) gsap.to('.timeline__draw', { scaleX: 1, duration: 2, ease: 'power3.inOut', scrollTrigger: { trigger: '.timeline', start: 'top 80%', once: true } });
  else $('.timeline__draw').style.transform = 'none';

  /* ---------- Finance ---------- */
  const dep = $('#f-dep'), term = $('#f-term');
  const calc = () => {
    const price = v.price || 250000;
    const d = dep.value / 100, months = +term.value, apr = 0.079, balloon = price * 0.35;
    const principal = price * (1 - d);
    const r = apr / 12;
    const monthly = (principal - balloon / Math.pow(1 + r, months)) * r / (1 - Math.pow(1 + r, -months));
    $('#f-dep-out').textContent = `${dep.value}%`;
    $('#f-term-out').textContent = `${months} months`;
    $('#f-monthly').textContent = v.price ? '£' + Math.round(monthly).toLocaleString('en-GB') : 'POA';
    $('#f-deposit').textContent = v.price ? '£' + Math.round(price * d).toLocaleString('en-GB') : 'POA';
  };
  dep.addEventListener('input', calc); term.addEventListener('input', calc); calc();
  if (!v.price) $('#f-note').textContent = 'This vehicle is offered at a price on application. Finance is available on request through our specialist lending partners; please contact us for a bespoke illustration.';
})();
