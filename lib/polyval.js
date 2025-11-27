
/**
 * @param {number[]} p
 * @param {number[]} x
 * @returns {number[]}
 */
export default (
    p,
    x
) => {
    return x.map(value => {
        let tmp = 0
        for (let i = 0; i < p.length; ++i) {
            tmp += p[i] * value ** (p.length - i - 1)
        }
        return tmp
    })
}