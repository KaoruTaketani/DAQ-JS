import { strictEqual } from 'assert'
import { test } from 'node:test'
import plus from './plus.js'
import almostEqual from './almostEqual.js'

test('example inputs in plus of matlab', () => {
    const A = [[1, 0], [2, 4]],
        B = [[5, 9], [2, 1]],
        C = plus(A, B)

    strictEqual(C[0][0], 1 + 5)
    strictEqual(C[0][1], 9)
    strictEqual(C[1][0], 2 + 2)
    strictEqual(C[1][1], 4 + 1)
})
