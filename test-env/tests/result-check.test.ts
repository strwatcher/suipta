import { it, expect, describe, beforeAll } from 'vitest'
import fs from 'fs'
import { runPlop } from 'suipta'
import { generationPath } from '../src/helpers'

describe('Check result of generation', () => {
  beforeAll(() => {
    if (fs.existsSync(generationPath)) {
      fs.rmdirSync(generationPath, { recursive: true })
    }
  })

  it('on the first creation all should be fine', async () => {
    const result = await runPlop(
      {
        generator: 'slice',
        layer: 'entities',
        slice: 'first-creation',
      },
      './bin/plopfile.js'
    )
    expect(result.failures.length).toBe(0)
    expect(result.changes.length > 0).toBe(true)
  })

  it('if slice already exists failures array should have elements', async () => {
    const result = await runPlop(
      {
        generator: 'slice',
        layer: 'entities',
        slice: 'create-twice',
      },
      './bin/plopfile.js'
    )
    expect(result.failures.length).toBe(0)
    expect(result.changes.length > 0).toBe(true)

    const secondResult = await runPlop(
      {
        generator: 'slice',
        layer: 'entities',
        slice: 'create-twice',
      },
      './bin/plopfile.js'
    )

    expect(secondResult.failures.length > 0).toBe(true)
    expect(secondResult.changes.length).toBe(0)
  })
})
