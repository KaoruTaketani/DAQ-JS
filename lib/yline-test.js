import { strictEqual } from 'assert'
import { test } from 'node:test'
import yline from './yline.js'

test('default', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [1.5, 3.5], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        yline(ax, 2.5),
        '<polyline points="73,203 507,203" stroke="black" fill="none" clip-path="url(#axes)" />'
    )
})
