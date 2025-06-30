import eye from './eye.js'
import size from './size.js'

export default (
    v
) => {
    if (v[0].length) {
        // if v is matrix, extract diagonal elements
        const [sz1, sz2] = size(v)
        if (sz1 !== sz2) return
        const n = sz1
        return new Array(n).fill().map((_, i) => v[i][i])
    } else {
        const D = eye(v.length)

        for (let i = 0; i < v.length; ++i) {
            D[i][i] = v[i]
        }
        return D
    }
}