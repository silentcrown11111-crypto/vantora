# VANTORA MOTORS — portfolio website

A fictional premium supercar dealership. Static site: no build step, no framework.

## Run
Open `index.html` directly in a browser, or serve the folder (e.g. `npx serve .` or `python -m http.server`).

## Pages
- `index.html` — cinematic homepage (hero reveal, Velocity Reveal showroom, arrivals, collections, philosophy, sourcing, services, showroom, journal, testimonials, enquiry)
- `inventory.html` — collection page with animated category filtering (`?c=supercars`, `luxury`, `performance`, `grand-touring`, `collectors`, `recent`)
- `vehicle.html?id=<vehicle-id>` — data-driven detail page for every vehicle in `assets/js/data.js`

## Stack
GSAP 3 + ScrollTrigger, Lenis smooth scroll (bundled locally in `assets/vendor`), vanilla JS, hand-written CSS.
Fonts (Manrope, Cormorant Garamond, JetBrains Mono) are self-hosted in `assets/fonts`.

## Photography
All photography is served from Unsplash's image CDN under the Unsplash licence (free for commercial and
non-commercial use, no attribution required). Photo IDs are listed in `assets/js/data.js`. Because images
are loaded from the CDN, the site needs an internet connection to display them.

## Accessibility & performance
Semantic markup, keyboard-navigable menu and galleries, `prefers-reduced-motion` respected (all scroll
choreography is replaced with static layouts), lazy-loaded images, no external scripts.
