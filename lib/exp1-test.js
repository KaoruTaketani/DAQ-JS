import { test } from 'node:test'
import exp1 from './exp1.js'
import isapprox from './isapprox.js'

test('exp1 function and its derivative by its parameter', () => {
    /** @type {function[]} */
    const [func, grad] = exp1

    isapprox(func(0.3, [0.5, 0.5]), 0.580917)
    isapprox(grad(0.3, [0.5, 0.5])[0], 1.16183)
    isapprox(grad(0.3, [0.5, 0.5])[1], 0.17428)
})

