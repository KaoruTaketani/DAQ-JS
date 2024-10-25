import sub2ind from './sub2ind.js'
import eye from './eye.js'

export default (
    f,
    x
) => {
    const h = 1e-4,
        h2 = 2 * h,
        N = x.length,
        I = eye(N)
    // x = x(:).' is x = transpose(x(:))

    // g(:,n) = (f(x + I(n,:)*h) - f(x - I(n,:)*h)' / h2
    // ' is ctranspose
    // .' is transpose
    for (let i = 0; i < N; ++i) {
        xx[sub2ind([maxIter, Nx], 1, i + 1) - 1] = x0[i]
    }

    for (let i = 0; i < maxIter; ++i) {

    }
    return xx
}