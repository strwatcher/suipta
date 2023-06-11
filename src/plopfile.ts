import Case from 'case'
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
  let language = 'ts'
  if (config.lang) {
    language = config.lang
  }
  if (args.language) {
    language = args.language
  }
  const defaultTemplatesDir = path.relative(
    __packageDir,
    path.posix.join(__packageDir, '..', 'templates')
  ).split(path.sep).join(path.posix.sep)

  plop.setGenerator('segment', {
    prompts: [
      {
        type: 'list',
        name: 'layer',
        choices: config.segmentLayers,
        message: 'Choose the layer in which segment will be updated',
      },
      {
        type: 'list',
        name: 'segment',
        choices: config.segment,
        message: 'Choose segment in which generation result will placed',
      },
      {
        type: 'input',
        name: 'component',
        message: 'Enter the name of new generation result',
      },
    ],
    actions: data => {
      if (!data) return []
      const { layer, segment, component } = data
      const layerPath = path.relative(
        __packageDir,
        path.posix.join(__dirname, config.rootDir, layer)
      )

      const segmentPath = path.posix.join(layerPath, segment)

      const actions: Actions = []

      if (!fs.existsSync(layerPath)) {
        fs.mkdirSync(layerPath)
      }

      if (!fs.existsSync(segmentPath)) {
        fs.mkdirSync(segmentPath)
      }

      const indexPath = path.posix.join(segmentPath, `index.${language}`)
      if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, '')
      }

      actions.push({
        type: 'modify',
        path: indexPath,
        transform: (template: string) => {
          template += `export * from './${Case.kebab(component)}'\n`
          return template
        },
      })

      const base = path.posix.join(
        config.templatesDir ?? defaultTemplatesDir,
        'segments',
        '{{kebabCase layer}}',
        '{{kebabCase segment}}'
      )

      actions.push({
        type: 'addMany',
        destination: path.posix.join(segmentPath, '{{kebabCase component}}'),
        base,
        templateFiles: path.posix.join(base, '**', '*'),
      })

      return actions
    },
  })
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
      const destinationBase = path.relative(
        __packageDir,
        path.posix.join(
          __dirname,
          config.rootDir,
          '{{kebabCase layer}}',
          '{{kebabCase slice}}'
        )
      ).split(path.sep).join(path.posix.sep)

      const actions: Actions = []
      if (
        !isAdditionalArgs &&
        data?.layer &&
        config.templatesDir &&
        fs.existsSync(path.join(config.templatesDir, data.layer))
      ) {
        const base = path.relative(
          __packageDir,
          path.posix.join(__dirname, config.templatesDir, data.layer)
        ).split(path.sep).join(path.posix.sep)

        const templateFiles = path.posix.join(base, '**', '*')
        
        console.log(destinationBase)
        console.log(base)
        console.log(templateFiles)

        actions.push({
          type: 'addMany',
          destination: destinationBase,
          base,
          templateFiles,
        })
      } else if (isAdditionalArgs) {
        const base = path.posix.join(defaultTemplatesDir, data?.layer)
        const modelBase = path.posix.join(
          base,
          'model',
          args.model ?? 'effector',
          language
        )
        const uiBase = path.posix.join(base, 'ui', args.ui ?? 'react', language)

        console.log(base, modelBase, uiBase)

        actions.push(
          {
            type: 'addMany',
            destination: path.posix.join(destinationBase, 'model'),
            base: modelBase,
            templateFiles: path.posix.join(modelBase, '**', '*'),
          },
          {
            type: 'addMany',
            destination: path.posix.join(destinationBase, 'ui'),
            base: uiBase,
            templateFiles: path.posix.join(uiBase, '**', '*'),
          },
          {
            type: 'add',
            path: path.posix.join(destinationBase, `index.${language}`),
            templateFile: path.posix.join(base, `index.${language}`),
          }
        )

        if (language === 'ts') {
          actions.push({
            type: 'add',
            path: path.posix.join(destinationBase, `types.${language}`),
            templateFile: path.posix.join(base, `types.${language}`),
          })
        }
      } else {
        const base = path.posix.join(defaultTemplatesDir, data?.layer, 'default')
        const templateFiles = path.posix.join(base, '**', '*')

        console.log(destinationBase)
        console.log(base)

        actions.push({
          type: 'addMany',
          destination: destinationBase,
          base: base,
          templateFiles,
        })
      }

      return actions
    },
  })
}
