import { strictEqual } from 'assert'
import { test } from 'node:test'
import eye from './eye.js'
import size from './size.js'

test('3x3 matrix', () => {
    const m = eye(3)

    strictEqual(size(m).length, 2)
    strictEqual(size(m)[0], 3)
    strictEqual(size(m)[1], 3)
    strictEqual(m[0][0], 1)
    strictEqual(m[0][1], 0)
    strictEqual(m[0][2], 0)
    strictEqual(m[1][0], 0)
    strictEqual(m[1][1], 1)
    strictEqual(m[1][2], 0)
    strictEqual(m[2][0], 0)
    strictEqual(m[2][1], 0)
    strictEqual(m[2][2], 1)
})

