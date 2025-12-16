import { test } from 'node:test'
import exp1 from './exp1.js'
import almostEqual from './almostEqual.js'

test('exp1 function and its derivative by its parameter', () => {
    
    almostEqual(exp1[0](0.3, [0.5, 0.5]), 0.580917)
    almostEqual(exp1[1](0.3, [0.5, 0.5])[0], 1.16183)
    almostEqual(exp1[1](0.3, [0.5, 0.5])[1], 0.17428)
})

