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
                'data-xmin-in-data="0"',
                'data-xmax-in-data="1"',
                'data-ymin-in-data="0"',
                'data-ymax-in-data="1"',
                'data-xmin-in-pixels="73"',
                'data-xmax-in-pixels="507"',
                'data-ymin-in-pixels="374"',
                'data-ymax-in-pixels="32"',
                'points="73,374 507,374 507,32 73,32 73,374"',
                'stroke="black"',
                'fill="none"',
                '/>'
            ].join(' '),
            '<text x="73" y="389" text-anchor="middle" dominant-baseline="central" font-size="12" >0</text>',
            '<text x="507" y="389" text-anchor="middle" dominant-baseline="central" font-size="12" >1</text>',
            '<text x="68" y="374" text-anchor="end" dominant-baseline="central" font-size="12" >0</text>',
            '<text x="68" y="32" text-anchor="end" dominant-baseline="central" font-size="12" >1</text>'
        ].join('')
    )
})
