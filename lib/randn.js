import rand from './rand.js'

/**
 * @param {number} sz1
 * @param {number} [sz2]
 * @returns {number[][]}
 */
export default (
    sz1,
    sz2
) => {
    const n = (sz2 ?? sz1) % 2 === 0 ? (sz2 ?? sz1) : (sz2 ?? sz1) + 1,
        uniform = rand(sz1, n),
        normal = new Array(sz1).fill(0).map(_ => new Array(sz2 ?? sz1).fill(0))

    for (let i = 0; i < sz1; ++i) {
        for (let j = 0; j < (sz2 ?? sz1); ++j) {
            // @NormalDistributionByUniformDistribution 
            if (j % 2 === 0) {
                normal[i][j] = Math.sqrt(-2 * Math.log(uniform[i][j]))
                    * Math.cos(2 * Math.PI * uniform[i][j + 1])
            } else {
                normal[i][j] = Math.sqrt(-2 * Math.log(uniform[i][j - 1]))
                    * Math.sin(2 * Math.PI * uniform[i][j])
            }
        }
    }

    return normal
}