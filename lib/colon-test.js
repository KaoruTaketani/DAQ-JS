import { test } from 'node:test'
import colon from './colon.js'
import { deepStrictEqual } from 'assert'
import almostEqual from './almostEqual.js'

test('example inputs 0 in colon of matlab', () => {
    deepStrictEqual(colon(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('example inputs 1 in colon of matlab', () => {
    // console.log(colon(0, 0.1, 1))
    // deepStrictEqual(colon(0, 0.1, 1), [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
    const result = colon(0, 0.1, 1)
    almostEqual(result[0],0)
    almostEqual(result[1],0.1)
    almostEqual(result[2],0.2)
    almostEqual(result[3],0.3)
    almostEqual(result[4],0.4)
    almostEqual(result[5],0.5)
    almostEqual(result[6],0.6)
    almostEqual(result[7],0.7)
    almostEqual(result[8],0.8)
    almostEqual(result[9],0.9)
    almostEqual(result[10],1)
})

test('example inputs 2 in colon of matlab', () => {
    console.log(colon(10, -2, 0))
    // output [10,8,6,4,2,0]
    deepStrictEqual(colon(10,-2,0),[10,8,6,4,2,0])
})

