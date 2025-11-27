import { strictEqual } from 'assert'
import { test } from 'node:test'
import polyval from './polyval.js'

test('matlab example 1', () => {
    const p = [3, 2, 1],
        x = [5, 7, 9],
        y = polyval(p, x)

    strictEqual(y.length, 3)
    strictEqual(y[0], 86)
    strictEqual(y[1], 162)
    strictEqual(y[2], 262)
})

