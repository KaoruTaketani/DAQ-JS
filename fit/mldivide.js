import size from './size.js'
import lu from './lu.js'
import mtimes from './mtimes.js'
import zeros from './zeros.js'

export default (
    A,
    B
) => {
    const [sz1, sz2] = size(A)
    if (sz1 !== sz2) return

    const n = sz1
    if (size(B)[0] !== n) return

    const [L, U, P] = lu(A),
        Z = mtimes(P, B),
        Y = zeros(n, 1)
    // solve A.X=B, 
    //    or P.A.X = P.B
    //    or L.U.X = P.B
    //
    // by defining
    //       Z: P.B
    //       Y: U.X
    //
    // solve L.Y = Z then U.X = Y
    //    

    for (let i = 0; i < n; ++i) {
        let t = 0
        for (let j = 0; j < i; ++j)
            t += L[i][j] * Y[j][0]

        Y[i][0] = Z[i][0] - t
    }

    const X = zeros(n, 1)
    for (let i = n - 1; 0 <= i; --i) {
        let t = 0
        for (let j = n - 1; i < j; --j)
            t += U[i][j] * X[j][0]

        X[i][0] = (Y[i][0] - t) / U[i][i]
    }

    return X
}