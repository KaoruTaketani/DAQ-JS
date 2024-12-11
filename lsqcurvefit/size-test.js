import { strictEqual } from 'assert'
import { test } from 'node:test'
import size from './size.js'
import almostEqual from './almostEqual.js'

test('2x3 matrix', () => {
    const m = size([[1, 3, 5], [2, 4, 7]])

    strictEqual(m.length, 2)
    strictEqual(m[0], 2)
    strictEqual(m[1], 3)
})

test('3x3 matrix', () => {
    const m = size([[-5, 8, 11], [3, 9, 21], [4, 0, 8]])

    strictEqual(m.length, 2)
    strictEqual(m[0], 3)
    strictEqual(m[1], 3)
})

