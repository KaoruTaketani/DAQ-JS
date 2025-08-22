import { test } from 'node:test'
import filter from './filter.js'
import linspace from './linspace.js'
import { writeFile } from 'fs'
import axes from './axes.js'
import line from './line.js'
import colon from './colon.js'
import { strictEqual } from 'assert'
import almostEqual from './almostEqual.js'

test('example input 1 in filter of matlab', () => {
    const t = linspace(-Math.PI, Math.PI, 100),
        x = t.map(_t => Math.sin(_t) + Math.random()),
        y = filter([1 / 5, 1 / 5, 1 / 5, 1 / 5, 1 / 5], 1, x)

    // console.log(y)
    const ax = {
        xLim: [0, 100],
        yLim: [-2, 2],
        xTick: colon(0, 10, 100),
        yTick: colon(-2, 1, 2),
        xTickLabel: colon(0, 10, 100).map(x => x.toFixed()),
        yTickLabel: colon(-2, 1, 2).map(y => y.toFixed())
    }
    writeFile('./filter.svg', [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 420">',
        axes(ax),
        // map function is copied from lsqcurvefit.js
        line(ax, colon(1, 100), x),
        line(ax, colon(1, 95), y, { lineStyle: '--' }),
        '</svg>'
    ].join(''), 'utf8', err => {
        if (err) throw err
    })
})

test('example input 3 in filter of matlab', () => {
    const x = [2, 1, 6, 2, 4, 3],
        y = filter([1 / 3, 1 / 3, 1 / 3], 1, x)

    // console.log(y)
    strictEqual(y.length, 6)
    strictEqual(y[0], 2 / 3)
    strictEqual(y[1], 1)
    strictEqual(y[2], 3)
    strictEqual(y[3], 3)
    strictEqual(y[4], 4)
    almostEqual(y[5], 3)
})

