import { SuiptaArguments } from './types'
import yaml from 'yaml'
import { argumentsPath } from '../helpers'
import fs from 'node:fs'

export const writeArguments = (
  args: Partial<SuiptaArguments>,
  filePath?: string
) => {
  const yamlString = yaml.stringify(args)
  if (fs.existsSync(filePath ?? argumentsPath)) {
    fs.rmSync(filePath ?? argumentsPath)
  }
  fs.writeFileSync(filePath ?? argumentsPath, yamlString, 'utf-8')
}

export const getArguments = (filePath?: string) => {
  const args = yaml.parse(
    fs.readFileSync(filePath ?? argumentsPath, 'utf8').toString()
  )

  return args as Partial<SuiptaArguments>
}

export * from './types'
