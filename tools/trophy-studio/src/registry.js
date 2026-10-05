// One entry per project in lib/projects.ts. `create()` returns the model only;
// the shared platter, lights and camera are added by the renderer (src/shared.js).
// status: "original-asset" | "original-vector" | "traced-export" | "source-grounded" | "fallback"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

const gltf = (file) => async () => (await new GLTFLoader().loadAsync(`/models/${file}`)).scene
const factory = (load) => async () => (await load()).create()

export const trophies = [
  { id: "001", title: "PREFACE", accent: "#70587C", status: "traced-export", artifact: "Preface F-block mark with ✗/✓ assessment tiles", reference: "/prefaceproject.png", create: factory(() => import("./factories/preface.js")) },
  { id: "002", title: "AEGIS", accent: "#5AD0FF", status: "traced-export", artifact: "Aegis shield: swirl, sun and gold rim", reference: "/aegisproject.png", create: factory(() => import("./factories/aegis.js")) },
  { id: "012", title: "SONARE.LIVE", accent: "#39C5BB", status: "source-grounded", artifact: "Title-logo microphone with a Koi Swim gesture ribbon", reference: "/sonare.live.png", create: factory(() => import("./factories/sonare.js")) },
  { id: "016", title: "APPEARA", accent: "#B9A8F0", status: "traced-export", artifact: "Appeara app icon: character with pencil and star on the dark tile", reference: "/appeara.png", create: factory(() => import("./factories/appeara.js")) },
  { id: "003", title: "PROJECT PAWKOUR", accent: "#3fd3e3", status: "original-asset", artifact: "The game's cat at the take-off frame of its run cycle", reference: "/projectpawkour.png", create: gltf("003-project-pawkour.glb") },
  { id: "004", title: "AURALIS", accent: "#5ff6ff", status: "traced-export", artifact: "Auralis nine-bar waveform mark", reference: "/auralisproject.png", create: factory(() => import("./factories/auralis.js")) },
  { id: "005", title: "IDEATE - AI WHITEBOARD", accent: "#5870BC", status: "traced-export", artifact: "Ideate speech bubble with circuit-brain sketch", reference: "/ideateproject.png", create: factory(() => import("./factories/ideate.js")) },
  { id: "013", title: "ARRESTORIQ", accent: "#E8742C", status: "traced-export", artifact: "ArrestorIQ 'Ar' disc with folded corner", reference: "/arrestoriq.png", create: factory(() => import("./factories/arrestoriq.js")) },
  { id: "014", title: "EUKARYA", accent: "#6FBF73", status: "original-asset", artifact: "The game's Tiktaalik hauling out of the water", reference: "/eukarya.png", create: gltf("014-eukarya.glb") },
  { id: "006", title: "DESIGN FOR INCLUSION", accent: "#9b59d0", status: "traced-export", artifact: "DEI letters in the nonbinary-flag colours", reference: "/deiproject.png", create: factory(() => import("./factories/inclusion.js")) },
  { id: "007", title: "HACKMATE", accent: "#e040b0", status: "traced-export", artifact: "HackMate />/ mark as three standing pieces", reference: "/hackmateproject.png", create: factory(() => import("./factories/hackmate.js")) },
  { id: "015", title: "CATFISH", accent: "#AA392D", status: "traced-export", artifact: "\"catfish.\" wordmark on a paper backing, red full stop", reference: "/catfish.png", create: factory(() => import("./factories/catfish.js")) },
  { id: "008", title: "HOMETOWN OLYMPICS: NEW DELHI", accent: "#FF6B35", status: "traced-export", artifact: "Lotus-torch emblem (hypothetical identity project)", reference: "/delhi-logo-with-symbolism.png", create: factory(() => import("./factories/delhi.js")) },
  { id: "009", title: "ZENZ", accent: "#EC76C3", status: "traced-export", artifact: "Zenz lotus line mark", reference: "/zenz-brand-identity-logo-typography.png", create: factory(() => import("./factories/zenz.js")) },
  { id: "010", title: "ARC", accent: "#9a9ca3", status: "traced-export", artifact: "Arc 'A' with arched crossbar on its app-icon tile", reference: "/arcproject.png", create: factory(() => import("./factories/arc.js")) },
  { id: "011", title: "UTD CSA SHIRT DESIGN", accent: "#455668", status: "traced-export", artifact: "P.F. Wang's chef-tiger emblem", reference: "/csaproject.png", create: factory(() => import("./factories/csa.js")) },
]
