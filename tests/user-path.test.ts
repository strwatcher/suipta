import { it, expect, beforeEach, afterAll, describe } from 'vitest'
import fs from 'fs'
import { runPlop } from '../src/plop'

describe('Check result of generation', () => {
  beforeEach(() => {
    if (fs.existsSync('./tests/src')) {
      fs.rmSync('./tests/src', { recursive: true, force: true })
    }
  })

  it('without extra args', async () => {
    const result = await runPlop(
      {
        generator: 'slice',
        layer: 'entities',
        slice: 'water',
      },
      './bin/plopfile.js'
    )
    console.log(result)
    expect(result.failures.length).toBe(0)
    expect(result.changes.length > 0).toBe(true)
    expect(fs.existsSync('./tests/src/entities/water'))
  })
})
