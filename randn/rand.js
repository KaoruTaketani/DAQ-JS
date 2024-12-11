export default (
    sz1,
    sz2
) => {
    const r = new Array(sz1).fill().map(_ => new Array(sz2 ?? sz1).fill())

    for (let i = 0; i < sz1; ++i) {
        for (let j = 0; j < (sz2 ?? sz1); ++j) {
            r[i][j] = Math.random()
        }
    }

    return r
}