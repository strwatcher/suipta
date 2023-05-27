import { SuiptaArguments, writeArguments } from './arguments'
import { runPlop } from './plop'
import { printResult } from './plop/result'
import {
  Generator,
  PlopSegmentArguments,
  PlopSliceArguments,
} from './plop/types'

export async function suiptaHandler(
  args: Partial<SuiptaArguments & PlopSliceArguments & PlopSegmentArguments> & {
    generator: Generator
  }
) {
  writeArguments(args)

  const result = await runPlop(args)

  printResult(result)
}
