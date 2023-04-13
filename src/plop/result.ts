import chalk from 'chalk'
import { PlopResult } from './types'

export const printResult = (result: PlopResult) => {
  if (result.failures.length > 0) {
    result.failures.forEach(failure => console.log(chalk.red(failure.error)))
  } else {
    result.changes.forEach(change => console.log(chalk.green(change.path)))
  }
}
