import { strictEqual } from 'assert'
import { test } from 'node:test'
import line from './line.js'

test('default', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        line(ax, [], []),
        '<polyline points="" stroke="black" fill="none" clip-path="url(#axes)" />'
    )
})

test('3 points', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        line(ax, [0, 0.5, 1], [0, 0.5, 1]),
        '<polyline points="73,374 290,203 507,32" stroke="black" fill="none" clip-path="url(#axes)" />'
    )
})

test('3 points with red', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        line(ax, [0, 0.5, 1], [0, 0.5, 1], { color: 'red' }),
        '<polyline points="73,374 290,203 507,32" stroke="red" fill="none" clip-path="url(#axes)" />'
    )
})

test('3 points with dashed', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        line(ax, [0, 0.5, 1], [0, 0.5, 1], { lineStyle: '--' }),
        '<polyline points="73,374 290,203 507,32" stroke="black" fill="none" stroke-dasharray="10 5" />'
    )
})

test('3 points with red dashed', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        line(ax, [0, 0.5, 1], [0, 0.5, 1], { lineStyle: '--', color: 'red' }),
        '<polyline points="73,374 290,203 507,32" stroke="red" fill="none" stroke-dasharray="10 5" />'
    )
})

test('y min is negative and y scale is log', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1'],
        yScale: 'log'
    }
    strictEqual(
        line(ax, [0, 0.5, 1], [-10, 0.5, 1]),
        '<text x="290" y="203" text-anchor="middle" font-size="30" fill="red">y min must be positive</text>'
    )
})

test('x min is negative and x scale is log', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1'],
        xScale: 'log'
    }
    strictEqual(
        line(ax, [-10, 0.5, 1], [-10, 0.5, 1]),
        '<text x="290" y="203" text-anchor="middle" font-size="30" fill="red">x min must be positive</text>'
    )
})

