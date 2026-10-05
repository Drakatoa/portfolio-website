// Shared harness: a Vite server for the studio plus a WebGL-capable Chromium page.
import { createServer } from "vite"
import { chromium } from "playwright-core"
import { existsSync, readdirSync } from "node:fs"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

export const root = join(dirname(fileURLToPath(import.meta.url)), "..")

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH
  const cache = join(homedir(), "Library/Caches/ms-playwright")
  const builds = existsSync(cache) ? readdirSync(cache).filter((name) => /^chromium-\d+$/.test(name)).sort().reverse() : []
  for (const build of builds) {
    const app = join(cache, build, "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing")
    if (existsSync(app)) return app
  }
  for (const app of ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium"]) if (existsSync(app)) return app
  throw new Error("No Chromium found. Set CHROME_PATH or run `npx playwright install chromium`.")
}

export async function openStudio({ path = "/", width = 1280, height = 900, scale = 1 } = {}) {
  const server = await createServer({ root, logLevel: "error", server: { port: 0 } })
  await server.listen()
  const { port } = server.httpServer.address()
  const browser = await chromium.launch({ executablePath: findChrome(), headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] })
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale })
  const errors = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()) })
  await page.goto(`http://localhost:${port}${path}`)
  return {
    page, errors, url: `http://localhost:${port}`,
    async close() { await browser.close(); await server.close() },
  }
}
