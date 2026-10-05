// Trophy models by project ID, authored in tools/trophy-studio (see its README and
// docs/asset-inventory.md for sources, licences and provenance). Logo trophies are
// built in code; the two game meshes load as GLB from public/trophies/.
import type * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { create as preface } from "./factories/preface.js"
import { create as aegis } from "./factories/aegis.js"
import { create as sonare } from "./factories/sonare.js"
import { create as auralis } from "./factories/auralis.js"
import { create as ideate } from "./factories/ideate.js"
import { create as arrestoriq } from "./factories/arrestoriq.js"
import { create as inclusion } from "./factories/inclusion.js"
import { create as hackmate } from "./factories/hackmate.js"
import { create as delhi } from "./factories/delhi.js"
import { create as zenz } from "./factories/zenz.js"
import { create as arc } from "./factories/arc.js"
import { create as csa } from "./factories/csa.js"
import { create as catfish } from "./factories/catfish.js"
import { create as appeara } from "./factories/appeara.js"

export type TrophyModel = () => THREE.Object3D | Promise<THREE.Object3D>

const glb = (file: string): TrophyModel => async () => (await new GLTFLoader().loadAsync(`/trophies/${file}`)).scene

export const trophyModels: Record<string, TrophyModel> = {
  "001": preface,
  "002": aegis,
  "012": sonare,
  "016": appeara,
  "003": glb("003-project-pawkour.glb"),
  "004": auralis,
  "005": ideate,
  "013": arrestoriq,
  "014": glb("014-eukarya.glb"),
  "006": inclusion,
  "007": hackmate,
  "015": catfish,
  "008": delhi,
  "009": zenz,
  "010": arc,
  "011": csa,
}
