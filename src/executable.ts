#!/usr/bin/env node
import {
  command,
  run,
  string,
  option,
  optional,
  positional,
  oneOf,
} from 'cmd-ts'
import { __packageDir } from './helpers'
import { runPlop } from './plop'
import { resolveConfig } from './config'
import { printResult } from './plop/result'

const config = resolveConfig('suipta.config.yaml')

const app = command({
  name: 'suipta',
  args: {
    layer: positional({ type: oneOf(config.layers), displayName: 'layer' }),
    slice: positional({ type: string, displayName: 'slice' }),
  },
  handler: async ({ layer, slice }) => {
    const result = await runPlop({ layer, slice, generator: 'slice' })
    printResult(result)
  },
})

run(app, process.argv.slice(2))
