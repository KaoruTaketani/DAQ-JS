import { test } from 'node:test'
import gauss1 from './gauss1.js'
import almostEqual from './almostEqual.js'

test('gauss1 function and its derivative by its parameter', () => {

    almostEqual(gauss1(0.3, [0.5, 0.5, 0.5])[0], 0.42607)
    almostEqual(gauss1(0.3, [0.5, 0.5, 0.5])[1][0], 0.85214)
    almostEqual(gauss1(0.3, [0.5, 0.5, 0.5])[1][1], -0.68172)
    almostEqual(gauss1(0.3, [0.5, 0.5, 0.5])[1][2], 0.27269)
})

