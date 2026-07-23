/**
 * @param {number[]} x
 * @param {number[]} y
 * @returns {number}
 */
export default (
    x,
    y
) => {
    let sum = 0
    for (let i = 0; i < x.length - 1; ++i) {
        sum += (x[i + 1] - x[i]) * (y[i + 1] + y[i])
    }
    return sum / 2
}