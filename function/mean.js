/**
 * @param {number[]} x
 * @returns {number}
 */
export default (
    x
) => {
    const total = x.reduce((a, b) => a + b, 0)

    return total / x.length
}