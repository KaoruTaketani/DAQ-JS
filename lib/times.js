import size from './size.js'
import zeros from './zeros.js'

/**
 * @param {number} a
 * @param {number[][]} b
 * @returns {number[][]}
 */
export default (
    a,
    b
) => {
    const [sz1, sz2] = size(b),
        C = zeros(sz1, sz2)

    for (let i = 0; i < b.length; ++i) {
        for (let j = 0; j < b[0].length; ++j) {
            C[i][j] = a * b[i][j]
        }
    }

    return C
}