import fs from 'node:fs'
import { it, expect, expectTypeOf } from 'vitest'
import { getArguments, writeArguments } from '../src/arguments'
import { __packageDir } from '../src/helpers'
import path from 'node:path'
import { SuiptaArguments } from '../src/arguments/types'

const argumentsPath = './tests/arguments.yaml'

it('writing of arguments should create arguments.yaml in bin directory', () => {
  writeArguments({ model: 'mobx' }, argumentsPath)
  expect(fs.existsSync(argumentsPath)).toBe(true)
})

it('reading of arguments should statisfy Partial<SuiptaArguments>', () => {
  const args = getArguments(argumentsPath)
  expectTypeOf(args).toEqualTypeOf<Partial<SuiptaArguments>>()
})
