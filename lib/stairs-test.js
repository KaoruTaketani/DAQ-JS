import { strictEqual } from 'assert'
import { test } from 'node:test'
import stairs from './stairs.js'

test('default', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        stairs(ax, { binCounts: [], binLimits: [] }),
        '<polyline points="" stroke="black" fill="none" />'
    )
})

test('2 bins', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 4], yTick: [0, 4], yTickLabel: ['0', '4']
    }
    strictEqual(
        stairs(ax, { binCounts: [2, 4], binLimits: [0, 1] }),
        '<polyline points="73,203 290,203 290,32 507,32" stroke="black" fill="none" />'
    )
})

test('2 bins with overflow', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        stairs(ax, { binCounts: [2, 4], binLimits: [0, 1] }),
        '<polyline points="73,-311 290,-311 290,-995 507,-995" stroke="black" fill="none" />'
    )
})

test('2 bins logscale', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0.1, 4], yTick: [0.1, 4], yTickLabel: ['0.1', '4'],
        yScale: 'log'
    }
    strictEqual(
        stairs(ax, { binCounts: [2, 4], binLimits: [0, 1] }),
        '<polyline points="73,96 290,96 290,32 507,32" stroke="black" fill="none" />'
    )
})

test('2 bins with horizontal overflow', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 4], yTick: [0, 4], yTickLabel: ['0', '4']
    }
    strictEqual(
        stairs(ax, { binCounts: [2, 4], binLimits: [-1, 1] }),
        '<polyline points="73,203 507,203 507,32 941,32" stroke="black" fill="none" />'
    )
})