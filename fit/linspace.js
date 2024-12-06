export default (
    x1,
    x2,
    n
) => {
    const n_ = n === undefined ? 100 : n,
        dx = (x2 - x1) / (n_ - 1)

    return new Array(n_).fill(0).map((_, i) => x1 + i * dx)
}