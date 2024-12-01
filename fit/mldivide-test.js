import { strictEqual } from 'assert'
import { test } from 'node:test'
import mldivide from './mldivide.js'
import almostEqual from './almostEqual.js'
import size from './size.js'

test('returns mldivide of matlab', () => {
    const result = mldivide([[8, 1, 6], [3, 5, 7], [4, 9, 2]], [[15], [15], [15]])

    strictEqual(size(result).length, 2)
    strictEqual(size(result)[0], 3)
    strictEqual(size(result)[1], 1)
    almostEqual(result[0][0], 1)
    almostEqual(result[1][0], 1)
    almostEqual(result[2][0], 1)
})
