/**
 * @param {number} n
 * @returns {number[][]}
 */
export default (
    n
) => {
    return new Array(n).fill(null).map((_, i) =>
        new Array(n).fill(null).map((_, j) => i === j ? 1 : 0)
    )
}