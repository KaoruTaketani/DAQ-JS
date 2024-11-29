import sisze from './size.js'

export default (
    sz1,
    sz2
) => {
    if (sz2 === undefined) {
        let m = new Array(sz1)
        for (let i = 0; i < sz1; ++i) {
            m[i] = new Array(sz1).fill(0)
        }
        return m
    } else {
        let m = new Array(sz1)
        for (let i = 0; i < sz1; ++i) {
            m[i] = new Array(sz2).fill(0)
        }
        return m
    }
}