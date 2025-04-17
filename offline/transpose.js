import size from './size.js'
import zeros from './zeros.js'

export default (
    A
) => {
    const [sz1, sz2] = size(A)
    const B = zeros(sz2, sz1)

    for (let i = 0; i < sz2; ++i) {
        for (let j = 0; j < sz1; ++j) {
            B[i][j] = A[j][i]
        }
    }

    return B
}