import { strictEqual } from 'assert'
import { test } from 'node:test'
import mldivide from './mldivide.js'
import almostEqual from './almostEqual.js'
import size from './size.js'

test('example inputs in mldivide of matlab', () => {
    const result = mldivide([[8, 1, 6], [3, 5, 7], [4, 9, 2]], [[15], [15], [15]])

    strictEqual(size(result).length, 2)
    strictEqual(size(result)[0], 3)
    strictEqual(size(result)[1], 1)
    almostEqual(result[0][0], 1)
    almostEqual(result[1][0], 1)
    almostEqual(result[2][0], 1)
})

test('2nd example inputs in mldivide matlab', () => {
    const result = mldivide([[16, 2, 3, 13], [5, 11, 10, 8], [9, 7, 6, 12], [4, 14, 15, 1]], [[34], [34], [34], [34]])

    strictEqual(size(result).length, 2)
    strictEqual(size(result)[0], 4)
    strictEqual(size(result)[1], 1)
    // console.log(result)
    strictEqual(result[0][0], 2)
    strictEqual(result[1][0], 4)
    strictEqual(result[2][0], -2)
    strictEqual(result[3][0], 0)
})

test('example inputs in LinearSolve of matlab', () => {
    const result = mldivide([[1.2, 3.2, 3.2], [7.9, -1.4, 5.1], [1.1, 2.5, -1.5]], [[0.5], [1.3], [-2.2]])

    strictEqual(size(result).length, 2)
    strictEqual(size(result)[0], 3)
    strictEqual(size(result)[1], 1)
    almostEqual(result[0][0], -0.309701)
    almostEqual(result[1][0], -0.362687)
    almostEqual(result[2][0], 0.635075)
})
