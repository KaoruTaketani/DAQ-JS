/**
 * @param {number[]} x
 * @returns {number}
 */
export default (
    x
) => {
    return x.reduce((a, b) => a * b, 1)
}