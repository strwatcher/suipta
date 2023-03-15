import { test, assert } from 'vitest'
import { merge } from './merge'

test('merge', () => {
  assert.deepEqual(merge({ a: 1, b: 3 }, { a: 3, c: 3 }), { a: 3, b: 3, c: 3 })
})
