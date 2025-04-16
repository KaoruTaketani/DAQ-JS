/**
 * @param {number[]} histogramValue
 * @param {number[]} frequencyVector
 * @param {number} offset
 * @returns {number}
 */
export default (
    histogramValue,
    frequencyVector,
    offset
) => {
    // const h = histogramValue
    // return h[offset + 0]
    //     + h[offset + 1]
    //     + h[offset + 2]
    //     + h[offset + 3]
    //     + h[offset + 4]
    //     + h[offset + 5]
    //     + h[offset + 6]
    //     + h[offset + 7]
    return frequencyVector
        .map((_, i) => histogramValue[offset * frequencyVector.length + i])
        .reduce((a, b) => a + b, 0)
}