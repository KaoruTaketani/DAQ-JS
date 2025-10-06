import max from './max.js'
import sub2ind from './sub2ind.js'

/**
 * @param {import('./index.js').Histogram2D} C
 * @returns {Uint8Array}
 */
export default (
    C
) => {
    const width = C.numBins[1],
        height = C.numBins[0],
        scale = max(C.binCounts),
        a = new Uint8Array(height * (width + 1))
    for (let j = 0; j < height; ++j) {
        for (let i = 1; i < width + 1; ++i) {
            // c[j * (width + 1)] is filter type, which is zero
            // sub2ind expects indexes to start frpm 1
            a[j * (width + 1) + i] = Math.floor(
                255 * C.binCounts[sub2ind(C.numBins, j + 1, i)]
                / scale
            )
        }
    }
    return a
}
