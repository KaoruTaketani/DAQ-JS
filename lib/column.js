import sub2ind from './sub2ind.js'

/**
 * @param {import('./index').NDArray} x
 * @param {number} i
 * @returns {number[]}
 */
export default (
    x,
    i
) => {
    const y = new Array(x.shape[0]).fill(0)
    for (let j = 1; j <= x.shape[0]; ++j) {
        y[j - 1] = x.data[sub2ind(x.shape, j, i)]
    }
    return y
}