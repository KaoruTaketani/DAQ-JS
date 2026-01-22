import freqspace from './freqspace.js'
import sum from './sum.js'
/**
 * @param {number|Uint32Array} x
 * @returns {number[]}
 */
export default (
    x
) => {
    const fs = freqspace(x.length)
    return [
        sum(fs.map((f, i) => x[i] * Math.cos(Math.PI * f))),
        sum(fs.map((f, i) => x[i] * Math.sin(Math.PI * f)))
    ]
}