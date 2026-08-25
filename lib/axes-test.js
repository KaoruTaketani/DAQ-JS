import { strictEqual } from 'assert'
import { test } from 'node:test'
import axes from './axes.js'

test('default', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        axes(ax),
        [
            [
                '<polyline',
                'data-x-lim="0 1"',
                'data-y-lim="0 1"',
                'data-position="0.13 0.11 0.775 0.815"',
                'points="73,374 507,374 507,32 73,32 73,374"',
                'stroke="black"',
                'fill="none"',
                '/>'
            ].join(' '),
            '<clipPath id="axes">',
            '. <polyline points="73,374 507,374 507,32 73,32 73,374" />',
            '</clipPath>',
            '<text x="73" y="389" text-anchor="middle" dominant-baseline="central" font-size="12" >0</text>',
            '<text x="507" y="389" text-anchor="middle" dominant-baseline="central" font-size="12" >1</text>',
            '<text x="68" y="374" text-anchor="end" dominant-baseline="central" font-size="12" >0</text>',
            '<text x="68" y="32" text-anchor="end" dominant-baseline="central" font-size="12" >1</text>'
        ].join('')
    )
})

test('y scale is log', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1'],
        yScale: 'log'
    }
    strictEqual(
        axes(ax),
        [
            [
                '<polyline',
                'data-x-lim="0 1"',
                'data-y-lim="0 1"',
                'data-position="0.13 0.11 0.775 0.815"',
                'data-y-scale="log"',
                'points="73,374 507,374 507,32 73,32 73,374"',
                'stroke="black"',
                'fill="none"',
                '/>'
            ].join(' '),
            '<clipPath id="axes">',
            '. <polyline points="73,374 507,374 507,32 73,32 73,374" />',
            '</clipPath>',
            '<text x="73" y="389" text-anchor="middle" dominant-baseline="central" font-size="12" >0</text>',
            '<text x="507" y="389" text-anchor="middle" dominant-baseline="central" font-size="12" >1</text>',
            '<text x="68" y="374" text-anchor="end" dominant-baseline="central" font-size="12" >0</text>',
            '<text x="68" y="32" text-anchor="end" dominant-baseline="central" font-size="12" >1</text>'
        ].join('')
    )
})
