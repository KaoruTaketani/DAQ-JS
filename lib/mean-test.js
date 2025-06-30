import { test } from 'node:test'
import almostEqual from './almostEqual.js'
import mean from './mean.js'
import colon from './colon.js'

test('returns mean', () => {
    almostEqual(mean([0, 2, 1, 4]), 1.75)
    almostEqual(mean([1, 3, 3, 2]), 2.25)
    almostEqual(mean([1, 2, 2, 2]), 1.75)
})

test('returns weighted mean', () => {
    almostEqual(mean([1, 7, 1, 1, 6], [1, 2, 1, 2, 3]), 4.00000)
    almostEqual(mean([1, 9, 9, 9, 2], [1, 2, 1, 2, 3]), 5.77778)
})

test('returns weighted mean for histogram', () => {
    almostEqual(mean(colon(1, 5), [2, 5, 9, 5, 2]), 3.00000)
})