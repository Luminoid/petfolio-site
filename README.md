# petfolio-site

Static marketing site for [Petfolio](../Petfolio/) — the iOS / iPadOS / Mac Catalyst pet care app.

- **No build step** — plain HTML and CSS.
- **Hosting**: Cloudflare Pages — `petfolio.luminoid.dev`.
- **Locales**: English (root), Spanish (`es/`), Simplified Chinese (`zh/`).
- **Theme**: warm brown (`#D4875A`) matching `PetfolioTheme`, Fraunces + Nunito typography.

## Structure

```
petfolio-site/
├── index.html, privacy.html           # English (root)
├── 404.html                           # Cloudflare Pages 404
├── es/                                # Spanish
│   ├── index.html
│   └── privacy.html
├── zh/                                # Simplified Chinese
│   ├── index.html
│   └── privacy.html
├── css/styles.css                     # Shared styles (incl. .theme-dark overrides)
├── js/theme.js                        # Theme toggle (auto/dark/light, localStorage-backed)
├── resources/
│   ├── app_icon.png                   # 1024×1024, also used as apple-touch-icon
│   └── screenshots/                   # 5 iPhone screenshots (app-1.png … app-5.png, 1290×2796)
├── _headers                           # Cloudflare Pages security headers (incl. HSTS)
├── robots.txt                         # Sitemap pointer
├── sitemap.xml                        # 6-URL multi-locale sitemap with hreflang
├── README.md                          # This file
└── TRANSLATIONS.md                    # Translation sync reference
```

## Updating screenshots

5 real iPhone screenshots live at `resources/screenshots/app-1.png … app-5.png` (1290×2796). Captioned across locales as: pet list / profile hub / photo gallery / calendar / home widgets. Compression is intentionally skipped per project decision; if file sizes become an issue, `pngquant --quality=90-100 --ext .png --force` is safe.

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

Cloudflare Pages picks up the directory as-is — no build command. Push to `main` and Cloudflare auto-deploys to `petfolio.luminoid.dev`.
