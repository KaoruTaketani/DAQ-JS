import size from './size.js'
import zeros from './zeros.js'
import { ok } from 'assert'
/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @returns {number[][]}
 */
export default (
    A,
    B
) => {
    ok(size(A)[0] === size(B)[0])
    ok(size(A)[1] === size(B)[1])

    const [sz1, sz2] = size(A),
        C = zeros(sz1, sz2)
    for (let i = 0; i < sz1; ++i) {
        for (let j = 0; j < sz2; ++j) {
            C[i][j] = A[i][j] + B[i][j]
        }
    }

    return C
}