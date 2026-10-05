// Usage (repo root): node scripts/collect-gallery.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import sharp from "sharp";
import { SOURCES, CAPTURED } from "./gallery-sources.mjs";

const root = resolve(import.meta.dirname, "..");
const manifestPath = join(root, "lib/project-gallery.data.json");
const MAX_BYTES = 300 * 1024;
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

const prev = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
// Alt text is preserved per image, keyed on the image's own origin (URL, repo path or file), not the credit page.
const originOf = (s) => s.url ?? (s.repo ? `${s.repo}:${s.path}` : s.pdfPage ? `${s.file}#page=${s.pdfPage}` : s.file);
const altByOrigin = new Map();
for (const list of Object.values(prev)) for (const e of list) if (e.alt && e.origin) altByOrigin.set(e.origin, e.alt);

async function encode(buf, quality, crop) {
  let img = sharp(buf);
  if (crop?.width && crop?.height) {
    img = sharp(await img.extract({ left: crop.left ?? 0, top: crop.top ?? 0, width: crop.width, height: crop.height }).toBuffer());
  } else if (crop?.top) {
    const { width, height } = await img.metadata();
    img = sharp(await img.extract({ left: 0, top: crop.top, width, height: height - crop.top }).toBuffer());
  }
  return img.resize({ width: 1600, withoutEnlargement: true }).webp({ quality }).toBuffer({ resolveWithObject: true });
}

function resetDir(dir) {
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(dir)) if (f.endsWith(".webp")) rmSync(join(dir, f));
}

async function load(s) {
  if (s.url) {
    const r = await fetch(s.url, { headers: { "User-Agent": UA } });
    if (!r.ok) throw new Error(`${r.status} ${s.url}`);
    return Buffer.from(await r.arrayBuffer());
  }
  if (s.repo) {
    return execFileSync("gh", ["api", `repos/${s.repo}/contents/${encodeURIComponent(s.path)}`, "-H", "Accept: application/vnd.github.raw"], { maxBuffer: 64 * 1024 * 1024 });
  }
  const file = join(root, s.file);
  if (s.pdfPage) {
    const out = join(tmpdir(), `gallery-${Date.now()}.png`);
    execFileSync("sips", ["-s", "format", "png", "--resampleWidth", "2000", file, "--out", out]);
    const buf = readFileSync(out);
    rmSync(out);
    return buf;
  }
  return readFileSync(file);
}

const manifest = {};
for (const [slug, list] of Object.entries(SOURCES)) {
  if (list === CAPTURED) {
    manifest[slug] = prev[slug] ?? [];
    console.log(`== ${slug}: ${manifest[slug].length} images (captured, kept as is)`);
    continue;
  }
  const dir = join(root, "public/projects", slug);
  resetDir(dir);
  if (list.length === 0) {
    rmSync(dir, { recursive: true, force: true });
    manifest[slug] = [];
    console.log(`== ${slug}: 0 images (pending)`);
    continue;
  }
  manifest[slug] = [];
  let n = 0;
  for (const s of list) {
    const buf = await load(s);
    let q = 82;
    let out = await encode(buf, q, s.crop);
    if (out.data.length > MAX_BYTES) {
      q = 70;
      out = await encode(buf, q, s.crop);
    }
    n += 1;
    const name = `${String(n).padStart(2, "0")}.webp`;
    writeFileSync(join(dir, name), out.data);
    manifest[slug].push({
      src: `/projects/${slug}/${name}`,
      width: out.info.width,
      height: out.info.height,
      alt: altByOrigin.get(originOf(s)) ?? "",
      credit: s.credit,
      source: s.source,
      origin: originOf(s),
    });
    console.log(`${slug}/${name}  ${out.data.length} B  q${q}  ${out.info.width}x${out.info.height}${out.data.length > MAX_BYTES ? "  OVER 300KB" : ""}  <- ${s.url ?? s.path ?? s.file}`);
  }
  console.log(`== ${slug}: ${n} images`);
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
