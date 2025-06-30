/**
 * @param {number[]} a
 * @returns {number}
 */
export default (
    a
) => {
    return a.reduce((prev, curr) => prev + curr, 0)
}