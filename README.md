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

## App Store

Petfolio v1.0.0 shipped on 2026-04-28. All three locales link to the App Store from the hero `.hero-app-store-badge` (white download badge) and the `.app-store-badges` block in the download section (black iOS + Mac App Store badges, two-up).

- **EN / ES**: link to the US storefront — `https://apps.apple.com/us/app/petfolio-pet-care/id6764127493`
- **ZH-Hans**: links to the China storefront (app name "Petfolio 爪爪迹") — `https://apps.apple.com/cn/app/petfolio-%E7%88%AA%E7%88%AA%E8%BF%B9/id6764127493`

Badge images come from `https://toolbox.marketingtools.apple.com/api/badges/...` with locale-matched paths (`en-US`, `es-MX`, `zh-Hans`). The CSP `img-src` in `_headers` already allows `tools.applemediaservices.com` and `toolbox.marketingtools.apple.com`.

## Deploy

Cloudflare Pages picks up the directory as-is — no build command. Push to `main` and Cloudflare auto-deploys to `petfolio.luminoid.dev`.
