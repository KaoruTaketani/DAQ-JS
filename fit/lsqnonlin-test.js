import { test } from 'node:test'
import linspace from './linspace.js'
import lsqnonlin from './lsqnonlin.js'

test('example inputs in lsqnonlin of matlab', () => {
    // replaced randn by rand in the example input
    const d = linspace(0, 3),
        y = d.map(d => Math.exp(-1.3 * d) + 0.05 * (Math.random() - 0.5)),
        fun = [
            r => d.map((_, i) => Math.exp(-d[i] * r[0]) - y[i]),
            r => d.map((_, i) => [-d[i] * Math.exp(-d[i] * r[0])])
        ],
        x = lsqnonlin(fun, [1.6])// 4 seems to be far from optimum
})

test('example inputs in lsqcurvefit of matlab', () => {
    const xdata = [0.9, 1.5, 13.8, 19.8, 24.1, 28.2, 35.2, 60.3, 74.6, 81.],
        ydata = [455.2, 428.6, 124.1, 67.3, 43.2, 28.1, 13.1, -0.4, -1.3, -1.5],
        fun = [
            p => xdata.map((_, i) => ydata[i] - p[0] * Math.exp(p[1] * xdata[i])),
            p => xdata.map((_, i) => [
                Math.exp(p[1] * xdata[i]),
                p[0] * xdata[i] * Math.exp(p[1] * xdata[i])
            ])
        ],
        p = lsqnonlin(fun, [500, -0.1])
})
