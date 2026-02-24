import { test } from 'node:test'
import exp1 from './exp1.js'
import isapprox from './isapprox.js'

test('exp1 function and its derivative by its parameter', () => {
    
    isapprox(exp1(0.3, [0.5, 0.5])[0], 0.580917)
    isapprox(exp1(0.3, [0.5, 0.5])[1][0], 1.16183)
    isapprox(exp1(0.3, [0.5, 0.5])[1][1], 0.17428)
})

