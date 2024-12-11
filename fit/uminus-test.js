import { strictEqual } from 'assert'
import { test } from 'node:test'
import uminus from './uminus.js'
import size from './size.js'

test('example of matlab', () => {
    const B = uminus([[1, -3], [-2, 4]])

    strictEqual(size(B).length, 2)
    strictEqual(size(B)[0], 2)
    strictEqual(size(B)[1], 2)
    strictEqual(B[0][0], -1)
    strictEqual(B[0][1], 3)
    strictEqual(B[1][0], 2)
    strictEqual(B[1][1], -4)
})
