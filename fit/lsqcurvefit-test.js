import { writeFile } from 'fs'
import { test } from 'node:test'
import lsqcurvefit from './lsqcurvefit.js'
import scatter from './scatter.js'
import colon from './colon.js'
import axes from './axes.js'
import linspace from './linspace.js'
import line from './line.js'

test('example inputs in lsqcurvefit of matlab', () => {
    const xdata = [0.9, 1.5, 13.8, 19.8, 24.1, 28.2, 35.2, 60.3, 74.6, 81.],
        ydata = [455.2, 428.6, 124.1, 67.3, 43.2, 28.1, 13.1, -0.4, -1.3, -1.5],
        result = lsqcurvefit('exp', [500, -0.1], xdata, ydata),
        times = linspace(xdata[0], xdata.at(-1)),
        gca = {
            xLim: [0, 90],
            yLim: [-100, 500],
            xTick: colon(0, 10, 90),
            yTick: colon(-100, 100, 500),
            xTickLabel: colon(0, 10, 90).map(x => x.toFixed()),
            yTickLabel: colon(-100, 100, 500).map(y => y.toFixed())
        }

    // matlabu passes [100, -5] to p0, but quite different from the optimul
    // so use [500, -0.1] instead
    writeFile('./lsqcurvefit.svg', [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 420">',
        axes(gca),
        // map function is copied from lsqcurvefit.js
        // & parameters are copied from the matlab document
        line(gca, times, times.map(time => 498.8309 * Math.exp(-0.1013 * time))),
        scatter(gca, xdata, ydata),
        '</svg>'
    ].join(''), 'utf8', err => {
        if (err) throw err
    })
    //     const histogramSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    // histogramSVGElement.setAttribute('width', '400')
    // histogramSVGElement.setAttribute('height', '300')
    // histogramSVGElement.setAttribute('viewBox', '0 0 560 420')

})

