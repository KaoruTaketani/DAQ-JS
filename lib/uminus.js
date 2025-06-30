import size from './size.js'
import zeros from './zeros.js'

export default (
    A
) => {
    const [sz1, sz2] = size(A),
        B = zeros(sz1, sz2)

    for (let i = 0; i < sz1; ++i) {
        for (let j = 0; j < sz2; ++j) {
            B[i][j] = -A[i][j]
        }
    }

    return B
}