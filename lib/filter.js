/**
 * @param {number[]} b
 * @param {number[]|number} a
 * @param {number[]} x
 * @returns {number[]}
 */
export default (
    b,
    a,
    x
) => {
    if (Array.isArray(a)) {
        return []
    } else {
        const y = new Array(x.length - b.length).fill(0)

        for (let n = 0; n < y.length; ++n) {
            let tmp = 0
            for (let i = 0; i < b.length; ++i) {
                tmp += x[n + i]
            }
            y[n] = tmp / b.length
        }
        return y
    }
}