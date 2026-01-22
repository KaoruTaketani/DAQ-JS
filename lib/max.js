/**
 * @param {number[]|Uint32Array} x
 * @returns {number}
 */
export default (
    x
) => {
    return x.filter(x => !Number.isNaN(x)).reduce((a, b) => Math.max(a, b), -Infinity)
}