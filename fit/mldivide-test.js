import { strictEqual } from 'assert'
import { test } from 'node:test'
import mldivide from './mldivide.js'
import almostEqual from './almostEqual.js'

test('returns mldivide of matlab', () => {
    const result = mldivide([[8, 1, 6], [3, 5, 7], [4, 9, 2]], [15, 15, 15])
    strictEqual(result.length, 2)
    almostEqual(result[0], -1)
    almostEqual(result[1], 2)
})
