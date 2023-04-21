import { it, expect, beforeEach, afterAll, describe } from 'vitest'
import fs from 'fs'
import { runPlop } from '../src/plop'

describe('Check result of generation', () => {
  beforeEach(() => {
    if (fs.existsSync('./tests/src')) {
      fs.rmSync('./tests/src', { recursive: true, force: true })
    }
  })

  it('on the first creation all should be fine', async () => {
    const result = await runPlop(
      {
        generator: 'slice',
        layer: 'entities',
        slice: 'test',
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
        slice: 'test',
      },
      './bin/plopfile.js'
    )
    expect(result.failures.length).toBe(0)
    expect(result.changes.length > 0).toBe(true)

    const secondResult = await runPlop(
      {
        generator: 'slice',
        layer: 'entities',
        slice: 'test',
      },
      './bin/plopfile.js'
    )

    expect(secondResult.failures.length > 0).toBe(true)
    expect(secondResult.changes.length).toBe(0)
  })

  afterAll(() => {
    if (fs.existsSync('./tests/src')) {
      fs.rmSync('./tests/src', { recursive: true, force: true })
    }
  })
})
