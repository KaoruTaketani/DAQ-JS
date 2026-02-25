import { test } from 'node:test'
import gauss1 from './gauss1.js'
import isapprox from './isapprox.js'

test('gauss1 function and its derivative by its parameter', () => {
    /** @type {function[]} */
    const [func, grad] = gauss1

    isapprox(func(0.3, [0.5, 0.5, 0.5]), 0.42607)
    isapprox(grad(0.3, [0.5, 0.5, 0.5])[0], 0.85214)
    isapprox(grad(0.3, [0.5, 0.5, 0.5])[1], -0.68172)
    isapprox(grad(0.3, [0.5, 0.5, 0.5])[2], 0.27269)
})

