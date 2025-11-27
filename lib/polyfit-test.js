import { strictEqual } from 'assert'
import { test } from 'node:test'
import almostEqual from './almostEqual.js'
import polyfit from './polyfit.js'
import linspace from './linspace.js'
import { writeFile } from 'fs'
import colon from './colon.js'
import axes from './axes.js'
import line from './line.js'
import scatter from './scatter.js'
import polyval from './polyval.js'

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
    const x = linspace(0, 4 * Math.PI, 10),
        y = x.map(x => Math.sin(x)),
        p = polyfit(x, y, 7),
        x1 = linspace(0, 4 * Math.PI),
        y1 = polyval(p, x1),
        ax = {
            xLim: [0, 14],
            yLim: [-1.5, 1.5],
            xTick: colon(0, 2, 14),
            yTick: colon(-1.5, 0.5, 1.5),
            xTickLabel: colon(0, 2, 14).map(x => x.toFixed()),
            yTickLabel: colon(-1.5, 0.5, 1.5).map(y => y.toFixed(1))
        }

    // console.log(p)
    writeFile('./polyfit.svg', [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 420">',
        axes(ax),
        // map function is copied from lsqcurvefit.js
        line(ax, x1, y1),
        scatter(ax, x, y),
        '</svg>'
    ].join(''), 'utf8', err => {
        if (err) throw err
    })
})

