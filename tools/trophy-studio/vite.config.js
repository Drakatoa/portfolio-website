import { defineConfig } from "vite"

// The portfolio's public/ folder is served at / so source references (key art,
// case-study images) can sit beside the models without copying them.
export default defineConfig({
  publicDir: "../../public",
  server: { fs: { allow: [".", "../../public"] } },
})
