import path from 'node:path'
import { NodePlopAPI } from 'plop'
import { getArguments } from './arguments'
import { resolveConfig } from './config'
import { __dirname } from './helpers'

const config = await resolveConfig('suipta.config.yaml')
let args
try {
  args = getArguments()
} catch (e) {
  args = {}
}
console.log('plopfile arguments', args)
// const args = read json

export default function(plop: NodePlopAPI) {
  plop.setGenerator('slice', {
    prompts: [
      {
        type: 'list',
        name: 'layer',
        choices: config.layers,
        message: 'Choose the layer in which slice will be created',
      },
      {
        type: 'input',
        name: 'slice',
        message: 'Enter the name of slice',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(
          __dirname,
          config.rootDir,
          '{{kebabCase layer}}/{{kebabCase slice}}/'
        ),
        base: path.join(config.templatesDir, '{{layer}}'),
        templateFiles: path.join(config.templatesDir, '{{layer}}/**/*'),
      },
    ],
  })
}
