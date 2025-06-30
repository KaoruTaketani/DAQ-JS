import { readFileSync, writeFile } from 'fs'
import { test } from 'node:test'
import axes from './axes.js'
import colon from './colon.js'
import lsqnonlin from './lsqnonlin.js'
import scatter from './scatter.js'

test('example inputs in lsqcurvefit of matlab', () => {
    const xdata = [0.9, 1.5, 13.8, 19.8, 24.1, 28.2, 35.2, 60.3, 74.6, 81.],
        ydata = [455.2, 428.6, 124.1, 67.3, 43.2, 28.1, 13.1, -0.4, -1.3, -1.5],
        fun = [
            p => xdata.map((_, i) => ydata[i] - p[0] * Math.exp(p[1] * xdata[i])),
            p => xdata.map((_, i) => [
                -Math.exp(p[1] * xdata[i]),
                -p[0] * xdata[i] * Math.exp(p[1] * xdata[i])
            ])
        ],
        p = lsqnonlin(fun, [500, -0.1])
})

test('example inputs in lsqnonlin of matlab', () => {


    // replaced randn by rand in the example input
    const xy = JSON.parse(readFileSync('./lsqnonlin.json', 'utf8')),
        // x = linspace(0, 3),
        // y = d.map(d => Math.exp(-1.3 * d) + 0.05 * (Math.random() - 0.5)),
        fun = [
            r => xy.x.map((_, i) => Math.exp(-xy.x[i] * r[0]) - xy.y[i]),
            r => xy.x.map((_, i) => [-xy.x[i] * Math.exp(-xy.x[i] * r[0])])
        ],
        p = lsqnonlin(fun, [4]),// 4 seems to be far from optimum
        ax = {
            xLim: [0, 3],
            yLim: [-0.2, 1.2],
            xTick: colon(0, 0.5, 3),
            yTick: colon(-0.2, 0.2, 1.2),
            xTickLabel: colon(0, 0.5, 3).map(x => x.toFixed(1)),
            yTickLabel: colon(-0.2, 0.2, 1.2).map(y => y.toFixed(1))
        }
    // writeFile('./lsqnonlin.json', JSON.stringify({ x: x, y: y }), 'utf8', err => {
    //     if (err) throw err
    // })
    writeFile('./lsqnonlin.svg', [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 420">',
        axes(ax),
        // map function is copied from lsqcurvefit.js
        // line(ax, times, times.map(time => result[0] * Math.exp(result[1] * time))),
        scatter(ax, xy.x, xy.y),
        '</svg>'
    ].join(''), 'utf8', err => {
        if (err) throw err
    })
})

