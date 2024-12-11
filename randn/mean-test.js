import { test } from 'node:test'
import almostEqual from './almostEqual.js'
import mean from './mean.js'

test('returns mean', () => {
    almostEqual(mean([0, 2, 1, 4]), 1.75)
    almostEqual(mean([1, 3, 3, 2]), 2.25)
    almostEqual(mean([1, 2, 2, 2]), 1.75)
})

test('example of mean in matlab', () => {
    const M = mean([[0, 1, 1], [2, 3, 2], [1, 3, 2], [4, 2, 2]])
    // mean averages over column, (0+2+1+4)/4=1.75
    // output is M = 1×3
    //
    //    1.7500    2.2500    1.7500
})