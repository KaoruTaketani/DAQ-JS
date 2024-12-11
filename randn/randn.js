import rand from './rand.js'


export default (
    sz1,
    sz2
) => {
    const n = (sz2 ?? sz1) % 2 === 0 ? (sz2 ?? sz1) : (sz2 ?? sz1) + 1,
        uniform = rand(sz1, n),
        normal = new Array(sz1).fill().map(_ => new Array(sz2 ?? sz1).fill())
    console.log(`${(sz2 ?? sz1) % 2}, ${n}`)

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

    // if ((sz2 ?? sz1) === 2) {
    //     normal.forEach((_, i) => {
    //         if (i % 2 === 0) {
    //             normal[i] = Math.sqrt(-2 * Math.log(uniform[i])) * Math.cos(2 * Math.PI * uniform[i + 1])
    //         } else {
    //             normal[i] = Math.sqrt(-2 * Math.log(uniform[i - 1])) * Math.sin(2 * Math.PI * uniform[i])
    //         }
    //     })
    //     return normal
    // } else {
    //     normal.forEach((_, i) => {
    //         normal[i] = Math.sqrt(-2 * Math.log(uniform[2 * i])) * Math.cos(2 * Math.PI * uniform[2 * i + 1])
    //     })
    //     return normal
    // }
    return normal
}