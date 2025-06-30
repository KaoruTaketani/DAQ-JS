import { ok } from 'assert'
import size from './size.js'
import zeros from './zeros.js'

/** 
 * @param {number[][]} a
 * @param {number[][]} b
 * @returns {number[][]}
 */
export default (
    a,
    b
) => {
    const [a1, a2] = size(a),
        [b1, b2] = size(b)

    ok(a2===b1)

    const c = zeros(a1, b2)

    for (let i = 0; i < a1; ++i) {
        for (let j = 0; j < b2; ++j) {
            let tmp = 0
            for (let k = 0; k < a2; ++k) {
                tmp += a[i][k] * b[k][j]
            }
            c[i][j] = tmp
        }
    }

    return c
}