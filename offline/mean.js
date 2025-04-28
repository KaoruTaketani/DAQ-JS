import sum from './sum.js'
/**
 * @param {number[]} a
 * @param {number[]} w
 * @returns {number}
 */
export default (
    a,
    w
) => {
    return sum(w.map((_w, i) => _w * a[i])) / sum(w)
}