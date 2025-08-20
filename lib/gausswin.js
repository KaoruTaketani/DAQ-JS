/**
 * @param {number} L
 * @param {number} [alpha]
 * @returns {number[]}
 */
export default (
    L,
    alpha
) => {
    if (!alpha) alpha = 2.5

    return new Array(L).fill(0).map((_, i) => {
        const n = i - (L - 1) / 2
        return Math.exp(-1 / 2 * (alpha * n / (L - 1) / 2) ** 2)
    })
}