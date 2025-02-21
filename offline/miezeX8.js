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
    return h[offset + 0]
        + h[offset + 1] * Math.SQRT1_2
        - h[offset + 3] * Math.SQRT1_2
        - h[offset + 4]
        - h[offset + 5] * Math.SQRT1_2
        + h[offset + 7] * Math.SQRT1_2
}