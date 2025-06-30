import { test } from 'node:test'
import almostEqual from './almostEqual.js'
import mean from './mean.js'

test('returns mean', () => {
    almostEqual(mean([0, 2, 1, 4]), 1.75)
    almostEqual(mean([1, 3, 3, 2]), 2.25)
    almostEqual(mean([1, 2, 2, 2]), 1.75)
})
