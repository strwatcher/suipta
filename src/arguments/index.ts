import { SuiptaArguments } from './types'
import yaml from 'yaml'
import { __packageDir } from '../helpers'
import fs from 'node:fs'
import path from 'node:path'

export const writeArguments = (
  args: Partial<SuiptaArguments>,
  filePath?: string
) => {
  const yamlString = yaml.stringify(args)
  fs.writeFileSync(
    filePath ?? path.join(__packageDir, 'arguments.yaml'),
    yamlString,
    'utf-8'
  )
}

export const getArguments = (filePath?: string) => {
  const args = yaml.parse(
    fs
      .readFileSync(
        filePath ?? path.join(__packageDir, 'arguments.yaml'),
        'utf8'
      )
      .toString()
  )

  return args as Partial<SuiptaArguments>
}
