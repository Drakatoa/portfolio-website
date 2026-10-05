# Persona 3 Reload selection: measurements

Source: "Persona 3 Reload Menu Recreated In Roblox" (YouTube `xuEsJjIwiCg`, 16.6 s, 1728×1080, 60 fps), linked by Rajit on 2026-10-02. The video was downloaded to the session scratchpad only; it is not stored in this repository. Values come from per-frame pixel measurements across 7 selection changes and a 3.5 s hold.

## Anatomy of a selected item

- **Blade:** white (`#fdfdfd`). In the game, the tip starts 10–14% into the word, about 57% down the word's height. The top edge rises to about 20% past the word's end. The bottom edge flares 0–0.45 word-heights below the baseline, and the right edge slants back. Items use slightly different blades.
- **Echo:** pink (`#ed58f7`), the same blade behind the white one. At rest it shows as a lip about 2% of the blade's width along the edges away from the tip.
- **Ink:** the word is black (`#000`) outside the blade and pure red (`#fc0000`) where it crosses the blade. There is no offset; it is a clean clip.
- **Size:** the selected item is drawn larger than unselected items.

## Timing (frames at 16.7 ms)

| Event | Measurement |
|---|---|
| Deselect | The old highlight and word revert on the same frame the new one appears; no fade-out. |
| Select | The word and blade scale together about their centre: about 57% on the first frame, then 69/78%, 81/87%, 91/94% and 96/99%, reaching 100% at about 100 ms. This fits 55% → 100% over 100 ms with a quadratic ease-out (`cubic-bezier(.25,.46,.45,.94)`). There is no overshoot. |
| Echo pulse | Only the echo moves. Its far edge pushes out about 5% of the blade's width (6 → 20 px on a 283 px blade), and the top rises about 6 px. The tip and bottom edges stay put, so it is a ~1.05 scale about the corner below the tip. It peaks at about 100 ms, holds a frame, and is back by about 217 ms. |
| Pulse period | 1.00 s, at 1.48, 2.48, 3.48 and 4.48 s; the first beat starts on selection. |
| Idle | The white blade and the text do not move between pulses. |

## Site adaptation

- **Text outside the blade:** the site's page is black, so this text stays white instead of black.
- **Orientation:** the game's tip-left orientation.
- **Proportions:** P3R's menu words are all of similar length, so its blade proportions become fixed em distances on the site: tip 0.35em in, top corner 0.72em past the end, bottom corner 0.24em past it. The flare scales with label length. This keeps titles of 2 to 28 characters looking alike. `MIRROR` in `lib/selection-geometry.ts` restores the game's orientation.
- **Selected size:** ×1.12 for navigation and filters, ×1.06 for actions and trophy names, because the site's labels sit in fixed rows.
- **Primary action:** keeps its project-coloured echo, an existing site rule.
- **Reduced motion:** disables the pop and the pulse.
