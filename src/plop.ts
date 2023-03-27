import minimist from 'minimist'
import { Plop, run } from 'plop'
import { plopfilePath } from './helpers'

const args = process.argv.slice(2)
const argv = minimist(args)
Plop.prepare(
  {
    cwd: argv.cwd,
    configPath: plopfilePath,
    preload: argv.preload || [],
    completion: argv.completion ?? true,
  },
  env =>
    Plop.execute(env, env => {
      const options = {
        ...env,
      }
      return run(options, undefined, true)
    })
)
