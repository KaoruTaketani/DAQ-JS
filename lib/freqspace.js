import colon from './colon.js'
/**
 * @param {number} n
 * @returns {number[]}
 */
export default (
    n
) => {
    return colon(0, 2 / n, 2 * (n - 1) / n)
}