# Three Colors of Madness — Chapter One Corkboard Sampler

A polished, playable **browser vertical slice** of Officer Walter Corwin’s case-file / corkboard loop (Widow’s Bight, 1923). Literary and period — aged paper, cork, twine, typewriter ink. No combat, no sanity meters, no HUD.

~3–8 minutes to feel the verbs: read the notebook, highlight related pins, link evidence with twine, unlock quiet realizations.

## Run

Static site — zero dependencies.

```bash
cd three-colors-corkboard-sampler
python3 -m http.server 8080
```

Then open **http://localhost:8080**

Alternatives:

```bash
npx --yes serve -l 8080
# or
npx --yes http-server -p 8080
```

You can also open `index.html` directly in a browser; `localStorage` still works from a `file://` URL in most browsers.

## Files

| File | Role |
|------|------|
| `index.html` | Structure — notebook + corkboard |
| `styles.css` | 1920s police / corkboard aesthetic |
| `app.js` | Entries, cards, twine linking, spine, coat toggle, persistence |
| `README.md` | This file |

## How to play

1. **Notebook** — scroll entries (scene, Odell, Mrs. Almy, Behan, barman, evidence). Click an entry to highlight related corkboard cards.
2. **Corkboard** — click card A, then card B to pin **twine** between them (Esc cancels).
3. **Insights** — certain canonical pairs write quiet realizations into the notebook (not trophies).
4. **Spine** — after **3** insight links, the notebook reveals: *They did not summon a mother. / They summoned something and called it one.*
5. **Coat toggle** — Uniform/badge vs plain wool coat swaps the barman’s notebook snippet.
6. **Reset board** — clears twine, insights, and `localStorage` demo state.

## Insight link pairs

Any order; linking either direction works.

| Pair | Realization |
|------|-------------|
| **Ophion Club** ↔ **Unpaid Ophion Lay** | Inheritance, split |
| **Official Count: Six** ↔ **Birches — Woman & Boy** | Who gets counted |
| **Rose Garden — Six** ↔ **Walter's Eight** | Garden arithmetic |
| **Speaking Tenderly of Her** ↔ **Mother-Shape** | What they asked for |
| **Kessler's Boning Knife** ↔ **No Exit Wound** | Not a shooting |
| **Watch Stopped 3:17** ↔ **Ophion Club** | Load-bearing blank |

Non-canonical pairs still draw twine; they do not advance the spine.

## Accessibility

- Readable serif / typewriter pairing; dark frame around paper and cork
- `prefers-reduced-motion` respected (no forced motion)
- Keyboard: entries are focusable (Enter/Space); cards are buttons; Esc cancels link mode
- Skip link to main case file

## Scope (intentionally out)

Combat, tunnel crawl, full town map, Chapters Two/Three, heavy audio.

## Canon touchstones

Walter Corwin · Widow’s Bight · 1923 · rose garden six / birches eight · Ophion Club · Judge Wexford, Dr. Fenn, DA Corliss, Josiah Pruitt, Otto Kessler, sixth UNKNOWN · Odell · Mrs. Almy · Behan · plain wool coat vs badge · watch 3:17 · faint cough / no exit wound.
