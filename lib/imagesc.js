import bounds from './bounds.js'
import rescale from './rescale.js'
import sub2ind from './sub2ind.js'

/**
 * @param {import('./index.js').Uint32NDArray} C
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

    for (let j = 0; j < height; ++j) {
        for (let i = 1; i < width + 1; ++i) {
            // c[j * (width + 1)] is filter type, which is zero
            // sub2ind expects indexes to start frpm 1
            const c = C.data[sub2ind(C.shape, j + 1, i)]
            a[j * (width + 1) + i] = Math.floor(255 * rescale(c, lims))
        }
    }
    return { data: a, width: width, height: height }
}
