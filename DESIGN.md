---
name: Rajit Goel — landing page
description: Original black-and-white geometry with paired selection wedges and an open linked biography.
colors:
  primary: "#ffffff"
  selection-fallback: "#95959f"
  selection-ink: "#fc0000"
  selection-echo: "#ed58f7"
  black: "#050507"
  white: "#ffffff"
  muted: "#c1c1c7"
  faint: "#a1a1aa"
  line: "#353539"
  surface: "#111116"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "36px"
    fontWeight: 900
    lineHeight: 1.1
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(30px, 3.5vw, 42px)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "24px"
    fontWeight: 900
    lineHeight: 1.2
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "17px"
    lineHeight: 1.5
---

# Design System: Rajit Goel — landing page

## Overview

**Creative North Star: "Sharp geometric menus"**

The original black-and-white hero alone is the baseline (the carousel was retired 2026-10-04). Paired white/pink selection wedges, four-point sparkles, italic headings, and an open linked biography refine that identity. The approved casual bio is preserved; the smaller name now sits below the static portrait.

This record covers the homepage; the same two font families now apply throughout the site. Detail-page content and structure remain unchanged. Sources: `app/page.tsx`, `components/landing/landing.module.css`, `components/landing/header-nav.tsx`, `components/projects.tsx`, `components/project-page.tsx`, `components/project-actions.tsx`, and `lib/selection-geometry.ts`. The current contract and reference interpretation are in `docs/redesign/landing-review-brief.md` and `docs/redesign/persona-geometry-study.md`. No deployment is implied.

**Key Characteristics:**
- Original black-and-white, 14-degree framing.
- Original white/pink word-selection wedges; the primary project action (first link on a project page) alone uses its project border color behind white.
- Smaller name beneath the portrait and open linked prose.
- A trophy collection whose captions open case studies or project pages, and playful record interactions.

## Colors

White supplies principal text, framing, and focus. Selection follows Persona 3 Reload exactly; the measurements are in `docs/redesign/p3r-selection-study.md`.
- **Blade:** a white (`#ffffff`) blade appears behind the selected word. Its tip starts just inside the word, and it flares past the word's end.
- **Echo:** a pink echo (`#ed58f7`) sits behind the blade, offset down and to the right.
- **Ink:** the word turns pure red (`#fc0000`) wherever it crosses the blade. Outside the blade it stays white; P3R's black would disappear on this page.
- **Primary action:** only the primary project action (first link on a project page; Play Game / View Case Study) uses its project colour for the echo; everything else uses P3R pink.

Cool grays support paragraphs and metadata.

## Typography

Barlow Condensed Black italic (900) is loaded for display text; Source Sans 3 (400/500/600) supplies body copy. Old missing custom-font declarations and mono faces are removed; four-point sparkles are SVGs. Display roles are italic; style metadata lives in the sidecar.

The name beneath the portrait is 36px desktop and 32px mobile. The introductory sentence uses `clamp(25px, 2.7vw, 34px)`; the approved linked bio remains 17px/1.55. About uses open 20px/1.65 list copy, reduced to 17px on mobile. Restored project headings inherit the loaded display font while retaining their original responsive scale.

## Layout

The container caps at 1180px with 48px side margins, changing to 32px at 1050px and 20px at 760px. Desktop pairs bio and portrait; mobile places the centered portrait and name above the bio. The portrait uses 72% width, capped at 300px, on mobile.

Projects are one trophy grid; filters wrap into two columns on phones; captions show three tags with a "+N" chip that reveals the rest on hover, focus or tap. The portrait caption sits clear of its geometric frame. About is an open linked list, not experience cards. Fun Stuff stacks games above albums at every width. The two rows, their subheadings and the captions are centred; the FUN STUFF title row stays aligned like the other sections. Both rows share one tile size: 180px square on desktop, and full column width on phones. On desktop the last column is exactly one tile wide, so the pull-out space doesn't skew the centring. Destiny 2 is shown by its white tricorn emblem. The game logos sit transparent on the page, with no tile behind them; Metaphor uses its cover art. Hovering a game scales its image to 1.05 over 150ms, as on the original landing page.

## Elevation & Depth

Overlapping outlines and stark contrast supply depth. The portrait retains a hard offset `drop-shadow(8px 12px 0 #050507)` and white double framing. The old vertical PERSONA label is removed. Records slide from behind album sleeves; no general soft-shadow card system is introduced.

## Shapes

Hero framing retains the original 14-degree slant.

Word selection is the Persona 3 Reload blade, not cursor arrows or an underline. Its geometry, measured from the game's menu:
- It is a triangle in the game's orientation, sized from the font, not as a percentage of the label width:
  - The tip sits 0.35em inside the label, 58% down a line.
  - The top corner sits 0.72em past the label's end, and the bottom corner 0.24em past it.
  - The flare below the baseline grows with the label's length, from 0.12 to 0.5 of a line height, so short labels stay slim and long titles don't get a far-off tip or a huge overhang.
- Heights use the line-height unit and are anchored to the label's last line, so phone titles that wrap get a normal blade under their final line.
- Padded hosts (trophy titles) set `--blade-pad` and `--blade-pad-y` so the blade follows the text.
- External-link arrows sit inside their nav label, so the blade measures to them.
- `tools/trophy-studio/scripts/review-blades.mjs` captures every highlight on desktop and phone for review.
- Labels choose one of three measured blade variants from a stable hash, because the game's menu items differ slightly. Every blade has the same orientation: no per-label flips or extra rotation.
- `lib/selection-geometry.ts` produces the clip polygons, and `components/landing/selection-ink.tsx` renders the echo, the blade and the red ink.

Motion, measured from 60 fps footage:
- Selecting a label pops the word and blade from 55% to full size in 100 ms, with a quadratic ease-out about the centre. Selected labels then sit slightly larger: ×1.12 for navigation and filters, ×1.06 for actions and trophy names.
- Deselection is instant, with no fade-out.
- Only the pink echo pulses. It scales 5% about the corner below the tip, peaking at 100 ms and back by 217 ms, every 1.00 s; the first beat fires on selection.
- Reduced motion disables the pop and the pulse.

## Components

### Buttons

Project action links show the P3R blade on hover or keyboard focus, measured against the text and icon (not the button padding). Only the primary action has a project-coloured echo; Code, Watch Demo/Promo, View Project and Devpost use pink. Legacy SVG borders, spinning trails and corner brackets are removed. Keyboard focus uses the wedge plus a label underline. Social links (GitHub, LinkedIn, email, CV) are unboxed icons with small lowercase labels. They are spread evenly across the sparkle rule's 290px width and centred under its star. The CV moved there from the header. The About heading carries the same right-hand sparkle as Projects and Fun Stuff.

"TAKE A LOOK AROUND" is the original landing page's bouncing scroll cue: the label sits over a softly bouncing chevron, centred at the bottom of the hero (in the flow, under the icons, on phones). It replaces the old white button and eases the page down to Projects over 0.7–1.4s instead of jumping (`components/landing/scroll-cue.tsx`). Any wheel, touch or key input cancels the ease, reduced motion jumps directly, and focus lands on the projects section.

### Filters and selectors

Projects show as one grid headed TROPHY GALLERY. The interaction hint ("Drag a trophy to turn it. Click a project name to open it.") lives behind one ⓘ button beside the heading and appears on hover or focus; it is not repeated elsewhere. ALL / GAMES / TOOLS / DESIGN filters (with counts, `aria-pressed`, P3R blades) use the categories in `lib/landing-projects.ts`. A project can sit in more than one (Aegis is both TOOLS and DESIGN). Old `?filter=case-studies|code` links fall back to ALL.
- Each trophy caption is one link to its destination, labelled `case study →` or `project →`.
- Projects with a case study go straight to it. The other nine open `/projects/<slug>`: a small "← all projects" breadcrumb above the status chip in the hero copy, a large turnable trophy, status, hook, tags, the full description, a "Submitted to" block for hackathon projects, the gallery, and every link (play/view project, code, devpost, and video in a native dialog).
- Under the description (and the "Submitted to" block), a gallery shows the project's cover as its first tile, then its curated images (`components/project-gallery.tsx`, data in `lib/project-gallery.data.json`) as a thumbnail grid. A thumbnail opens a native `<dialog>` lightbox with the full image, its alt text and team credit; ← and → step through, Escape closes and focus returns to the tile. The gallery is hidden when only the cover exists, since it would repeat the hero poster (no project is in that state now). Covers are credited per project (the Catfish and Appeara covers name their teams).
- Projects submitted to a hackathon (`lib/hackathons.ts`) show a "Submitted to" block (`components/project-hackathon.tsx`) under the description, with the event logo, its name and any award. There is no Devpost link in it; the action row already has one.
- `lib/project-pages.ts` owns slugs, destinations and link lists. `node --test scripts/tests/*.test.mjs` checks that no link is lost, and `node scripts/verify-projects.mjs` checks every trophy in the browser.

### Cards / Containers

The carousel was removed on 2026-10-04; its content lives on project pages (`components/project-page.tsx`, `components/project-actions.tsx`).

### Case study pages

All seven case studies share one frame (`components/case-study-shell.tsx`): the site header, the sticky section bar (with "← all projects" pinned at its left end, after which a 1px divider; it is a plain link, not a section entry), the page's own sections, then the colophon footer. The landing and project pages use the same header and footer (`components/site-header.tsx`, `components/site-footer.tsx`), so every page carries the same top and bottom. Off the landing the header links are `next/link`; on it they stay in-page anchors. The section bar (`components/case-study-nav.tsx`) lists every section heading (`section h2`), numbered or not, as P3R-style links: the active one shows the blade in the project colour, the previous one vanishes, and a click eases to the section (a jump under reduced motion) and moves focus into it. The bar reserves its height before hydration, so nothing shifts, and a `#section` deep link scrolls once the ids exist. Colours too dark for the bar (Arc, Inclusion, UTD CSA) use the brightened variant of the project colour. On phones the bar scrolls sideways and keeps the active entry in view.

The parallelogram callouts sit in `SlantCard` (`components/slant-card.tsx`): a skewed card whose text follows the slant, with each line inset to the parallelogram's edge. Cards are snug to their text, and cards in one row stretch to the tallest. Hero: a white CASE STUDY chip, the title, and a year · role line (`CaseStudyLabel`, `CaseStudyMeta`). Section headings are display italics (Barlow Condensed 900 italic, tight tracking) with a muted numeral above numbered ones (`SectionNumber`). The lightbox's close and prev/next buttons are square and framed like the project gallery's (`lightboxControl`). The action row, in a late section of most pages (Delhi and UTD CSA have none), comes from `projectLinks(project)` and uses the project action buttons above; the case-study kind is left out because it points at the page itself, and Aegis and Preface leave out the video button because their video is embedded inline. `node scripts/verify-case-studies.mjs` checks the frame, the bar, every link, and overflow at 390px (by element rects, since `.site` clips).

### Navigation

Work, about and Fun Stuff sit beside the wordmark; contact lives in the hero icons and the footer signature. Pointer hover and keyboard focus select a link. As in P3R, the previous highlight vanishes and the new blade pops in, rather than one highlight sliding between links. Mobile places the wordmark above a full-width navigation row. A keyboard-visible skip link leads to main content.

### Linked biography and About

Inline 21px assets use actual school/company logos and transparent project marks (the Sonare microphone and the Pawkour paw), not squeezed thumbnails; 17px symbols represent links without a suitable brand asset. About uses arrow bullets and links for work, studies, CV-supported track placements, scholarships, and design work. Track-specific placements are not presented as overall hackathon wins.

### Footer

The footer is a centred colophon below a thin rule:
- A signature line from the original site: "© year RAJIT GOEL ✦ email", in display italics with a white sparkle.
- "made with ♥ and 🍵 using next.js, react, three.js, and tailwind css.", in the style of Daniel Pu's site. The heart is P3R red, and each technology links to its site.
- "last updated:" with the build date, in Eastern time. The date (and the © year) come from `NEXT_PUBLIC_BUILD_DATE`, set in `next.config.mjs`, so client-side navigation shows the deploy date, not the visitor's clock.

### Fun Stuff and motion

Four-point sparkles return in the hero separator and section headings. Currently playing shows Overwatch 2, Destiny 2, and Metaphor: ReFantazio; the Destiny tricorn is a local white SVG. Original album destinations remain. Records sit fully inside their sleeves at rest, with no peek. Hover or focus slides the vinyl out (38% translation, 35-degree rotation) while the sleeve shifts −4% and rotates −3 degrees. The first two columns are 1.42 tiles wide, so a pulled record never reaches the next album. On phones the pull shortens to 16% to stay inside the gap. Reduced-motion preferences disable transitions and animations, including wedges and border movement.

### Portrait

`public/avatar/rajit-graphic.png` is a static generated concept. It is not a Live2D model and has no layered source art or Cubism rig. Tracking, blinking, expressions, and rigging remain separate future work.

## Do's and Don'ts

### Do:
- **Do** preserve the original 14-degree slant geometry, linked bio, and black-and-white framing.
- **Do** anchor the P3R selection blade to words and preserve visible keyboard focus.
- **Do** keep the name beneath the static portrait and About open and readable.

### Don't:
- **Don't** restore warm editorial styling, cyan title/border highlights, or oversized hero lettering.
- **Don't** replace selection blades with cursor arrows or underline-like shapes.
- **Don't** describe the static portrait as rigged or this homepage work as a detail-page redesign.

## Trophy collection

All 14 original projects retain exactly the original descriptions, tags, statuses, image paths and links (verified against Git HEAD). The former index is replaced with an open 3-column trophy collection, 2 columns at 1050px and two compact columns at 760px. No enclosing card borders. Each trophy shows its name on its own line, with the year small right below it in muted display italics. The destination label sits at the right of the year's row. Below come a hook, Rajit's roles and the tags. The hook is the first sentence of the project's own description (`projectHook`), not separate marketing copy. The roles are listed plainly in body text, with no label and no separator glyphs. Selecting a label opens the project's case study or project page. Project pages show the year small right below the title, then the roles. Hovering or focusing the Aegis exhibit fades in the original Aigis easter egg (`/aigis-easter-egg.png`) above its trophy.

Each project has its own trophy, authored in `tools/trophy-studio/`, on the shared faceted dark/white platter. The studio's `docs/asset-inventory.md` records sources, licences and status.
- **Pawkour and Eukarya** use the games' own meshes, posed and baked to GLB from frames of their original animations (`public/trophies/`). Pawkour is the playable cat taking off from a lab ledge; Eukarya is the Tiktaalik hauling out of the water.
- **SONARE.LIVE** is the title logo's microphone wrapped in the game's Koi Swim gesture.
- **The other 11** are their project logos in 3D, built in code from vector layers. These are provisional traces of the exported logos until the Figma masters are available.

Lighting is the studio's "Soft" setup: hemisphere 1.5, key 2.5, project-coloured rim 1.4, and Khronos Neutral tone mapping, so brand colours keep their hue instead of clipping to white.

Three.js and the trophy models load only when the trophy collection approaches the viewport. The two GLB trophies appear when loaded; one that arrives after the view is released is freed rather than shown. A single viewport-sized canvas renders visible exhibit scenes. Trophies spin slowly (0.45 rad/s) from load, so they read as objects you can pick up. Picking one up (pointer down) or pressing "turn" stops only that trophy, which stays where it's left; "reset" restores its angle and restarts the spin. Only on-screen trophies animate, and the render loop stops when none are spinning on screen or the tab is hidden. `prefers-reduced-motion: reduce` disables the spin entirely. Pointer drag turns an exhibit; mouse also allows a bounded tilt. Touch permits vertical page scrolling. Static project artwork remains if WebGL fails. Geometry, materials, textures, listeners, frames, observer and context are released when the view/filter unmounts; filters remount the canvas to avoid reusing a deliberately released context.
