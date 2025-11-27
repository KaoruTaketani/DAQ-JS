import { ok } from 'assert'
import sum from './sum.js'

/**
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */
export default (
    a,
    b
) => {
    ok(a.length === b.length)

    return sum(a.map((value, index) => value * b[index]))
}