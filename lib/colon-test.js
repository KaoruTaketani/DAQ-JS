import { test } from 'node:test'
import colon from './colon.js'
import { deepStrictEqual } from 'assert'
import isapprox from './isapprox.js'

test('example inputs 0 in colon of matlab', () => {
    deepStrictEqual(colon(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('example inputs 1 in colon of matlab', () => {
    // following fails due small difference
    // deepStrictEqual(colon(0, 0.1, 1), [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
    const result = colon(0, 0.1, 1)
    isapprox(result[0],0)
    isapprox(result[1],0.1)
    isapprox(result[2],0.2)
    isapprox(result[3],0.3)
    isapprox(result[4],0.4)
    isapprox(result[5],0.5)
    isapprox(result[6],0.6)
    isapprox(result[7],0.7)
    isapprox(result[8],0.8)
    isapprox(result[9],0.9)
    isapprox(result[10],1)
})

test('example inputs 2 in colon of matlab', () => {
    deepStrictEqual(colon(10,-2,0),[10,8,6,4,2,0])
})

