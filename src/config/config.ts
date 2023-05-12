export type SuiptaConfig = {
  layers: Array<string>
  segmentLayers: Array<string>
  segment: Array<string>
  templatesDir?: string
  lang?: 'ts' | 'js'
  rootDir: string
}
