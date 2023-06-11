import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const __packageDir = dirname(fileURLToPath(import.meta.url)).split(path.sep).join(path.posix.sep)
export const __dirname = process.cwd()
export const plopPath = path.posix.join(__packageDir, 'plop.js')
export const plopfilePath = path.posix.join(__packageDir, 'plopfile.js')
export const argumentsPath = path.posix.join(__packageDir, 'arguments.yaml')
