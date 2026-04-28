# petfolio-site

Static marketing site for [Petfolio](../Petfolio/) — the iOS / iPadOS / Mac Catalyst pet care app.

- **No build step** — plain HTML and CSS.
- **Hosting**: Cloudflare Pages (domain TBD, likely `petfolio.luminoid.dev`).
- **Locales**: English (root), Spanish (`es/`), Simplified Chinese (`zh/`).
- **Theme**: warm brown (`#D4875A`) matching `PetfolioTheme`, Fraunces + Nunito typography.

## Structure

```
petfolio-site/
├── index.html, privacy.html           # English (root)
├── es/                                # Spanish
│   ├── index.html
│   └── privacy.html
├── zh/                                # Simplified Chinese
│   ├── index.html
│   └── privacy.html
├── css/styles.css                     # Shared styles
├── resources/
│   ├── app_icon.png                   # Copied from Petfolio/Petfolio/Resources/Assets.xcassets
│   └── screenshots/                   # Real screenshots go here (currently placeholder slots)
├── _headers                           # Cloudflare Pages security headers
├── README.md                          # This file
└── TRANSLATIONS.md                    # Translation sync reference
```

## Adding screenshots

Landing pages currently render placeholder tiles labeled `Pets · Profile · Health · Weight · Calendar · Widgets`. Drop actual screenshots into `resources/screenshots/` as `app-1.png … app-6.png` and swap the placeholder `<div class="shot">` blocks for `<img>` tags in all three locale index pages.

Compress first:

```bash
pngquant --quality=90-100 --ext .png --force resources/screenshots/app-*.png
```

## Updating copy

1. Edit English files first (`index.html`, `privacy.html`).
2. Mirror changes in `es/` and `zh/`.
3. Check `TRANSLATIONS.md` for the phrase-by-phrase reference.

## Updating App Store link

The App Store badge currently says "Coming Soon". When the app ships:

1. Replace the `<span class="coming-soon-badge">` in all three `index.html` files with an Apple App Store badge (see [plantfolio-site/index.html](../plantfolio-site/index.html) for the pattern).
2. Replace the `Coming Soon` pill in the hero (`.hero-badge-pill`) with the download-on-App-Store badge image, linking to the App Store URL.
3. Add `https://tools.applemediaservices.com` to the CSP `img-src` directive if not already present (it is, to match plantfolio-site's `_headers`).

## Deploy

Cloudflare Pages picks up the directory as-is — no build command. Push changes and the site updates automatically once the site is wired up to the repo.
