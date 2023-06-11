import {
  command,
  string,
  option,
  optional,
  positional,
  oneOf,
  subcommands,
} from 'cmd-ts'
import { resolveConfig } from './config'
import { languages, models, uis } from './arguments/types'

import { suiptaHandler } from './suipta-handler'
const config = await resolveConfig()

export const segment = command({
  name: 'segment',
  args: {
    layer: positional({
      type: optional(oneOf(config.segmentLayers)),
      displayName: 'layer',
    }),
    segment: positional({
      type: optional(oneOf(config.segment)),
      displayName: 'segment',
    }),
    component: positional({
      type: optional(string),
      displayName: 'component',
    }),
    configPath: option({
      type: optional(string),
      long: 'configPath',
      short: 'c',
    }),
  },
  handler: async args => {
    suiptaHandler({ ...args, generator: 'segment' })
  },
})

export const slice = command({
  name: 'slice',
  args: {
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
  handler: async args => {
    suiptaHandler({ ...args, generator: 'slice' })
  },
})

export const app = subcommands({
  name: 'suipta',
  cmds: { slice, segment },
})

export { suiptaHandler } from './suipta-handler'
export * from './config'
export * from './arguments'
export * from './plop'
export * from './helpers'
