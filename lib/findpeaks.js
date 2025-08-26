/**
 * @param {number[]} x
 * @returns {number[][]}
 */
export default (
    x
) => {
    const locs = []
    for (let i = 1; i < x.length - 1; ++i) {
        if (x[i] > x[i - 1] && x[i] >= x[i + 1]) locs.push(i)
    }
    return [
        locs.map(loc => x[loc]),
        locs
    ]
}