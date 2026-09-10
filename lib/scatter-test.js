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
            '<circle cx="73" cy="374" r="3.4" stroke="black" fill="none" clip-path="url(#axes)" />',
            '<circle cx="290" cy="203" r="3.4" stroke="black" fill="none" clip-path="url(#axes)" />',
            '<circle cx="507" cy="32" r="3.4" stroke="black" fill="none" clip-path="url(#axes)" />'
        ].join('')
    )
})

test('y min not positive with y scale is log', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 4], yTick: [0, 4], yTickLabel: ['0', '4'],
        yScale: 'log'
    }
    strictEqual(
        scatter(ax, [-1, 0, 1], [-1, 0, 1]),
        '<text x="290" y="203" text-anchor="middle" font-size="30" fill="red">y min must be positive</text>'
    )
})

test('x min not positive with y scale is log', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 4], yTick: [0, 4], yTickLabel: ['0', '4'],
        xScale: 'log'
    }
    strictEqual(
        scatter(ax, [-1, 0, 1], [-1, 0, 1]),
        '<text x="290" y="203" text-anchor="middle" font-size="30" fill="red">x min must be positive</text>'
    )
})
