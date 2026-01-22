/**
 * @param {number[]|Uint32Array} x
 * @returns {number[]}
 */
export default (
    x
) => {
    const min = x.filter(x => !Number.isNaN(x)).reduce((a, b) => Math.min(a, b), Infinity)
    const max = x.filter(x => !Number.isNaN(x)).reduce((a, b) => Math.max(a, b), -Infinity)
    return [min, max]
}