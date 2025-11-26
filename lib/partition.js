import { ok } from 'assert'
import sum from './sum.js'
/**
 * @param {number} sz
 * @param {number} n
 * @param {number} i
 * @returns {number[]}
 */
export default (
    sz,
    n,
    i
) => {
    ok(i > -1)
    ok(i < n)
    ok(sz > n)

    const remainder = sz % n,
        quotient = Math.floor(sz / n),
        lengths = new Array(n).fill(0)
    for (let j = 0; j < n; j++) {
        if (j < remainder) {
            lengths[j] = quotient + 1
        } else {
            lengths[j] = quotient
        }
    }
    ok(sum(lengths) === sz)
    // console.log(lengths)
    return [
        sum(lengths.slice(0, i)),
        sum(lengths.slice(0, i + 1))
    ]
}