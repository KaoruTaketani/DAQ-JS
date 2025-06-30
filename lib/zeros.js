/**
 * @param {number} sz1
 * @param {number} [sz2]
 * @returns {number[][]}
 */
export default (
    sz1,
    sz2
) => {
    return new Array(sz1).fill(null).map(_ => new Array(sz2 ?? sz1).fill(0))
}