import { strictEqual } from 'assert'
import { test } from 'node:test'
import plus from './plus.js'
import almostEqual from './almostEqual.js'

test('returns linspace of matlab', () => {
    const result = plus([-5, 5], [7, 7])
    strictEqual(result.length, 2)
    almostEqual(result[0], 2)
    almostEqual(result[1], 12)
})
