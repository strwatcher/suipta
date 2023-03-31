import path from 'node:path'
import { NodePlopAPI } from 'plop'
import { resolveConfig } from './config'
import { __dirname } from './helpers'

const config = resolveConfig('suipta.config.yaml')
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
