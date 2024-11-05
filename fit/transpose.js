import sub2ind from './sub2ind.js'

export default (
    n
) => {
    const a = new Array(n * n).fill(0)

    for (let i = 0; i < n; ++i) {
        a[sub2ind([n, n], i + 1, i + 1) - 1] = 1
    }

    return a
}