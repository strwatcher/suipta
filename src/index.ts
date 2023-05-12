import {
  command,
  run,
  string,
  option,
  optional,
  positional,
  oneOf,
} from 'cmd-ts'
import { runPlop } from './plop'
import { resolveConfig } from './config'
import { printResult } from './plop/result'
import { languages, models, uis } from './arguments/types'
import { writeArguments } from './arguments'

import { Generator } from './plop'
const config = await resolveConfig('suipta.config.yaml')

export const app = command({
  name: 'suipta',
  args: {
    generator: positional({
      type: oneOf(['slice', 'segment']),
      displayName: 'generator',
    }),
    layer: positional({
      type: optional(oneOf(config.layers)),
      displayName: 'layer',
    }),
    slice: positional({ type: optional(string), displayName: 'slice' }),
    model: option({ type: optional(oneOf(models)), long: 'model', short: 'm' }),
    ui: option({ type: optional(oneOf(uis)), long: 'ui' }),
    language: option({
      type: optional(oneOf(languages)),
      long: 'language',
      short: 'l',
    }),
    configPath: option({
      type: optional(string),
      long: 'configPath',
      short: 'c',
    }),
  },
  handler: async ({
    layer,
    slice,
    model,
    ui,
    language,
    configPath,
    generator,
  }) => {
    writeArguments({ model, ui, language, configPath })
    const result = await runPlop({
      layer,
      slice,
      generator: generator as Generator,
    })
    printResult(result)
    return layer
  },
})

export const suiptaHandler = app.handler
export * from './config'
export * from './arguments'
export * from './plop'
export * from './helpers'
