export default (
    n
) => {
    return new Array(n).fill().map((_, i) =>
        new Array(n).fill().map((_, j) => i === j ? 1 : 0)
    )
}