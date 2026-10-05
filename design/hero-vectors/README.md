# Hero vectors (Rajit's traces)

Rajit's hand-traced SVGs for the landing hero's Persona 5-style battle menu and dialogue box. They were exported from the "Portfolio Website" Figma file; that file is the master copy.

- `menu-pieces/`: slab and red-plate pieces of the battle menu. Their transformed paths ship in `components/landing/battle-menu-shapes.ts`.
- `buttons/`: PlayStation button glyphs. Their paths ship unchanged in `components/landing/battle-menu-buttons.ts`.
- `nameplate/`: the dialogue nameplate and box layers. These are inlined in `components/landing/p5-dialogue.tsx`.

These files were recovered on 2026-10-04 from a build session log, after the untracked `tools/hero-mock` folder was deleted. Some layout pieces from the `traced2`/`traced4` exports were not in the log; their exact paths survive only as the transformed paths in `battle-menu-shapes.ts`.
