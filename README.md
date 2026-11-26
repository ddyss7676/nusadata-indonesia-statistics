# NusaData Atlas — Indonesia National Statistics

![Competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)
![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ddyss7676/nusadata-indonesia-statistics/rank.svg)
![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ddyss7676/nusadata-indonesia-statistics/reward.svg)

An entry in [Make the best national statistics site](https://make.fun/c/best-national-statistics-site-20261126-0539) on make.fun.

NusaData Atlas presents Indonesia's headline statistics — population, economy, work, living standards, health, education and regions — as a static site that runs entirely from its own files. Every figure carries its source (BPS, World Bank WDI or Kemenkes SSGI) and reference year.

## Run it

Serve the `app/` folder with any static file server and open `index.html`, or hand the entry in with:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library.

## Layout

- `app/index.html` — page shell and navigation
- `app/data.js` — indicators, series and regional tables with sources
- `app/charts.js` — SVG chart builders
- `app/views.js` — one renderer per page
- `app/main.js` — hash router and control wiring
- `app/style.css` — layout and theme
- `screenshots/` — renders of the running site
- `vendor/makefun-frontend.ts` — make.fun dossier library, unchanged from the kit

Licensed under the MIT License; see `LICENSE`.
