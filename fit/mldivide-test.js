import { strictEqual } from 'assert'
import { test } from 'node:test'
import mldivide from './mldivide.js'
import almostEqual from './almostEqual.js'

test('returns mldivide of matlab', () => {
    const result = mldivide([[1, 5], [2, 6], [3, 7], [4, 8]], [9, 10, 11, 12])
    strictEqual(result.length, 2)
    almostEqual(result[0], -1)
    almostEqual(result[1], 2)
})
