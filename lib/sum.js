/**
 * @param {number[]|Uint32Array|Float64Array} a
 * @returns {number}
 */
export default (
    a
) => {
    return a.reduce((prev, curr) => prev + curr, 0)
}