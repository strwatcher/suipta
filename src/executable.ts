#!/usr/bin/env node
import { fork } from 'node:child_process'
import { command, run, string, option, optional } from 'cmd-ts'
import path from 'node:path'
import { __packageDir } from './helpers'

const app = command({
  name: 'suipta',
  args: {
    configPath: option({
      type: optional(string),
      long: 'config-path',
      short: 'c',
    }),
  },
  handler: ({ configPath }) => {
    // handle arguments
    // write them in json
    //
    // const plopArgs = ['slice']
    // if (layer) {
    //   plopArgs.push(layer)
    // }
    // if (sliceName) {
    //   plopArgs.push(sliceName)
    // }
    fork(path.join(__packageDir, 'plop.js' /*plopArgs*/))
  },
})

run(app, process.argv.slice(2))
