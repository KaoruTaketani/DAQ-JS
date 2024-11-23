export default (
    x1,
    x2,
    n
) => {
    const dx = n === undefined ? (x2 - x1) / 99 : (x2 - x1) / (n - 1)

    return new Array(n).fill(0).map((_, i) => x1 + i * dx)
}