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
