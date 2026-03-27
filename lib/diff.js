/**
 * @param {number[]} x
 * @returns {number[]}
 */
export default (
    x
) => {
    return new Array(x.length - 1).fill(0).map((_, i) => {
        return x[i + 1] - x[i]
    })
}