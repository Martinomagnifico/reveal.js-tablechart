import { rmSync } from 'node:fs'

// Empties the build folders before a build.
for (const folder of ['demo', 'plugin']) rmSync(folder, { recursive: true, force: true })
