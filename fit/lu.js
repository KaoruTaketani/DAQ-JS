import zeros from './zeros.js'
import size from './size.js'
import eye from './eye.js'
import mtimes from './mtimes.js'
import transpose from './transpose.js'

export default (
    A
) => {
    const [sz1, sz2] = size(A)

    if (sz1 !== sz2) return

    const n = sz1,
        L = eye(n),
        U = zeros(n),
        P = eye(n),
        PA = mtimes(P, A)
    // lu = zeros(n)
    // const LUcolj = new Float64Array(n),
    //     pivotVector = new Float64Array(n)
    // let pivotSign = 1
    // for (let i = 0; i < n; i++) {
    //     pivotVector[i] = i
    // }

    // for (let i = 0; i < n; ++i) {
    //     for (let j = 0; j < n; ++j) {
    //         lu[i][j] = A[i][j]
    //     }
    // }
    //
    // see @LUDecomposition
    //
    // for (let i = 0; i < n; ++i) {
    //     for (let j = 0; j < n; ++j) {
    //         if (i === 0) {
    //             if (j === 0) {
    //                 l[i][j] = 1
    //             }
    //             u[i][j] = m[i][j]
    //         } else {
    //             if (j == 0) {
    //                 l[i][j] = m[i][j] / u[0][0]
    //             } else {
    //                 if (i === j) {
    //                     l[i][j] = 1
    //                     let tmp = 0
    //                     for (let k = 0; k < i - 1; ++k)
    //                         tmp += l[i][k] * u[k][i]
    //                     u[i][j] = m[i][j] - tmp
    //                 } else {
    //                     if (i > j) {
    //                         let tmp = 0
    //                         for (let k = 0; k < j - 1; ++k)
    //                             tmp += l[i][k] * u[k][i]
    //                         l[i][j] = (m[i][j] - tmp) / u[j][j]
    //                     } else {
    //                         let tmp = 0
    //                         for (let k = 0; k < i - 1; ++k)
    //                             tmp += l[i][k] * u[k][i]
    //                         u[i][j] = m[i][j] - tmp
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    for (let i = 0; i < n; ++i) {
        // permutation start
        // permutate row i if PA[i,i] is small
        let p = i,
            v = Math.abs(PA[i][i])
        for (let k = i + 1; k < n; ++k) {
            if (Math.abs(PA[k][i]) > v) {
                v = Math.abs(PA[k][i])
                p = k
            }
        }
        if (p !== i) {
            for (let k = 0; k < n; ++k) {
                const t = PA[i][k]
                PA[i][k] = PA[p][k]
                PA[p][k] = t
            }
            const t = P[p]
            P[p] = P[i]
            P[i] = t
        }
        // permutation end

        for (let j = 0; j < i; ++j) {
            let s = 0
            for (let k = 0; k < i; ++k)s += L[i][k] * U[k][j]
            L[i][j] = (PA[i][j] - s) / U[j][j]
        }

        for (let j = i; j < n; ++j) {
            let s = 0
            for (let k = 0; k < i; ++k)s += L[i][k] * U[k][j]
            U[i][j] = PA[i][j] - s
        }
    }


    // for (let j = 0; j < n; j++) {
    //     for (let i = 0; i < n; i++) {
    //         LUcolj[i] = lu[i][j]
    //     }

    //     for (let i = 0; i < n; i++) {
    //         const kmax = Math.min(i, j)
    //         let s = 0
    //         for (let k = 0; k < kmax; k++) {
    //             s += lu[i][k] * LUcolj[k]
    //         }
    //         LUcolj[i] -= s
    //         lu[i][j] = LUcolj[i]
    //     }

    //     let p = j
    //     for (let i = j + 1; i < n; i++) {
    //         if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
    //             p = i
    //         }
    //     }

    //     if (p !== j) {
    //         for (let k = 0; k < n; k++) {
    //             const t = lu[p][k]
    //             lu[p][k] = lu[j][k]
    //             lu[j][k] = t
    //         }

    //         const v = pivotVector[p]
    //         pivotVector[p] = pivotVector[j]
    //         pivotVector[j] = v

    //         // pivotSign = -pivotSign;
    //     }

    //     if (j < n && A[j][j] !== 0) {
    //         for (let i = j + 1; i < n; i++) {
    //             lu[i][j] = lu[i][j] / lu[j][j]
    //         }
    //     }
    // }
    // console.log(pivotVector)
    // console.log('A and PA are different matrices')
    // console.log(A)
    // console.log(PA)
    // console.log(P)
    // console.log(L)
    // console.log(U)
    // console.log(mtimes(transpose(P), mtimes(L, U)))
    // // this.LU = lu;
    // this.pivotVector = pivotVector;
    // this.pivotSign = pivotSign;

    return [L, U, P]
}