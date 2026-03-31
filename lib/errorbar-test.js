import { strictEqual } from 'assert'
import { test } from 'node:test'
import errorbar from './errorbar.js'

test('default', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        errorbar(ax, [1], [0.5], [0.1]),
        '<line x1="506.8" y1="236.88000000000002" x2="506.8" y2="168.42000000000004" stroke="black"/>'
    )
})

test('x shifted', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        errorbar(ax, [0.5], [0.5], [0.1]),
        '<line x1="289.8" y1="236.88000000000002" x2="289.8" y2="168.42000000000004" stroke="black"/>'
    )
})

