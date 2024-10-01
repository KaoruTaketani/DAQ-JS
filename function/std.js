/**
 * @param {number[]} x
 * @returns {number}
 */
export default (
    x
) => {
    const total = x.reduce((a, b) => a + b, 0)
    const squared = x.reduce((a, b) => a + Math.pow(b - total / x.length, 2), 0)
    return Math.sqrt(squared / (x.length - 1))
}