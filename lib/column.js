import sub2ind from './sub2ind.js'

/**
 * @param {import('./index').NDArray} x
 * @param {number} j
 * @returns {number[]}
 */
export default (
    x,
    j
) => {
    const y = new Array(x.shape[0]).fill(0)
    for (let i = 0; i < x.shape[0]; ++i) {
        // j is expected starts from 1
        y[i] = x.data[sub2ind(x.shape, i + 1, j)]
    }
    return y
}