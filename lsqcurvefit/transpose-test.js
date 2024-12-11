import { strictEqual } from 'assert'
import { test } from 'node:test'
import transpose from './transpose.js'

test('4x4 matrix', () => {
    const A = [[16,2,3,13],[5,11,10,8],[9,7,6,12],[4,14,15,1]]

    strictEqual(transpose(A)[0][0], 16)
    strictEqual(transpose(A)[0][1], 5)
    strictEqual(transpose(A)[0][2], 9)
    strictEqual(transpose(A)[0][3], 4)
    strictEqual(transpose(A)[1][0], 2)
    strictEqual(transpose(A)[1][1], 11)
    strictEqual(transpose(A)[1][2], 7)
    strictEqual(transpose(A)[1][3], 14)
    strictEqual(transpose(A)[2][0], 3)
    strictEqual(transpose(A)[2][1], 10)
    strictEqual(transpose(A)[2][2], 6)
    strictEqual(transpose(A)[2][3], 15)
    strictEqual(transpose(A)[3][0], 13)
    strictEqual(transpose(A)[3][1], 8)
    strictEqual(transpose(A)[3][2], 12)
    strictEqual(transpose(A)[3][3], 1)
})

