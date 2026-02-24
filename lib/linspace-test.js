import { strictEqual } from 'assert'
import { test } from 'node:test'
import linspace from './linspace.js'
import isapprox from './isapprox.js'

test('returns linspace of matlab', () => {
    const result = linspace(-5, 5, 7)
    strictEqual(result.length, 7)
    isapprox(result[0], -5)
    isapprox(result[1], -10/3)
    isapprox(result[2], -10/6)
    isapprox(result[3], 0)
    isapprox(result[4], 10/6)
    isapprox(result[5], 10/3)
    isapprox(result[6], 5)
})
