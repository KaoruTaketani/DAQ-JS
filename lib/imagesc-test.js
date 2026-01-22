import { strictEqual } from 'assert'
import { test } from 'node:test'
import imagesc from './imagesc.js'

test('example input 1 in imagesc of matlab', () => {
    /** @type {import('./index.js').Histogram2D} */
    const hist2d = {
        binCounts: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
        numBins: [4, 3],
        xBinLimits: [],
        yBinLimits: []
    }
    const im = imagesc(hist2d)
    strictEqual(im.data.length, 4 * 4)

    strictEqual(im.data[0], 0)
    strictEqual(im.data[1], 0)
    strictEqual(im.data[2], 23)
    strictEqual(im.data[3], 46)

    strictEqual(im.data[4], 0)
    strictEqual(im.data[5], 69)
    strictEqual(im.data[6], 92)
    strictEqual(im.data[7], 115)

    strictEqual(im.data[8], 0)
    strictEqual(im.data[9], 139)
    strictEqual(im.data[10], 162)
    strictEqual(im.data[11], 185)

    strictEqual(im.data[12], 0)
    strictEqual(im.data[13], 208)
    strictEqual(im.data[14], 231)
    strictEqual(im.data[15], 255)
})

test('example input 1 in imagesc of matlab with clims', () => {
    /** @type {import('./index.js').Histogram2D} */
    const hist2d = {
        binCounts: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
        numBins: [4, 3],
        xBinLimits: [],
        yBinLimits: []
    }
    const im = imagesc(hist2d,[0,255])
    strictEqual(im.data.length, 4 * 4)

    strictEqual(im.data[0], 0)
    strictEqual(im.data[1], hist2d.binCounts[0])
    strictEqual(im.data[2], hist2d.binCounts[1])
    strictEqual(im.data[3], hist2d.binCounts[2])

    strictEqual(im.data[4], 0)
    strictEqual(im.data[5], hist2d.binCounts[3])
    strictEqual(im.data[6], hist2d.binCounts[4])
    strictEqual(im.data[7], hist2d.binCounts[5])

    strictEqual(im.data[8], 0)
    strictEqual(im.data[9], hist2d.binCounts[6])
    strictEqual(im.data[10], hist2d.binCounts[7])
    strictEqual(im.data[11], hist2d.binCounts[8])

    strictEqual(im.data[12], 0)
    strictEqual(im.data[13], hist2d.binCounts[9])
    strictEqual(im.data[14], hist2d.binCounts[10])
    strictEqual(im.data[15], hist2d.binCounts[11])
})
