# Wildbrook Bevvy Burros

> The herd that pours. Mobile beverage service from the Snoqualmie Valley.

A modern, animated demo site for Wildbrook Bevvy Burros — a beverage burro
business based in North Bend, Washington. Inspired by the Farm at Sparrow Hill
model, elevated with a cinematic motion language and a flagship showcase slider
built for live demos. The roster is four bonded mini donkeys: **Rufus, Sol,
Hazel, and Atlas**.

Built by [VIBE89](https://vibe89.com).

## Stack

Vanilla HTML, vanilla CSS, vanilla JavaScript. No build step. No frameworks.
Open `index.html` in a browser (or any static server) to preview.

```bash
# from the project folder
python3 -m http.server 8080
# then open http://localhost:8080
```

## Sitemap

Five core pages plus four mini-donkey profile pages.

```
Home (index.html)
├── About            (about.html)
├── Packages         (packages.html)
├── Our Herd         (herd.html)
│   ├── Rufus        (rufus.html)
│   ├── Sol          (sol.html)
│   ├── Hazel        (hazel.html)
│   └── Atlas        (atlas.html)
└── Contact          (contact.html)
```

## File map

```
wildbrook-bevvy-burros/
├── index.html          # Home — hero, herd teaser, pillars, packages teaser, venues, CTA
├── about.html          # Origin story, why-us pillars, stats, how we work
├── packages.html       # Full packages, what's included, add-ons
├── herd.html           # Full scroll-pinned showcase + profile grid
├── contact.html        # Booking form, contact details, venues list
├── rufus.html          # Mini Donkey profile — Rufus (bonded with Tonka)
├── sol.html            # Mini Donkey profile — Sol (bonded with Marigold)
├── hazel.html          # Mini Donkey profile — Hazel (bonded with Juniper)
├── atlas.html          # Mini Donkey profile — Atlas (bonded with Cypress)
├── styles.css          # Single stylesheet
├── script.js           # Single behavior file
├── images/             # Drop real photography here as it comes in
├── favicon.svg
├── CLIENT-COPY.txt     # Editable copy doc — share with the client for tweaks
├── robots.txt
└── README.md
```

## Brand notes

- **Palette:** mossy forest green (`#2a3d2c`), cream (`#faf3e3`), sage, peach,
  terracotta (`#d57a4a`), aged brass (`#c8a56a`), warm ink (`#2b2620`).
- **Typography:** Fraunces (display), Inter (body) — both via Google Fonts.
- **Voice:** warm, intentional, a little wry. Pacific Northwest rooted.
  Never twee. Donkeys come first.

## The flagship slider

The pinned animal showcase now lives on `herd.html`. On desktop (>=900px) it
pins each donkey panel for one viewport-height of scroll, with parallax photo
zoom, oversized typography, and stat-dial reveals. On mobile it falls back to a
snap-scrolling vertical stack with intersection-observer driven reveals.
Respects `prefers-reduced-motion`.

## Booking flow

Customers do **not** pick a donkey by name. Our handlers pair the right bonded
pair to the event based on venue, guest count, and time of day. Profile pages
exist as storytelling, not as an order form — every CTA on every page funnels
to `contact.html`.

## Adding a remote

The repo is initialized locally. To push to GitHub:

```bash
gh repo create wildbrook-bevvy-burros --public --source=. --remote=origin --push
# or
git remote add origin git@github.com:yourorg/wildbrook-bevvy-burros.git
git push -u origin main
```

## Placeholder content

All donkey copy, photography, and contact info is placeholder. Swap the content
in each donkey HTML file (or copy-edit through `CLIENT-COPY.txt` and have it
ported in). Drop real photography into `images/` using the filename stubs
already referenced in the HTML (`rufus.jpg`, `sol.jpg`, `hazel.jpg`,
`atlas.jpg`, plus the `scene-*.jpg` set).
