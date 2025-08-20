import max from './max.js'
import min from './min.js'
/**
 * @param {number[]} a
 * @returns {number[]}
 */
export default (
    a
) => {
    /** @type {number} */
    const _min = min(a)
    /** @type {number} */
    const _max = max(a)

    return a.map(a => (a - _min) / (_max - _min))
}