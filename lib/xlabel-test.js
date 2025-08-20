import { strictEqual } from 'assert'
import { test } from 'node:test'
import xlabel from './xlabel.js'

test('default', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        xlabel(ax, 'x'),
        '<text x="289.8" y="413.8" text-anchor="middle" >x</text>'
    )
})

