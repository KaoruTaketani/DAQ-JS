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
        + h[offset + 1]
        + h[offset + 2]
        + h[offset + 3]
        + h[offset + 4]
        + h[offset + 5]
        + h[offset + 6]
        + h[offset + 7]
}