import sum from './sum.js'
import mean from './mean.js'
/**
 * @param {number[]} a
 * @param {number[]} w
 * @returns {number}
 */
export default (
    a,
    w
) => {
    const _mean = mean(a, w)
    return Math.sqrt(sum(w.map((_w, i) => _w * (a[i] - _mean) ** 2)) / (sum(w) - 1))
}