import { ok } from 'assert'
/** 
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number[]}
 */
export default (
    a,
    b
) => {
    ok(a.length === b.length)

    const c = new Array(a.length)
    for (let i = 0; i < c.length; ++i)c[i] = a[i] - b[i]

    return c
}