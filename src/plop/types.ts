export type PlopArguments = {
  generator: 'slice' | 'segment'
  layer: string
  slice: string
}
export type PlopResult = {
  failures: PlopFailure[]
  changes: PlopChange[]
}

export type PlopFailure = {
  type: string
  path: string
  error: string
}

export type PlopChange = {
  type: string
  path: string
}
