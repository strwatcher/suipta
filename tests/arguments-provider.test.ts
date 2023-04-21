import fs from 'node:fs'
import { it, expect, expectTypeOf, describe } from 'vitest'
import { getArguments, writeArguments } from '../src/arguments'
import { SuiptaArguments } from '../src/arguments/types'

const argumentsPath = './tests/arguments.yaml'

describe('Arguments provider tests', () => {
  it('writing of arguments should create arguments.yaml in bin directory', () => {
    writeArguments({ model: 'redux' }, argumentsPath)
    expect(fs.existsSync(argumentsPath)).toBe(true)
  })

  it('reading of arguments should statisfy Partial<SuiptaArguments>', () => {
    const args = getArguments(argumentsPath)
    expectTypeOf(args).toEqualTypeOf<Partial<SuiptaArguments>>()
  })

  it('args value should be immutable', () => {
    writeArguments({ model: 'effector', ui: 'react' }, argumentsPath)
    expect(fs.existsSync(argumentsPath)).toBe(true)

    const args = getArguments(argumentsPath)
    expectTypeOf(args).toEqualTypeOf<Partial<SuiptaArguments>>()

    expect(args).toEqual({ model: 'effector', ui: 'react' })
  })
})
