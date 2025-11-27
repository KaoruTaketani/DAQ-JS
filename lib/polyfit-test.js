import { strictEqual } from 'assert'
import { test } from 'node:test'
import almostEqual from './almostEqual.js'
import polyfit from './polyfit.js'

test('Mathews table 5.7', () => {
    const x = [-3, 0, 2, 4,],
        y = [3, 1, 1, 3]

    const p = polyfit(x, y, 2)
    strictEqual(p.length, 3)
    almostEqual(p[0], 0.178462)
    almostEqual(p[1], -0.192496)
    almostEqual(p[2], 0.850519)
})

test('matlab example 1', () => {
    // const x = linspace(0, 4 * Math.PI, 10),
    //     y = x.map(x => Math.sin(x))

    // const p = polyfit(x, y, 7)
    // console.log(p)
})

