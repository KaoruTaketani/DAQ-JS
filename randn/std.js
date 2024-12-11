export default (
    x
) => {
    // S = std(A) returns the standard deviation of the elements of A along the first array dimension whose size does not equal 1. By default, the standard deviation is normalized by N-1, where N is the number of observations.
    // If A is a vector of observations, then S is a scalar.
    // If A is a matrix whose columns are random variables and whose rows are observations, then S is a row vector containing the standard deviation corresponding to each column.
    const total = x.reduce((a, b) => a + b, 0)
    const squared = x.reduce((a, b) => a + Math.pow(b - total / x.length, 2), 0)
    return Math.sqrt(squared / (x.length - 1))
}