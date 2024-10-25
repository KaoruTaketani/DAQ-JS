import sub2ind from './sub2ind.js'
import eye from './eye.js'

export default (
    f,
    x0
) => {
    const h = 1e-4,
        maxIter = 100,
        tolX = 1e-6,
        fx = f(x0),
        Nf = fx.length,
        Nx = x0.length,
        xx = new Array(maxIter * Nx).fill(0)

    for (let i = 0; i < Nx; ++i) {
        xx[sub2ind([maxIter, Nx], 1, i + 1) - 1] = x0[i]
    }

    for (let i = 0; i < maxIter; ++i) {

    }
    return eye(3)
}