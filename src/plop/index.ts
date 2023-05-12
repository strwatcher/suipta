import nodePlop from 'node-plop'
import { plopfilePath } from '../helpers'
import { PlopArguments } from './types'
export { Generator } from './types'

export const runPlop = async (
  args: Partial<PlopArguments>,
  customPath?: string
) => {
  const plop = await nodePlop(customPath ?? plopfilePath)
  const generator = plop.getGenerator(args.generator ?? 'slice')
  const plopArgs = []
  if (args.layer) {
    plopArgs.push(args.layer)
  }
  if (args.slice) {
    plopArgs.push(args.slice)
  }
  const answers = await generator.runPrompts(plopArgs)
  const result = await generator.runActions(answers)
  return result
}
