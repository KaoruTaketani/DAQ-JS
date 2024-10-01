/**
 * @param {number} x1
 * @param {number} x2
 * @param {number} n
 * @returns {number[]}
 */
export default (
    x1,
    x2,
    n
) => {
    const dx = (x2 - x1) / (n - 1)

    return new Array(n).fill(0).map((_, i) => x1 + i * dx)
}