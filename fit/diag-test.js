import { strictEqual } from 'assert'
import { test } from 'node:test'
import diag from './diag.js'
import size from './size.js'

test('example inputs 1 in diag of matlab', () => {
    const A = diag([2, 1, -1, -2, -5])

    strictEqual(size(A).length, 2)
    strictEqual(size(A)[0], 5)
    strictEqual(size(A)[1], 5)
    strictEqual(A[0][0], 2)
    strictEqual(A[1][1], 1)
    strictEqual(A[2][2], -1)
    strictEqual(A[3][3], -2)
    strictEqual(A[4][4], -5)
})

test('example inputs 2 in diag of matlab', () => {
    const v = diag([
        [9, 3, 10, 8, 7, 8],
        [10, 6, 5, 10, 8, 1],
        [2, 10, 9, 7, 8, 3],
        [10, 10, 2, 1, 4, 1],
        [7, 2, 5, 9, 7, 1],
        [1, 10, 10, 10, 2, 9]
    ])
    strictEqual(v.length, 6)    
    strictEqual(v[0],9)
    strictEqual(v[1],6)
    strictEqual(v[2],9)
    strictEqual(v[3],1)
    strictEqual(v[4],7)
    strictEqual(v[5],9)
})

