import size from './size.js'
import zeros from './zeros.js'

export default (
    a,
    B
) => {
    const [sz1, sz2] = size(B),
        C = zeros(sz1, sz2)

    for (let i = 0; i < B.length; ++i) {
        for (let j = 0; j < B[0].length; ++j) {
            C[i][j] = a * B[i][j]
        }
    }

    return C
}