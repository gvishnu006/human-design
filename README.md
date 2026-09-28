# Human Design

A calm, modern reference site for the Human Design system. Static HTML, CSS and
vanilla JavaScript — no build step, no dependencies, no tracking.

## Sections

| # | Section | What it covers |
|---|---------|----------------|
| 1 | Hero | Landing view with an illustrative body graph |
| 2 | Types | The five types, strategies, authorities, signatures |
| 3 | Profiles | The nine profiles as an accordion |
| 4 | Lines | The four lines plus the not-self signature table |
| 5 | Centres | The nine energy centres as keyboard-navigable tabs |
| 6 | Authority | Sacral, emotional and head authority, and a decision loop |
| 7 | Purpose | Life purpose, life theme, life work |
| 8 | Chart | A seeded sample-chart demo (see the caveat below) |
| 9 | FAQ | Common questions, newsletter CTA |

## Running locally

Open `index.html` directly, or serve the folder:

```bash
npx serve .
```

## About the chart tool

The calculator under **Your Chart** is a *demonstration*, not a real chart
calculation. It seeds a PRNG from your birth date and picks from a set of
readings, so the result is stable for a given date but has no relationship to
actual planetary positions.

A genuine Human Design chart requires ephemeris data and the exact solar-system
geometry at your birth moment. That is intentionally not shipped here, and the
UI says so in both the form and the result.

## Privacy

All form input is handled in the browser. Nothing is transmitted, stored, or
logged. The newsletter form is a no-op demo.

## Accessibility

- Tab pattern implements the WAI-ARIA tabs pattern with arrow/Home/End keys
- FAQ and profile panels are real disclosure buttons with `aria-expanded`
- Live regions on form results and validation errors
- Visible focus styles and a `prefers-reduced-motion` path that disables all
  animation and scroll behaviour

## Disclaimer

Human Design is presented here as an educational reference. It is not medical,
legal, or psychological advice.

## Licence

MIT — see [LICENSE](LICENSE).
