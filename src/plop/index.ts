import nodePlop from 'node-plop'
import { plopfilePath } from '../helpers'
import { PlopArguments } from './types'

export const runPlop = async (args: PlopArguments, customPath?: string) => {
  const plop = await nodePlop(customPath ?? plopfilePath)
  const generator = plop.getGenerator(args.generator)
  const answers = await generator.runPrompts([args.layer, args.slice])
  const result = await generator.runActions(answers)
  return result
}
