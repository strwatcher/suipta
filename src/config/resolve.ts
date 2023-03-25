import { SuiptaConfig } from './config'
import { config } from './config.default'
import yaml from 'yaml'
import fs from 'node:fs'

export const resolveConfig = (configPath: string): SuiptaConfig => {
  let userConfig
  if (configPath.includes('yaml')) {
    userConfig = loadYamlConfig(configPath)
  }
  return { ...config, ...userConfig }
}

export const loadYamlConfig = (configPath: string): Partial<SuiptaConfig> => {
  const config = yaml.parse(fs.readFileSync(configPath).toString())
  return config as Partial<SuiptaConfig>
}
