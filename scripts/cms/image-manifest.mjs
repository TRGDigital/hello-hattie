// Runs before every build: lists every photo in public/images with its size, and the default alt
// text the code gives it, for the admin's Images page. Writes lib/image-manifest.json.
import fs from 'fs'
import path from 'path'

function jpegSize(buf) {
  let i = 2
  while (i < buf.length) {
    if (buf[i] !== 0xff) return null
    const m = buf[i + 1], len = buf.readUInt16BE(i + 2)
    if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
    i += 2 + len
  }
  return null
}
function pngSize(buf) { return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) } }

// Default alt text: any `src: '/images/x', brief: '...'` pair or altFor('/images/x', '...') call in the code.
const defaults = {}
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? (['node_modules', '.next'].includes(e.name) ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)])
for (const f of [...walk('app'), ...walk('components'), ...walk('content')].filter((f) => /\.(tsx?|mts)$/.test(f))) {
  const s = fs.readFileSync(f, 'utf8')
  for (const m of s.matchAll(/src:\s*'(\/images\/[^']+)',\s*brief:\s*'([^']+)'/g)) defaults[m[1]] ??= m[2]
  for (const m of s.matchAll(/altFor\('(\/images\/[^']+)',\s*'([^']+)'\)/g)) defaults[m[1]] ??= m[2]
  for (const m of s.matchAll(/src="(\/images\/[^"]+)"[^>]*?(?:brief|alt)="([^"]+)"/g)) defaults[m[1]] ??= m[2]
}

const dir = 'public/images'
const images = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort().map((f) => {
  const buf = fs.readFileSync(path.join(dir, f)), src = `/images/${f}`
  const size = /\.png$/i.test(f) ? pngSize(buf) : jpegSize(buf)
  return { src, width: size?.width ?? null, height: size?.height ?? null, kb: Math.round(buf.length / 1024), defaultAlt: defaults[src] ?? '' }
})
fs.writeFileSync('lib/image-manifest.json', JSON.stringify(images, null, 1))
console.log(`image manifest: ${images.length} images, ${images.filter((i) => i.defaultAlt).length} with default alt`)
