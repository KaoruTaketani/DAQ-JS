/**
 * @param {number} sz1
 * @param {number} [sz2]
 * @returns {number[][]}
 */
export default (
    sz1,
    sz2
) => {
    const r = new Array(sz1).fill(0).map(_ => new Array(sz2 ?? sz1).fill(0))

    for (let i = 0; i < sz1; ++i) {
        for (let j = 0; j < (sz2 ?? sz1); ++j) {
            r[i][j] = Math.random()
        }
    }

    return r
}