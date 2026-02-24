import { test } from 'node:test'
import isapprox from './isapprox.js'
import std from './std.js'
import colon from './colon.js'

test('returns standard deviation', () => {
    isapprox(std([4, 2, -9]), 7.00)
    isapprox(std([-5, 3, 1]), 4.16333)
    isapprox(std([1, 5, 7]), 3.05505)
})

test('returns weighted standard deviation', () => {
    isapprox(std([1, 3, -9], [1, 1, 0.5]), 4.48999)
    isapprox(std([5, 7, 2], [1, 1, 0.5]), 1.83303)
})

test('returns weighted standard deviation for histogram', () => {
    isapprox(std(colon(1, 5), [2, 5, 9, 5, 2]), 1.06322)
})

test('returns weighted standard deviation for histogram using Uint32Array', () => {
    isapprox(std(colon(1, 5), new Uint32Array([2, 5, 9, 5, 2])), 1.06322)
})

