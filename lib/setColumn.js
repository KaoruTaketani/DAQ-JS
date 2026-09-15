import sub2ind from './sub2ind.js'

/**
 * @param {import('./index').NDArray} x
 * @param {number} j
 * @param {number[]} column
 */
export default (
    x,
    j,
    column
) => {
    for (let i = 0; i < x.shape[0]; ++i) {
        // j is expected starts from 1
        x.data[sub2ind(x.shape, i + 1, j)] = column[i]
    }
}