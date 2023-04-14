#!/usr/bin/env node
import { fork } from 'node:child_process'
import { command, run, string, option, optional } from 'cmd-ts'
import path from 'node:path'
import { __packageDir } from './helpers'
import { runPlop } from './plop'
import { resolveConfig } from './config'
import { printResult } from './plop/result'
import { languages, models, uis } from './arguments/types'
import { writeArguments } from './arguments'

const config = resolveConfig('suipta.config.yaml')

const app = command({
  name: 'suipta',
  args: {
    layer: positional({ type: oneOf(config.layers), displayName: 'layer' }),
    slice: positional({ type: string, displayName: 'slice' }),
    model: option({ type: optional(oneOf(models)), long: 'model', short: 'm' }),
    ui: option({ type: optional(oneOf(uis)), long: 'ui' }),
    language: option({
      type: optional(oneOf(languages)),
      long: 'language',
      short: 'l',
    }),
  },
  handler: async ({ layer, slice, model, ui, language }) => {
    writeArguments({ model, ui, language })
    const result = await runPlop({ layer, slice, generator: 'slice' })
    printResult(result)
  },
})

run(app, process.argv.slice(2))
