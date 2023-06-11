import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const __packageDir = dirname(fileURLToPath(import.meta.url))
export const __dirname = process.cwd()
export const plopPath = path.join(__packageDir, 'plop.js')
export const plopfilePath = path.join(__packageDir, 'plopfile.js')
export const argumentsPath = path.join(__packageDir, 'arguments.yaml')



