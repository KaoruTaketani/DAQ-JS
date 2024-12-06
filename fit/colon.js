export default (
    j,
    i,
    k
) => {
    const m = Math.trunc((k - j) / i)

    return new Array(m + 1).fill(0).map((_, index) => j + i * index)
}