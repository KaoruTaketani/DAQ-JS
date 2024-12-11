import { fail } from 'assert'
/**
 * @param {number[]} sz
 * @param {number} i1
 * @param {number} i2
 * @param {number|undefined} [i3]
 * @returns {number}
 */
export default (
    sz,
    i1,
    i2,
    i3
) => {
    if (i1 < 0) fail()
    if (i1 > sz[0]) fail()
    if (i2 < 0) fail()
    if (i2 > sz[1]) fail()
    if (!i3) {
        return (i1 - 1) + (i2 - 1) * sz[0] + 1
    } else {
        return (i1 - 1) + (i2 - 1) * sz[0] + (i3 - 1) * sz[0] * sz[1] + 1
    }
}