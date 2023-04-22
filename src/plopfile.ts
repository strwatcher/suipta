import path from 'node:path'
import { NodePlopAPI } from 'plop'
import { getArguments } from './arguments'
import { SuiptaArguments } from './arguments/types'
import { resolveConfig } from './config'
import fs from 'node:fs'
import { __dirname, __packageDir } from './helpers'
import { Actions } from 'node-plop'

export default async function(plop: NodePlopAPI) {
  let args: Partial<SuiptaArguments>
  try {
    args = getArguments() ?? {}
  } catch (e) {
    args = {}
  }
  const config = await resolveConfig(args.configPath)

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
    actions: data => {
      const isAdditionalArgs = !!(args.ui || args.model || args.language)
      const destinationBase = path.join(
        __dirname,
        config.rootDir,
        '{{kebabCase layer}}',
        '{{kebabCase slice}}',
        '/'
      )
      const actions: Actions = []
      if (
        !isAdditionalArgs &&
        data?.layer &&
        config.templatesDir &&
        fs.existsSync(path.join(config.templatesDir, data.layer))
      ) {
        const templateFiles = path.join(
          config.templatesDir,
          data.layer,
          '**',
          '*'
        )
        const base = path.join(config.templatesDir, data.layer)
        actions.push({
          type: 'addMany',
          destination: destinationBase,
          base,
          templateFiles,
        })
      } else if (isAdditionalArgs) {
        const templatesDir = path.join(__packageDir, '..', 'templates')
        const base = path.join(templatesDir, data?.layer)
        const language = args.language ?? 'ts'
        const modelBase = path.join(
          base,
          path.join('model', args.model ?? 'effector', language)
        )
        const uiBase = path.join(
          base,
          path.join('ui', args.ui ?? 'react', language)
        )

        actions.push(
          {
            type: 'addMany',
            destination: path.join(destinationBase, 'model', '/'),
            base: modelBase,
            templateFiles: path.join(modelBase, '**', '*'),
          },
          {
            type: 'addMany',
            destination: path.join(destinationBase, 'ui', '/'),
            base: uiBase,
            templateFiles: path.join(uiBase, '**', '*'),
          },
          {
            type: 'add',
            path: path.join(destinationBase, `index.${language}`),
            templateFile: path.join(base, `index.${language}`),
          }
        )

        if (language === 'ts') {
          actions.push({
            type: 'add',
            path: path.join(destinationBase, `types.${language}`),
            templateFile: path.join(base, `types.${language}`),
          })
        }
      } else {
        const templatesDir = path.join(__packageDir, '..', 'templates')
        const templateFiles = path.join(
          templatesDir,
          data?.layer,
          'default',
          '**',
          '*'
        )
        const base = path.join(templatesDir, data?.layer, 'default')

        actions.push({
          type: 'addMany',
          destination: destinationBase,
          base,
          templateFiles,
        })
      }

      return actions
    },
  })
}
