import nodePlop from 'node-plop'
import { plopfilePath } from '../helpers'
import { Generator, PlopSegmentArguments, PlopSliceArguments } from './types'
export { Generator } from './types'

export const runPlop = async (
  args: Partial<PlopSliceArguments & PlopSegmentArguments> & {
    generator: Generator
  },
  customPath?: string
) => {
  const plop = await nodePlop(customPath ?? plopfilePath)
  const generator = plop.getGenerator(args.generator)
  const plopArgs = []
  if (args.layer) {
    plopArgs.push(args.layer)
  }

  if (args.generator === 'slice') {
    if (args.slice) {
      plopArgs.push(args.slice)
    }
  }

  if (args.generator === 'segment') {
    if (args.segment) {
      plopArgs.push(args.segment)
    }
    if (args.component) {
      plopArgs.push(args.component)
    }
  }
  const answers = await generator.runPrompts(plopArgs)
  const result = await generator.runActions(answers)
  return result
}
