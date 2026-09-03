import { strictEqual } from 'assert'
import { test } from 'node:test'
import rescale from './rescale.js'
import isapprox from './isapprox.js'

test('example with InputMin&InputMax of matlab', () => {
    const limits = [1, 5]
    strictEqual(rescale(-30, limits), 0)
    strictEqual(rescale(1, limits), 0)
    strictEqual(rescale(2, limits), 0.25)
    strictEqual(rescale(3, limits), 0.5)
    strictEqual(rescale(4, limits), 0.75)
    strictEqual(rescale(5, limits), 1)
    strictEqual(rescale(70, limits), 1)
})

test('example for floating number limits', () => {
    const limits = [0.5, 0.9]
    strictEqual(rescale(0.4, limits), 0)
    strictEqual(rescale(0.5, limits), 0)
    isapprox(rescale(0.6, limits), 0.25)
    isapprox(rescale(0.7, limits), 0.5)
    isapprox(rescale(0.8, limits), 0.75)
    strictEqual(rescale(0.9, limits), 1)
    strictEqual(rescale(1.0, limits), 1)
})

