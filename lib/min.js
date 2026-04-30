/**
 * @param {number[]|Uint32Array|Float64Array} x
 */
export default (
    x
) => {
    return x.filter(x => !Number.isNaN(x)).reduce((a, b) => Math.min(a, b), Infinity)
}