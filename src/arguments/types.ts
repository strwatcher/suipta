export const models = ['effector', 'redux'] as const
export const uis = ['react', 'solid'] as const
export const languages = ['js', 'ts'] as const

export type SuiptaArguments = {
  ui: (typeof uis)[number]
  model: (typeof models)[number]
  language: (typeof languages)[number]
}
