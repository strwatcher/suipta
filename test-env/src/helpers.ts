import fs from 'fs'
import path from 'path'
import { expect } from 'vitest'
export const generationPath = path.join(process.cwd(), 'tests/src')
export const resultsPath = path.join(process.cwd(), 'tests/result-examples')

export function testEntities(name: string) {
  const slicePath = path.join(generationPath, 'entities', name)
  const resultPath = path.join(resultsPath, 'entities', name)
  const pathsToCheck = [
    path.join('ui', 'index.tsx'),
    path.join('ui', 's.module.scss'),
    path.join('model', 'index.ts'),
    'types.ts',
    'index.ts',
  ]
  pathsToCheck.forEach(item => {
    expect(fs.readFileSync(path.join(slicePath, item)).toString()).toMatch(
      fs.readFileSync(path.join(resultPath, item)).toString()
    )
  })
}
