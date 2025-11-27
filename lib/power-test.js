import { strictEqual } from 'assert'
import { test } from 'node:test'
import power from './power.js'

test('matlab example 1', () => {
    const a = [1, 2, 3, 4, 5],
        c = power(a, 2)
    strictEqual(c[0], 1)
    strictEqual(c[1], 4)
    strictEqual(c[2], 9)
    strictEqual(c[3], 16)
    strictEqual(c[4], 25)
})

