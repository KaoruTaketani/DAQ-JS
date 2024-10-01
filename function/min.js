/**
 * @param {number[]} x
 * @returns {number}
 */
export default (
    x
) => {
    return x.filter(x => !Number.isNaN(x)).reduce((a, b) => Math.min(a, b), Infinity)
}