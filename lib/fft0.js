import freqspace from '../lib/freqspace.js'
import sum from '../lib/sum.js'
/**
 * @param {number[]|Uint32Array} x
 * @returns {number[]}
 */
export default (
    x,
) => {
    // const h = histogramValue
    // return h[offset + 1] * Math.SQRT1_2
    //     + h[offset + 2]
    //     + h[offset + 3] * Math.SQRT1_2
    //     - h[offset + 5] * Math.SQRT1_2
    //     - h[offset + 6]
    //     - h[offset + 7] * Math.SQRT1_2
    const fs = freqspace(x.length)
    return [
        sum(fs.map((f, i) => x[i] * Math.cos(Math.PI * f))),
        sum(fs.map((f, i) => x[i] * Math.sin(Math.PI * f)))
    ]
}