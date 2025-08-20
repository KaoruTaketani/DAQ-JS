import max from './max.js'
import min from './min.js'
/**
 * @param {number[]} a
 * @param {number} [l]
 * @param {number} [u]
 * @returns {number[]}
 */
export default (
    a,
    l,
    u
) => {
    /** @type {number} */
    const _min = min(a)
    /** @type {number} */
    const _max = max(a)
    if (!l) l = 0
    if (!u) u = 1
    
    return a.map(a => l + (a - _min) / (_max - _min) * (u - l))
}