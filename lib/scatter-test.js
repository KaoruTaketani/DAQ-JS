import { strictEqual } from 'assert'
import { test } from 'node:test'
import scatter from './scatter.js'

test('default', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        scatter(ax, [], []),
        ''
    )
})

test('3 points', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        scatter(ax, [0, 0.5, 1], [0, 0.5, 1]),
        [
            '<circle cx="72.8" cy="373.8" r="3.4" stroke="black" fill="none"/>',
            '<circle cx="289.8" cy="202.65000000000003" r="3.4" stroke="black" fill="none"/>',
            '<circle cx="506.8" cy="31.500000000000057" r="3.4" stroke="black" fill="none"/>'
        ].join('')
    )
})

