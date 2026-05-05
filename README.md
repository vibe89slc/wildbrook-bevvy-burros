# Wildbrook Bevvy Burros

> The herd that pours. Mobile beverage service from the Snoqualmie Valley.

A modern, animated demo site for Wildbrook Bevvy Burros — a beverage burro
business based in North Bend, Washington. Inspired by the Farm at Sparrow Hill
model, elevated with a cinematic motion language and a flagship animal
showcase slider built for live demos.

Built by [VIBE89](https://vibe89.com).

## Stack

Vanilla HTML, vanilla CSS, vanilla JavaScript. No build step. No frameworks.
Open `index.html` in a browser (or any static server) to preview.

```bash
# from the project folder
python3 -m http.server 8080
# then open http://localhost:8080
```

## File map

```
wildbrook-bevvy-burros/
├── index.html          # Home — hero, slider, packages, venues, booking
├── hazel.html          # Mini Donkey profile
├── atlas.html          # Pygmy Goat profile
├── wren.html           # Mini Highland Cow profile
├── beau.html           # Valais Blacknose Sheep profile
├── styles.css          # Single stylesheet
├── script.js           # Single behavior file
├── images/             # Drop real photography here as it comes in
├── favicon.svg
├── CLIENT-COPY.txt     # Editable copy doc — share with the client for tweaks
├── robots.txt
└── README.md
```

## Brand notes

- **Palette:** mossy forest green (`#2a3d2c`), parchment cream (`#f6efe2`),
  terracotta (`#c66a3d`), aged brass (`#b89461`), charcoal (`#1a1816`).
- **Typography:** Fraunces (display), Inter (body) — both via Google Fonts.
- **Voice:** warm, intentional, a little wry. Pacific Northwest rooted.
  Never twee. Animals come first.

## The flagship slider

The pinned animal showcase on the home page is the demo centerpiece. On
desktop (>=900px) it pins each animal panel for one viewport-height of
scroll, with parallax photo zoom, oversized typography, and stat-dial
reveals. On mobile it falls back to a snap-scrolling vertical stack with
intersection-observer driven reveals. Respects `prefers-reduced-motion`.

## Adding a remote

The repo is initialized locally. To push to GitHub:

```bash
gh repo create wildbrook-bevvy-burros --public --source=. --remote=origin --push
# or
git remote add origin git@github.com:yourorg/wildbrook-bevvy-burros.git
git push -u origin main
```

## Placeholder content

All animal copy, photography, and contact info is placeholder. Swap the
content in each animal HTML file (or copy-edit through `CLIENT-COPY.txt`
and have it ported in). Drop real photography into `images/` using the
filename stubs already referenced in the HTML.
