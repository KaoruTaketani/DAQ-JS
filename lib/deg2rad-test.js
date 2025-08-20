import { test } from 'node:test'
import almostEqual from './almostEqual.js'
import deg2rad from './deg2rad.js'

test('example inputs 1 in deg2rad of matlab', () => {
    almostEqual(deg2rad(90), 1.5708)
})

