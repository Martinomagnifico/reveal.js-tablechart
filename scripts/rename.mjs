import fs from 'fs-extra'
import { join, dirname, basename, extname } from 'path'
import { fileURLToPath } from 'url'

// Renames the plugin everywhere in the source: `npm run rename -- newname`.
// It replaces the lowercase, capitalised and uppercase forms of the old name in
// file contents, and renames files and folders whose name contains it. The old
// name is read from package.json. If the source still uses an older name, pass
// it with `--from oldname`. Add `--dry` to see what would change.
//
// The build output in `demo` and `plugin` is left alone. Run `npm run build`
// afterwards to rebuild it under the new name.

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(fs.readFileSync(join(root, 'package.json'), 'utf8'))

const args = process.argv.slice(2)
const dry = args.includes('--dry')
const fromIndex = args.indexOf('--from')
const from = (fromIndex > -1 ? args[fromIndex + 1] : pkg.name.replace('reveal.js-', ''))?.toLowerCase()
const to = args.find((arg, i) => !arg.startsWith('--') && (fromIndex === -1 || i !== fromIndex + 1))?.toLowerCase()

if (!to || !from || !/^[a-z][a-z0-9]*$/.test(to)) {
  console.error('Usage: npm run rename -- newname [--from oldname] [--dry]')
  console.error('The name must be lowercase letters and digits, starting with a letter.')
  process.exit(1)
}
if (from === to) {
  console.log(`The plugin is already called "${to}".`)
  process.exit(0)
}

const capitalise = (s) => s[0].toUpperCase() + s.slice(1)
const pairs = [
  [from.toUpperCase(), to.toUpperCase()],
  [capitalise(from), capitalise(to)],
  [from, to],
]
const replaceNames = (text) => pairs.reduce((out, [a, b]) => out.split(a).join(b), text)

const rootFiles = [
  'package.json',
  'package-lock.json',
  'plugin.config.js',
  'vite.config.ts',
  'vite.lib.config.ts',
  'README.md',
  'NOTES.md',
  'CHANGELOG.md',
]
const skipDirs = new Set(['node_modules', '.git', '.DS_Store'])
const textExtensions = new Set(['.ts', '.js', '.mjs', '.json', '.md', '.scss', '.css', '.pug', '.html', '.txt'])

// Every folder under `src`, deepest first, so a folder is renamed after its contents.
const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const paths = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue
      paths.push(...(await walk(path)), path)
    } else {
      paths.push(path)
    }
  }
  return paths
}

const paths = [
  ...rootFiles.map((file) => join(root, file)).filter((path) => fs.existsSync(path)),
  ...(await walk(join(root, 'src'))),
]

let edited = 0
let renamed = 0

for (const path of paths) {
  const isFile = (await fs.stat(path)).isFile()
  if (isFile && textExtensions.has(extname(path))) {
    const text = await fs.readFile(path, 'utf8')
    const next = replaceNames(text)
    if (next !== text) {
      edited++
      console.log(`edit    ${path.slice(root.length + 1)}`)
      if (!dry) await fs.writeFile(path, next)
    }
  }

  const name = basename(path)
  const nextName = replaceNames(name)
  if (nextName !== name) {
    renamed++
    const nextPath = join(dirname(path), nextName)
    console.log(`rename  ${path.slice(root.length + 1)} -> ${nextName}`)
    if (!dry) await fs.move(path, nextPath)
  }
}

console.log(`\n${dry ? 'Would change' : 'Changed'} ${edited} file(s) and renamed ${renamed}, from "${from}" to "${to}".`)
if (!dry) {
  console.log('Run `npm run build` to rebuild `demo` and `plugin` under the new name.')
  console.log('If the GitHub repository has the old name, rename it there too.')
}
