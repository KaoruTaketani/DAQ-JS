import { strictEqual } from 'assert'
import { test } from 'node:test'
import lu from './lu.js'
import almostEqual from './almostEqual.js'

test('example input of LUDecomposition in Mathematica', () => {
    const [l, u] = lu([[1.2, 3.2, 3.2], [7.9, -1.4, 5.1], [1.1, 2.5, -1.5]])
    strictEqual(l.length, 3)
    strictEqual(u.length, 3)
    console.log(l)
    console.log(u)
})

test('example input of python', () => {
    const [l, u] = lu([[2, 1], [1, 2]])
    strictEqual(l.length, 2)
    strictEqual(u.length, 2)
    console.log(l)
    console.log(u)
})
