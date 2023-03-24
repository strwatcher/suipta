import { SuiptaConfig } from './config'
import { config } from './config.default'

export const resolveConfig = (configPath: string): SuiptaConfig => {
  return { ...config }
}
