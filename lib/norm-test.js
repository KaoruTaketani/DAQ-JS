import { test } from 'node:test'
import norm from './norm.js'
import almostEqual from './almostEqual.js'

test('example input of norm in matlab', () => {
    almostEqual(norm([1,-2,3]), 3.74166)
})

