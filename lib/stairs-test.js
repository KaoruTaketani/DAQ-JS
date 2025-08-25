import { strictEqual } from 'assert'
import { test } from 'node:test'
import stairs from './stairs.js'

test('default', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        stairs(ax, []),
        '<polyline points="" stroke="black" fill="none" />'
    )
})

test('2 bins', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        stairs(ax, [2, 4]),
        '<polyline points="73,203 290,203 290,32 507,32" stroke="black" fill="none" />'
    )
})

