import pkg from './package.json' with { type: 'json' }

// The plugin's name comes from package.json, so a rename only has to change it there.
const name = pkg.name.replace('reveal.js-', '')
const functionname = name[0].toUpperCase() + name.slice(1)

export default {
  functionname,
  demo: {
    presentation: {
      title: `${functionname} demo`,
      theme: "black"
    },
    server: {
      port: 8000,
      open: "index.html"
    }
  }
}
