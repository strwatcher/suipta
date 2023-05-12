import { SuiptaConfig } from './config'

export const config: SuiptaConfig = {
  layers: ['entities', 'features', 'widgets', 'pages', 'processes'],
  segmentLayers: ['shared'],
  segment: ['ui', 'lib'],
  rootDir: 'src',
}
