import { test } from 'node:test'
import trapz from './trapz.js'
import isapprox from './isapprox.js'

test('example 2 of matlab', () => {
    const X = [1, 2.5, 7, 10],
        Y1 = [5.2, 7.7, 9.6, 13.2],
        Y2 = [4.8, 7.0, 10.5, 14.5],
        Y3 = [4.9, 6.5, 10.2, 13.8]

    isapprox(trapz(X, Y1), 82.800)
    isapprox(trapz(X, Y2), 85.725)
    isapprox(trapz(X, Y3), 82.125)
})

