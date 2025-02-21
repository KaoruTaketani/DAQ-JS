/**
 * @param {number[]} histogramValue
 * @param {number} offset
 * @returns {number}
 */
export default (
    histogramValue,
    offset
) => {
    const h = histogramValue
    return h[offset + 1] * Math.SQRT1_2
        + h[offset + 2]
        + h[offset + 3] * Math.SQRT1_2
        - h[offset + 5] * Math.SQRT1_2
        - h[offset + 6]
        - h[offset + 7] * Math.SQRT1_2
}