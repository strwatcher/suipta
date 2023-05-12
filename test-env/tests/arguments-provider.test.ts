import fs from 'node:fs'
import { it, expect, describe } from 'vitest'
import { getArguments, writeArguments } from 'suipta'
import path from 'node:path'

const argumentsPath = path.join(process.cwd(), 'tests/arguments.yaml')

describe('Arguments provider tests', () => {
  it('writing of arguments should create arguments.yaml in bin directory', () => {
    writeArguments({ model: 'redux' }, argumentsPath)
    expect(fs.existsSync(argumentsPath)).toBe(true)
  })

  it('args value should be immutable', () => {
    writeArguments({ model: 'effector', ui: 'react' }, argumentsPath)
    expect(fs.existsSync(argumentsPath)).toBe(true)

    const args = getArguments(argumentsPath)

    expect(args).toEqual({ model: 'effector', ui: 'react' })
  })
})
