/** 
 * @param {number[]} a
 * @returns {number}
 */
export default (
    a
) => {
    let s = 0
    for (let i = 0; i < a.length; ++i)s += a[i] ** 2

    return Math.sqrt(s)
}