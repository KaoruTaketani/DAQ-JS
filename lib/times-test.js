import { strictEqual } from 'assert'
import { test } from 'node:test'
import times from './times.js'
import size from './size.js'
import isapprox from './isapprox.js'
import eye from './eye.js'

test('example input of mtimes in matlab', () => {
    const a = 3,
        B = eye(3),
        C = times(a, B)

    strictEqual(size(C).length, 2)
    strictEqual(size(C)[0], 3)
    strictEqual(size(C)[1], 3)
    isapprox(C[0][0], 3)
    isapprox(C[0][1], 0)
    isapprox(C[0][2], 0)
    isapprox(C[1][0], 0)
    isapprox(C[1][1], 3)
    isapprox(C[1][2], 0)
    isapprox(C[2][0], 0)
    isapprox(C[2][1], 0)
    isapprox(C[2][2], 3)
})

