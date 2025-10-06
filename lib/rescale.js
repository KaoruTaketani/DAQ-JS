
/**
 * @param {number} a
 * @param {number[]} limits
 * @returns {number}
 */
export default (
    a,
    limits
) => {
    if (a < limits[0]) return 0
    if (a > limits[1]) return 1
    return (a - limits[0]) / (limits[1] - limits[0])
}
