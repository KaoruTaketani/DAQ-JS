import { strictEqual } from 'assert'
import { test } from 'node:test'
import minus from './minus.js'
import almostEqual from './almostEqual.js'

test('returns linspace of matlab', () => {
    const result = minus([-5, 5], [7, 7])
    strictEqual(result.length, 2)
    almostEqual(result[0], -12)
    almostEqual(result[1], -2)
})
