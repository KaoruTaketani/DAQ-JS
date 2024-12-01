import size from './size.js'
import lu from './lu.js'
import mtimes from './mtimes.js'

export default (
    A,
    B
) => {
    const [sz1, sz2] = size(A)
    if (sz1 !== sz2) return

    const n = sz1
    if (size(B)[0] !== n) return

    const
        [L, U, P] = lu(A),
        Y = mtimes(P, B)


    for (let i = 0; i < n; ++i) {
        Y[i][0]-Y[]
    }

    return X
}