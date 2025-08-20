import eye from './eye.js'
import size from './size.js'
import { ok } from 'assert'

/**
 * @param {number[]|number[][]} v
 * @returns {number[][]}
 */
export default (
    v
) => {
    if (Array.isArray(v[0])) {
        // if v is matrix, extract diagonal elements
        const [sz1, sz2] = size(v)
        ok(sz1 === sz2)
        return new Array(sz1).fill(0).map((_, i) => v[i][i])
    } else {
        // if v is vector, use them for the diagonal elements
        const D = eye(v.length)

        for (let i = 0; i < v.length; ++i) {
            D[i][i] = v[i]
        }
        return D
    }
}