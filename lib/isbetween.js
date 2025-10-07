
/**
 * @param {number} a
 * @param {number[]} limits
 * @returns {boolean}
 */
export default (
    a,
    limits
) => {
    return a >= limits[0] && a < limits[1]
}