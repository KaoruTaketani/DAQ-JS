import { strictEqual } from 'assert'
import { test } from 'node:test'
import linspace from './linspace.js'
import almostEqual from './almostEqual.js'

test('returns linspace of matlab', () => {
    const result = linspace(-5, 5, 7)
    strictEqual(result.length, 7)
    almostEqual(result[0], -5)
    almostEqual(result[1], -10/3)
    almostEqual(result[2], -10/6)
    almostEqual(result[3], 0)
    almostEqual(result[4], 10/6)
    almostEqual(result[5], 10/3)
    almostEqual(result[6], 5)
})
