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
    if (a.length !== b.length) return Number.NaN

    return sum(a.map((value, index) => value * b[index]))
}