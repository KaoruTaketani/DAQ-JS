import bounds from './bounds.js'
import rescale from './rescale.js'
import sub2ind from './sub2ind.js'

/**
 * @param {import('./index.js').NDArray} C
 * @param {number[]} [clims]
 * @returns {import('./index.js').Image}
 */
export default (
    C,
    clims
) => {
    const width = C.shape[1],
        height = C.shape[0],
        a = new Uint8Array(height * (width + 1)),
        lims = clims ?? bounds(C.data)

    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            // sub2ind expects indexes to start frpm 1
            const c = C.data[sub2ind(C.shape, i + 1, j + 1)]
            // a[i * (width + 1)] is filter type, which is zero
            a[i * (width + 1) + j + 1] = Math.floor(255 * rescale(c, lims))
        }
    }
    return { data: a, width: width, height: height }
}
