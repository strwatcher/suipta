import { SuiptaConfig } from './config'
import { config } from './config.default'
import yaml from 'yaml'
import fs from 'node:fs'
import { __packageDir } from '../helpers'
import path from 'node:path'
import { SuiptaArguments } from '../arguments/types'

export const resolveConfig = (configPath: string): SuiptaConfig => {
  let userConfig
  if (configPath.includes('yaml')) {
    userConfig = loadYamlConfig(configPath)
  }
  return { ...config, ...userConfig }
}

export const loadYamlConfig = (configPath: string): Partial<SuiptaConfig> => {
  if (!fs.existsSync(configPath)) {
    return {}
  }
  const config = yaml.parse(fs.readFileSync(configPath).toString())
  return config as Partial<SuiptaConfig>
}
