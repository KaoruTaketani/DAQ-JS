import sub2ind from './sub2ind.js'

/** 
 * @param {number[]} n
 * @returns {import('./index').NDArray}
 */
export default (
    n
) => {
    const data = new Float64Array(n.length * n.length),
        shape = [n.length, n.length]

    for (let j = 1; j <= n.length; ++j) {
        for (let i = 1; i <= n.length; ++i) {
            const x = n[i - 1]
            const y = n[j - 1]
            const a = + 3 * (1 - x) ** 2 * Math.exp(-(x ** 2 + (y + 1) ** 2))
            const b = -10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-(x ** 2 + y ** 2))
            const c = -1 / 3 * Math.exp(-((x + 1) ** 2 + y ** 2))

            data[sub2ind(shape, j, i)] = a + b + c
        }
    }

    return {
        shape: shape,
        data: data
    }
}