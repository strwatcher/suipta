export type Generator = 'slice' | 'segment'
export type PlopSliceArguments = {
  layer: string
  slice: string
}

export type PlopSegmentArguments = {
  layer: string
  segment: string
  component: string
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
