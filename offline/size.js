/**
 * @param {number[][]} m
 * @returns {number[]}
 */
export default (
    m
) => {
    // Array size, returned as a row vector of nonnegative integers.
    //
    // Each element of sz represents the length of the corresponding dimension of A. If any element of sz is equal to 0, then A is an empty array.
    // If A is a scalar, then sz is the row vector [1 1].

    return [m.length, m[0].length]
}