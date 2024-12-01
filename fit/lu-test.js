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
    strictEqual(L[0][0], 1)
    strictEqual(L[0][1], 0)
    strictEqual(L[0][2], 0)
    almostEqual(L[1][0], 0.151899)
    // almostEqual(L[1][0], 0.15189872) if use fround
    strictEqual(L[1][1], 1)
    strictEqual(L[1][2], 0)
    almostEqual(L[2][0], 0.139241)
    almostEqual(L[2][1], 0.789688)
    strictEqual(L[2][2], 1)

    strictEqual(size(U).length, 2)
    strictEqual(size(U)[0], 3)
    strictEqual(size(U)[0], 3)
    strictEqual(U[0][0], 7.9)
    strictEqual(U[0][1], -1.4)
    strictEqual(U[0][2], 5.1)
    strictEqual(U[1][0], 0)
    almostEqual(U[1][1], 3.41266)
    almostEqual(U[1][2], 2.42532)
    strictEqual(U[2][0], 0)
    strictEqual(U[2][1], 0)
    almostEqual(U[2][2], -4.12537)

    strictEqual(size(P).length, 2)
    strictEqual(size(P)[0], 3)
    strictEqual(size(P)[0], 3)
    strictEqual(P[0][0],0)
    strictEqual(P[0][1],1)
    strictEqual(P[0][2],0)
    strictEqual(P[1][0],1)
    strictEqual(P[1][1],0)
    strictEqual(P[1][2],0)
    strictEqual(P[2][0],0)
    strictEqual(P[2][1],0)
    strictEqual(P[2][2],1)
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
    strictEqual(L[0][0], 1)
    strictEqual(L[0][1], 0)
    strictEqual(L[0][2], 0)
    almostEqual(L[1][0], 0.25)
    strictEqual(L[1][1], 1)
    strictEqual(L[1][2], 0)
    almostEqual(L[2][0], 0)
    almostEqual(L[2][1], 0.571429)
    strictEqual(L[2][2], 1)

    strictEqual(size(U).length, 2)
    strictEqual(size(U)[0], 3)
    strictEqual(size(U)[0], 3)
    strictEqual(U[0][0], 2)
    strictEqual(U[0][1], -3)
    strictEqual(U[0][2], -1)
    strictEqual(U[1][0], 0)
    almostEqual(U[1][1], 1.75)
    almostEqual(U[1][2], -0.75)
    strictEqual(U[2][0], 0)
    strictEqual(U[2][1], 0)
    almostEqual(U[2][2], -0.5714286)

    strictEqual(size(P).length, 2)
    strictEqual(size(P)[0], 3)
    strictEqual(size(P)[0], 3)
    strictEqual(P[0][0],1)
    strictEqual(P[0][1],0)
    strictEqual(P[0][2],0)
    strictEqual(P[1][0],0)
    strictEqual(P[1][1],1)
    strictEqual(P[1][2],0)
    strictEqual(P[2][0],0)
    strictEqual(P[2][1],0)
    strictEqual(P[2][2],1)
})

test('example input of Mathews p 151 result in different permutation both with Mathematica and matlab?', () => {
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
