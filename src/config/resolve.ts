import { SuiptaConfig } from './config'
import { config } from './config.default'
import yaml from 'yaml'
import fs, { promises } from 'node:fs'
import { paths as prebuiltPaths } from './paths'
import path from 'node:path'

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

  for (const configPath of paths) {
    if (fs.existsSync(configPath)) {
      if (/.*\.js$/.test(configPath)) {
        userConfig = (await import(path.join(process.cwd(), configPath)))
          .default
      } else if (/.*\.(yml|yaml)$/.test(configPath)) {
        userConfig = loadYamlConfig(configPath)
      } else if (/.*\.json$/.test(configPath)) {
        userConfig = await loadJsonConfig(configPath)
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
