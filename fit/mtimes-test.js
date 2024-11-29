import { strictEqual } from 'assert'
import { test } from 'node:test'
import mtimes from './mtimes.js'
import size from './size.js'
import almostEqual from './almostEqual.js'

test('example input of mtimes in matlab', () => {
    const a = [[1, 3, 5], [2, 4, 7]],
        b = [[-5, 8, 11], [3, 9, 21], [4, 0, 8]],
        c = mtimes(a, b)

    strictEqual(size(c).length, 2)
    strictEqual(size(c)[0], 2)
    strictEqual(size(c)[1], 3)
    almostEqual(c[0][0], 24)
    almostEqual(c[0][1], 35)
    almostEqual(c[0][2], 114)
    almostEqual(c[1][0], 30)
    almostEqual(c[1][1], 52)
    almostEqual(c[1][2], 162)
})

