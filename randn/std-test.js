import { test } from 'node:test'
import almostEqual from './almostEqual.js'
import std from './std.js'
import mean from './mean.js'

test('returns standard deviation', () => {
    almostEqual(std([4, 2, -9]), 7)
    const m1 = mean([-5, 3, 1])
    almostEqual(std([-5, 3, 1]), Math.hypot(-5 - m1, 3 - m1, 1 - m1) / Math.SQRT2)
    const m2 = mean([1, 5, 7])
    almostEqual(std([1, 5, 7]), Math.hypot(1 - m2, 5 - m2, 7 - m2) / Math.SQRT2)
})

test('example of std of matlab', () => {
    const S = std([[4, -5, 1], [2, 3, 5], [-9, 1, 7]])
    // output is S = 1×3
    //
    //    7.0000    4.1633    3.0551
})