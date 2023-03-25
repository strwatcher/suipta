#!/usr/bin/env node

import path from 'node:path'
import minimist from 'minimist'
import { Plop, run } from 'plop'
import { __packageDir } from './helpers'

const args = process.argv.slice(2)
const argv = minimist(args)
console.log(args)

Plop.prepare(
  {
    cwd: argv.cwd,
    configPath: path.join(__packageDir, './plopfile.js'),
    preload: argv.preload || [],
    completion: argv.completion ?? true,
  },
  env =>
    Plop.execute(env, env => {
      console.log(env)
      const options = {
        ...env,
      }
      return run(options, undefined, true)
    })
)
