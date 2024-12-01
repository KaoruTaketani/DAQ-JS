import size from './size.js'
import zeros from './zeros.js'

export default (
    A,
    B
) => {
    if (size(A)[0] !== size(B)[0]) {
        console.log(`size(A) must be equal to size(B). size(A): ${size(A)}, size(B): ${size(B)}`)
        return
    }
    if (size(A)[1] !== size(B)[1]) {
        console.log(`size(A) must be equal to size(B). size(A): ${size(A)}, size(B): ${size(B)}`)
        return
    }

    const [sz1, sz2] = size(A),
        C = zeros(sz1, sz2)
    for (let i = 0; i < sz1; ++i) {
        for (let j = 0; j < sz2; ++j) {
            C[i][j] = A[i][j] + B[i][j]
        }
    }

    return C
}