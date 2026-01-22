import { test } from 'node:test'
import almostEqual from './almostEqual.js'
import std from './std.js'
import colon from './colon.js'

test('returns standard deviation', () => {
    almostEqual(std([4, 2, -9]), 7.00)
    almostEqual(std([-5, 3, 1]), 4.16333)
    almostEqual(std([1, 5, 7]), 3.05505)
})

test('returns weighted standard deviation', () => {
    almostEqual(std([1, 3, -9], [1, 1, 0.5]), 4.48999)
    almostEqual(std([5, 7, 2], [1, 1, 0.5]), 1.83303)
})

test('returns weighted standard deviation for histogram', () => {
    almostEqual(std(colon(1, 5), [2, 5, 9, 5, 2]), 1.06322)
})

test('returns weighted standard deviation for histogram using Uint32Array', () => {
    almostEqual(std(colon(1, 5), new Uint32Array([2, 5, 9, 5, 2])), 1.06322)
})

