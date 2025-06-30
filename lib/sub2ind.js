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
    if (!i3) {
        return (i1 - 1) * sz[1] + (i2 - 1)
    } else {
        return (i1 - 1) * sz[1] * sz[2] + (i2 - 1) * sz[2] + (i3 - 1)
    }
}