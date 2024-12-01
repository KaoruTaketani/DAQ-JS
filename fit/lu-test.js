import { strictEqual } from 'assert'
import { test } from 'node:test'
import lu from './lu.js'
import size from './size.js'
import almostEqual from './almostEqual.js'

test('example input of LUDecomposition in Mathematica', () => {
    const [L, U, P] = lu([[1.2, 3.2, 3.2], [7.9, -1.4, 5.1], [1.1, 2.5, -1.5]])

    strictEqual(size(L).length, 2)
    strictEqual(size(L)[0], 3)
    strictEqual(size(L)[1], 3)
    strictEqual(size(U).length, 2)
    strictEqual(size(U)[0], 3)
    strictEqual(size(U)[0], 3)
    strictEqual(size(P).length, 2)
    strictEqual(size(P)[0], 3)
    strictEqual(size(P)[0], 3)
})

test('example input of python', () => {
    const [L, U, P] = lu([[2, 1], [1, 2]])

    strictEqual(size(L).length, 2)
    strictEqual(size(L)[0], 2)
    strictEqual(size(L)[1], 2)
    strictEqual(size(U).length, 2)
    strictEqual(size(U)[0], 2)
    strictEqual(size(U)[0], 2)
    strictEqual(size(P).length, 2)
    strictEqual(size(P)[0], 2)
    strictEqual(size(P)[0], 2)
})

test('example input of lu in matlab', () => {
    const [L, U, P] = lu([[2, -3, -1], [.5, 1, -1], [0, 1, -1]])

    strictEqual(size(L).length, 2)
    strictEqual(size(L)[0], 3)
    strictEqual(size(L)[1], 3)
    strictEqual(size(U).length, 2)
    strictEqual(size(U)[0], 3)
    strictEqual(size(U)[0], 3)
    strictEqual(size(P).length, 2)
    strictEqual(size(P)[0], 3)
    strictEqual(size(P)[0], 3)
})

test('example input of Mathews p 151', () => {
    const [L, U, P] = lu([[1, 2, 6], [4, 8, -1], [-2, 3, -5]])

    strictEqual(size(L).length, 2)
    strictEqual(size(L)[0], 3)
    strictEqual(size(L)[1], 3)
    strictEqual(size(U).length, 2)
    strictEqual(size(U)[0], 3)
    strictEqual(size(U)[0], 3)
    strictEqual(size(P).length, 2)
    strictEqual(size(P)[0], 3)
    strictEqual(size(P)[0], 3)
})
