import { describe, expect, it } from 'vitest'
import { merge } from './merge'

describe('merge', () => {
  it('simple merge', () => {
    expect(merge({ a: 1, b: 2 }, { c: 3, d: 4 })).toStrictEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    })
  })
  it('merge with overriding values', () => {
    expect(merge({ a: 1, b: 3 }, { a: 3, c: 3 })).toStrictEqual({
      a: 3,
      b: 3,
      c: 3,
    })
  })
  it('merge with empty', () => {
    expect(merge({ a: 1 }, {})).toStrictEqual({ a: 1 })
  })
  it('merge empty with empty', () => {
    expect(merge({}, {})).toStrictEqual({})
  })
})
