import { strictEqual } from 'assert'
import { test } from 'node:test'
import xline from './xline.js'

test('default', () => {
    const ax = {
        xLim: [2, 4], xTick: [2, 4], xTickLabel: ['2', '4'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        xline(ax, 3),
        '<polyline points="290,374 290,32" stroke="black" fill="none" clip-path="url(#axes)" />'
    )
})
