// Pinned image sources per project slug. Order here is the gallery order.
// Each entry: { url } | { repo, path } | { file, pdfPage? }, plus credit and source.
const itch = (id) => ({
  url: `https://img.itch.zone/${id}`,
  credit: "Drakatoa & Porukana",
  source: "https://porukana.itch.io/sonarelive",
});
// `crop: { top }` removes that many source pixels from the top before resizing (browser chrome).
// `crop: { left, top, width, height }` keeps just that box (editor screenshots cut to the Game view).
const IDEATE = { credit: "Ideate team (HackUTD 2025)", source: "https://devpost.com/software/ideate-mratxn" };
const CATFISH = { credit: "Catfish team (HackGT 13)", source: "https://devpost.com/software/catfish-training-against-romance-scams" };
const APPEARA = { credit: "Appeara team (Hack the North 2026)", source: "https://devpost.com/software/ink-bound" };
const devpost = (n, extra = {}) => ({
  ...IDEATE,
  ...extra,
  url: `https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/${n}/datas/original.png`,
});
// Mac editor screenshot: Game view only (no toolbars, no Hierarchy panel).
const MAC_GAME = { left: 2, top: 222, width: 1490, height: 735 };
// Windows editor screenshots: Game view only (no pillarbox bars, menus or console line).
const WIN_GAME = { left: 218, top: 168, width: 1485, height: 826 };
const auralis = (n) => ({
  repo: "Drakatoa/Auralis",
  path: `beta_images/img${n}.png`,
  credit: "Rajit Goel & Auralis team",
  source: `https://github.com/Drakatoa/Auralis/blob/main/beta_images/img${n}.png`,
});

export const CAPTURED = "captured";

export const SOURCES = {
  "sonare-live": [
    itch("aW1hZ2UvNDcyNzMzNy8yODE5MjEwOC5qcGc=/original/GsiBjK.jpg"),
    itch("aW1hZ2UvNDcyNzMzNy8yODE5MjEwNS5qcGc=/original/F0onF5.jpg"),
    itch("aW1hZ2UvNDcyNzMzNy8yODE5MjEwNy5qcGc=/original/vPHM8E.jpg"),
    itch("aW1hZ2UvNDcyNzMzNy8yODE5MjEwNi5wbmc=/original/yD34ZF.png"),
    itch("aW1hZ2UvNDcyNzMzNy8yODE5MjEwNC5wbmc=/original/cJoaA8.png"),
    itch("aW1hZ2UvNDcyNzMzNy8yODE5MjEwOS5wbmc=/original/1DA6co.png"),
  ],
  "ideate-ai-whiteboard": [
    // Dropped: 003/959/403 (near-duplicate landing, shows a person's name), 003/959/445 (export summary,
    // "Unknown" fields), and the repo's product-diagram-wireframe-sketch.jpg (generic phone line art, not product UI).
    devpost("003/959/399"), devpost("003/959/410"), devpost("003/959/425"),
    devpost("003/959/439"), devpost("003/960/128"), // These three exports show a teammate's local file path in the browser chrome (about 240 px at 3808 px wide).
    devpost("003/959/449", { crop: { top: 245 } }),
    devpost("003/959/448", { crop: { top: 245 } }),
    devpost("003/959/446", { crop: { top: 245 } }),
  ],
  // img7 (account settings) dropped: shows a personal email address.
  auralis: [1, 2, 3, 4, 5, 6].map(auralis),
  // Captured with Playwright from the team repo run locally, seeded with fictional demo users and groups
  // (2026-10-04). Nothing to re-download, so the collector keeps these as they are.
  hackmate: CAPTURED,
  // Captured in the Unity editor while Rajit played (2026-10-04). There is no upstream file to
  // re-download, so the collector keeps the existing webps and manifest entries as they are.
  "project-pawkour": CAPTURED,
  // Captured in the Unity editor from the LatestAI branch while Rajit played (2026-10-04); kept as is.
  eukarya: CAPTURED,
  catfish: ["718", "719", "720", "721", "750"].map((n) => devpost(`005/397/${n}`, CATFISH)),
  appeara: [
    devpost("005/354/582", { ...APPEARA, crop: MAC_GAME }),
    devpost("005/354/712", APPEARA),
    devpost("005/354/713", APPEARA),
    devpost("005/354/714", { ...APPEARA, crop: WIN_GAME }),
    devpost("005/354/715", { ...APPEARA, crop: WIN_GAME }),
    devpost("005/354/716", { ...APPEARA, crop: WIN_GAME }),
  ],
  arrestoriq: [
    { file: "public/arrestoriqposter.pdf", pdfPage: 1, credit: "ArrestorIQ capstone team (UTD × Emerson)", source: "public/arrestoriqposter.pdf" },
    // public/arrestoriq.png dropped: Emerson and Ar logos only, not product UI.
  ],
};
