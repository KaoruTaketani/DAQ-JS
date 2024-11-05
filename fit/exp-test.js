import { strictEqual } from 'assert'
import { test } from 'node:test'
import exp from './exp.js'
import almostEqual from './almostEqual.js'

test('returns linspace of matlab', () => {
    const result = exp([-5, 5])
    strictEqual(result.length, 2)
    almostEqual(result[0], Math.exp(-5))
    almostEqual(result[1], Math.exp(5))
})
