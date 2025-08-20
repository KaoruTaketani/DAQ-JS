import { strictEqual } from 'assert'
import { test } from 'node:test'
import ylabel from './ylabel.js'

test('default', () => {
    const ax = {
        xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
        yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1']
    }
    strictEqual(
        ylabel(ax, 'y'),
        '<text x="22.799999999999997" y="202.65000000000003" text-anchor="middle" transform="rotate(-90,22.799999999999997,202.65000000000003)">y</text>'
    )
})

