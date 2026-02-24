import { test } from 'node:test'
import isapprox from './isapprox.js'
import deg2rad from './deg2rad.js'

test('example inputs 1 in deg2rad of matlab', () => {
    isapprox(deg2rad(90), 1.5708)
})

