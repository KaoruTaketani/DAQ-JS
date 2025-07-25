import sum from './sum.js'
import mean from './mean.js'
import { ok } from 'assert'

/**
 * @param {number[]} a
 * @param {number[]} [w]
 * @returns {number}
 */
export default (
    a,
    w
) => {
    if (!w) {
        const mu = mean(a),
            squared = a.map(_a => Math.pow(_a - mu, 2))
        return Math.sqrt(sum(squared) / (a.length - 1))
    } else {
        ok(a.length === w.length)
        const mu = mean(a, w),
            squared = a.map((_a, i) => w[i] * Math.pow(_a - mu, 2))
        return Math.sqrt(sum(squared) / sum(w))
    }
}