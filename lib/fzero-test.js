import { test } from 'node:test'
import fzero from './fzero.js'
import isapprox from './isapprox.js'

test('example input 1 in fzero of matlab', () => {
    isapprox(fzero('sin', 3.0), 3.14159)
})

test('example input 2 in fzero of matlab', () => {
    isapprox(fzero('cos', 1.5), 1.5708)
})
