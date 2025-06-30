/**
 * @param {number} j
 * @param {number} i
 * @param {number} [k]
 * @returns {number[]}
 */
export default (
    j,
    i,
    k
) => {
    if (k === undefined) {
        const _k = i,
            m = _k - j
        return new Array(m + 1).fill(0).map((_, index) => j + index)
    } else {
        const m = Math.trunc((k - j) / i)

        return new Array(m + 1).fill(0).map((_, index) => j + i * index)
    }
}