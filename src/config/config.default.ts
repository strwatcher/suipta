import { SuiptaConfig } from './config'

export const config: SuiptaConfig = {
  layers: [
    'shared',
    'entities',
    'features',
    'widgets',
    'pages',
    'processes',
    'app',
  ],
  rootDir: 'src',
  templatesDir: '../templates',
}
