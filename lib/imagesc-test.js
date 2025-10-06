import { strictEqual } from 'assert'
import { test } from 'node:test'
import imagesc from './imagesc.js'

test('example input 1 in imagesc of matlab', () => {
    /** @type {import('./index.js').Histogram2D} */
    const hist2d = {
        binCounts: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
        numBins: [4, 3],
        xBinLimits: [0, 3],
        yBinLimits: [0, 2]
    }
    const im = imagesc(hist2d)
    strictEqual(im.length, 4 * 4)
})

