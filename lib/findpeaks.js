/**
 * @param {number[]} y
 * @returns {number[][]}
 */
export default (
    y
) => {
    const locs = []
    for (let i = 1; i < y.length - 1; ++i) {
        if (y[i] > y[i - 1] && y[i] >= y[i + 1]) locs.push(i)
    }
    return [
        locs.map(loc => y[loc]),
        locs
    ]
}