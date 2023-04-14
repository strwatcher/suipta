import { SuiptaConfig } from './config'
import { config } from './config.default'
import yaml from 'yaml'
import fs, { promises } from 'node:fs'
import { paths as prebuiltPaths } from './paths'

export const resolveConfig = async (
  configPath?: string
): Promise<SuiptaConfig> => {
  let paths
  if (configPath) {
    paths = [configPath, ...prebuiltPaths]
  } else {
    paths = [...prebuiltPaths]
  }

  let userConfig

  for (const path of paths) {
    if (fs.existsSync(path)) {
      if (/.*\.(yml|yaml)$/.test(path)) {
        userConfig = loadYamlConfig(path)
      } else if (/.*\.(json)$/.test(path)) {
        console.log(path)
        userConfig = await loadJsonConfig(path)
      }
    }
  }
  return { ...config, ...userConfig }
}

const loadJsonConfig = async (
  configPath: string
): Promise<Partial<SuiptaConfig>> => {
  try {
    const data = await promises.readFile(configPath, 'utf-8')
    return JSON.parse(data) as Partial<SuiptaConfig>
  } catch (e) {
    throw new Error(e as string)
  }
}

const loadYamlConfig = (configPath: string): Partial<SuiptaConfig> => {
  const config = yaml.parse(fs.readFileSync(configPath).toString())
  return config as Partial<SuiptaConfig>
}
