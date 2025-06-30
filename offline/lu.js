import zeros from './zeros.js'
import size from './size.js'
import eye from '../lib/eye.js'
import mtimes from './mtimes.js'
import { ok } from 'assert'

/**
 * @param {number[][]} A
 * @returns {number[][][]}
 */
export default (
    A
) => {
    const [sz1, sz2] = size(A)

    ok(sz1 === sz2)

    const n = sz1,
        L = eye(n),
        U = zeros(n),
        P = eye(n),
        PA = mtimes(P, A)

    for (let i = 0; i < n; ++i) {
        // permutation start
        // permutate row i if PA[i,i] is small
        let p = i,
            v = Math.abs(PA[i][i])
        for (let k = i + 1; k < n; ++k) {
            if (Math.abs(PA[k][i]) > v) {
                v = Math.abs(PA[k][i])
                p = k
            }
        }
        if (p !== i) {
            for (let k = 0; k < n; ++k) {
                const t = PA[i][k]
                PA[i][k] = PA[p][k]
                PA[p][k] = t
            }
            const t = P[p]
            P[p] = P[i]
            P[i] = t
        }
        // permutation end

        for (let j = 0; j < i; ++j) {
            let s = 0
            for (let k = 0; k < i; ++k)
                s += L[i][k] * U[k][j]

            L[i][j] = (PA[i][j] - s) / U[j][j]
        }

        for (let j = i; j < n; ++j) {
            let s = 0
            for (let k = 0; k < i; ++k)
                s += L[i][k] * U[k][j]

            U[i][j] = PA[i][j] - s
        }
    }
    return [L, U, P]
}