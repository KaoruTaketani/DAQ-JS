import { deepStrictEqual } from 'assert'
import { test } from 'node:test'
import isapprox from './isapprox.js'
import freqspace from './freqspace.js'

test('freqspace returns matlab freqspace with whole', () => {
    const result = freqspace(5)
    isapprox(result[0], 0)
    isapprox(result[1], 0.4)
    isapprox(result[2], 0.8)
    isapprox(result[3], 1.2)
    isapprox(result[4], 1.6)
})

test('freqspace returns matlab freqspace with whole', () => {
    deepStrictEqual(freqspace(4), [0, 0.5, 1.0, 1.5])
})

test('freqspace returns matlab freqspace with whole', () => {
    deepStrictEqual(freqspace(8), [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75])
})

