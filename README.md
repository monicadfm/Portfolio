# Monica Moura · Portfolio

My developer portfolio, built from scratch with HTML, CSS and vanilla JavaScript. No frameworks, no libraries.

**Live site:** https://monicadfm.github.io/Portfolio/

## Features

- **Frontend / backend slider:** drag to switch between my profile as a UI card and the same data as a JSON API response
- **WishBound banner simulator:** weighted random pulls with hard pity at 90, using the same rates and characters as my final course project
- **Live GitHub data:** public repo count fetched from the GitHub API, with a fallback if the request fails
- **Light and dark mode:** follows the system setting, with all colours defined once as CSS custom properties
- **Responsive:** CSS Grid and Flexbox layouts that work from phones to wide screens
- **Accessible:** keyboard focus styles, `aria-live` pull results, labelled controls and reduced-motion support

## Tech

| Area | Used |
| --- | --- |
| Structure | Semantic HTML5 |
| Styling | CSS custom properties, Grid, Flexbox, `clamp()`, `color-mix()`, `clip-path` |
| Logic | Vanilla JavaScript, `fetch` + `async/await`, Clipboard API |
| Fonts | Bricolage Grotesque, Instrument Sans, JetBrains Mono (Google Fonts) |
| Hosting | GitHub Pages |

## Project structure

```
index.html        page content
favicon.svg       tab icon
css/style.css     design tokens and styles, grouped by section
js/banner.js      pull logic and banner simulator UI
js/slider.js      frontend / backend compare slider
js/github.js      live repo count from the GitHub API
js/contact.js     copy-email button
```

## Run locally

1. Clone the repo
   ```
   git clone https://github.com/monicadfm/portfolio.git
   ```
2. Open the folder in VS Code
3. Right-click `index.html` → **Open with Live Server**

To check the simulator's rates, open the browser console and run:

```js
testRates(10000)
```

## Contact

- LinkedIn: [monica-moura-1a0256221](https://www.linkedin.com/in/monica-moura-1a0256221/)
- GitHub: [monicadfm](https://github.com/monicadfm)
- Email: miamonicamoura@gmail.com
