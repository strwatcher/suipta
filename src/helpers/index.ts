import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const __packageDir = dirname(fileURLToPath(import.meta.url))
export const __dirname = process.cwd()
