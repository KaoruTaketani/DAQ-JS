import rand from './rand.js'

/**
 * @param {number} sz1
 * @param {number} sz2
 * @returns {number[]}
 */
export default (
    sz1,
    sz2
) => {
    /** see @NormalDistributionByUniformDistribution */
    if (sz2 == 2) {
        const uniform = rand(sz1, 2),
            normal = new Array(sz1 * 2)
        normal.forEach((_, i) => {
            if (i % 2 === 0) {
                normal[i] = Math.sqrt(-2 * Math.log(uniform[i])) * Math.cos(2 * Math.PI * uniform[i + 1])
            } else {
                normal[i] = Math.sqrt(-2 * Math.log(uniform[i - 1])) * Math.sin(2 * Math.PI * uniform[i])
            }
        })
        return normal
    } else {
        const uniform = rand(sz1, 2),
            normal = new Array(sz1)
        normal.forEach((_, i) => {
            normal[i] = Math.sqrt(-2 * Math.log(uniform[2 * i])) * Math.cos(2 * Math.PI * uniform[2 * i + 1])
        })
        return normal
    }
}