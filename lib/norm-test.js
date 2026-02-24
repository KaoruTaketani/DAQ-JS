import { test } from 'node:test'
import norm from './norm.js'
import isapprox from './isapprox.js'

test('example input of norm in matlab', () => {
    isapprox(norm([1,-2,3]), 3.74166)
})

