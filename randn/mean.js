export default (
    x
) => {
    // M = mean(A) returns the mean of the elements of A along the first array dimension whose size does not equal 1.
    // If A is a vector, then mean(A) returns the mean of the elements.
    // If A is a matrix, then mean(A) returns a row vector containing the mean of each column.
    const total = x.reduce((a, b) => a + b, 0)

    return total / x.length
}