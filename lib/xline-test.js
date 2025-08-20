import { strictEqual } from 'assert'
import { test } from 'node:test'
import xline from './xline.js'

test('default', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        xline(ax, 0.5),
        '<polyline points="289.8,373.8 289.8,31.500000000000057" stroke="black" fill="none" />'
    )
})

test('red', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        xline(ax, 0.5, 'red'),
        '<polyline points="289.8,373.8 289.8,31.500000000000057" stroke="rgb(255,0,0)" fill="none" />'
    )
})

