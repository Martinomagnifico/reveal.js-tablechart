import fs from 'fs-extra'

// reveal.js 6 ships its plugins inside `dist/plugin`, so copying `dist` brings
// them along. 5.x keeps them in a top-level `plugin` folder, which is copied
// alongside when it is there — the demo highlights its code examples with one.
const copyRevealFiles = async () => {
 try {
   await fs.copy(
     'node_modules/reveal.js/dist',
     'demo/dist'
   )

   if (await fs.pathExists('node_modules/reveal.js/plugin')) {
     await fs.copy('node_modules/reveal.js/plugin', 'demo/plugin')
   }

   console.log('✓ Successfully copied reveal.js files')
 } catch (err) {
   console.error('Error copying reveal.js files:', err)
   process.exit(1)
 }
}

copyRevealFiles()
