/* VANTORA MOTORS — inventory / collection page */
(function () {
  'use strict';
  const D = document, W = window;
  const { VEHICLES, COLLECTIONS, U, fmtPrice } = W.VANTORA;
  const reduced = VM.reduced;
  const results = D.querySelector('.results');
  const filters = D.querySelectorAll('.filter');
  const ind = D.querySelector('.filters__ind');
  const showing = D.querySelector('.showing');

  const matches = (v, f) => f === 'all' || (f === 'recent' ? v.tags.includes('recent') : v.category.includes(f));

  // counts
  filters.forEach((b) => { const c = VEHICLES.filter((v) => matches(v, b.dataset.filter)).length; b.querySelector('.cnt').textContent = String(c).padStart(2, '0'); });
  D.querySelector('.inv-count').textContent = VEHICLES.length;
  const metaB = D.querySelectorAll('.page-hero__meta b');
  if (metaB[1]) metaB[1].textContent = VEHICLES.filter((v) => v.tags.includes('recent')).length;
  if (metaB[2]) metaB[2].textContent = VEHICLES.filter((v) => !v.price).length;
  D.querySelectorAll('.filters__count b')[1].textContent = VEHICLES.length;

  const card = (v, i) => {
    const a = D.createElement('article');
    a.className = 'listing';
    a.dataset.id = v.id;
    a.innerHTML = `
      <a class="listing__visual" href="vehicle.html?id=${v.id}" data-cursor="View" aria-label="View ${v.make} ${v.model}">
        <img src="${U(v.photos.card, 1400)}" alt="${v.make} ${v.model}, ${v.exterior}" loading="${i < 2 ? 'eager' : 'lazy'}">
        ${v.tags.includes('recent') ? '<span class="listing__badge">Just arrived</span>' : ''}
        <span class="corner corner--tl"></span><span class="corner corner--tr"></span><span class="corner corner--bl"></span><span class="corner corner--br"></span>
      </a>
      <div class="listing__info">
        <span class="listing__no">No. ${String(i + 1).padStart(2, '0')} — ${v.year}</span>
        <h2 class="listing__name"><small>${v.make}</small>${v.model}</h2>
        <p class="listing__desc body">${v.description}</p>
        <div class="listing__specs">
          <div><b>${v.power}</b>PS</div>
          <div><b>${v.accel.toFixed(1)}s</b>0–100 km/h</div>
          <div><b>${v.mileage.toLocaleString('en-GB')}</b>Miles</div>
        </div>
        <div class="listing__foot">
          <span class="listing__price">${fmtPrice(v)}</span>
          <a class="link" href="vehicle.html?id=${v.id}">View vehicle</a>
        </div>
      </div>`;
    return a;
  };

  let current = 'all';
  const render = (f, first) => {
    const list = VEHICLES.filter((v) => matches(v, f));
    const build = () => {
      results.innerHTML = '';
      if (!list.length) { results.innerHTML = '<p class="results__empty">No vehicles in this collection at present</p>'; return; }
      list.forEach((v, i) => results.appendChild(card(v, i)));
      VM.watchImages(results);
      showing.textContent = list.length;
      if (reduced) return;
      gsap.fromTo(results.children, { y: 60, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.12, ease: 'power3.out', clearProps: 'filter' });
      results.querySelectorAll('.listing__visual img').forEach((img) => {
        gsap.fromTo(img, { scale: 1.2 }, { scale: 1.06, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: img, start: 'top 90%', once: true } });
      });
      ScrollTrigger.refresh();
    };
    if (first || reduced || !results.children.length) build();
    else gsap.to(results.children, { y: -30, opacity: 0, filter: 'blur(8px)', duration: 0.5, stagger: 0.04, ease: 'power2.in', onComplete: build });
  };

  const moveInd = (btn) => { ind.style.left = btn.offsetLeft + 'px'; ind.style.width = btn.offsetWidth + 'px'; };

  const setFilter = (f, first) => {
    current = f;
    filters.forEach((b) => { const on = b.dataset.filter === f; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); if (on) moveInd(b); });
    render(f, first);
    const url = new URL(location.href); if (f === 'all') url.searchParams.delete('c'); else url.searchParams.set('c', f);
    try { history.replaceState(null, '', url); } catch (e) { /* file:// origins disallow URL changes */ }
  };

  filters.forEach((b) => b.addEventListener('click', () => { if (b.dataset.filter !== current) setFilter(b.dataset.filter); }));
  W.addEventListener('resize', () => { const b = D.querySelector('.filter.is-active'); if (b) moveInd(b); });

  const initial = new URL(location.href).searchParams.get('c');
  const valid = [...filters].some((b) => b.dataset.filter === initial);
  setFilter(valid ? initial : 'all', true);

  if (!reduced) {
    D.addEventListener('vantora:ready', () => {
      gsap.fromTo('.page-hero .split-line > span', { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: 1.4, stagger: 0.14, ease: 'power4.out', delay: 0.1 });
    }, { once: true });
  } else gsap.set('.page-hero .split-line > span', { yPercent: 0, y: 0 });
})();
