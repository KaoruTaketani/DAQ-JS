import { ok } from 'assert'
import mldivide from './mldivide.js'
import transpose from './transpose.js'
import zeros from './zeros.js'
import sum from './sum.js'
import dot from './dot.js'
import power from './power.js'

/**
 * @param {number[]} x
 * @param {number[]} y
 * @param {number} n
 * @returns {number[]}
 */
export default (
    x,
    y,
    n
) => {
    ok(x.length === y.length)
    const V = zeros(n + 1, n + 1),
        w = zeros(n + 1, 1)
    for (let i = 0; i < n + 1; ++i) {
        for (let j = 0; j < n + 1; ++j) {
            V[i][j] = sum(power(x, (n - i) + (n - j)))
        }
    }
    console.log(V)
    for (let i = 0; i < n + 1; ++i) {
        w[i][0] = dot(power(x, n - i), y)
    }
    console.log(w)

    return transpose(mldivide(V, w))[0]
}