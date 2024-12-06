import mldivide from './mldivide.js'
import mtimes from './mtimes.js'
import transpose from './transpose.js'
import zeros from './zeros.js'

export default (
    f,
    x
) => {
    const n = f[0](x).length,
        J = zeros(n, x.length),
        dy = zeros(n, 1),
        _FunctionTorelance = 1e-6,
        _MaxIterations = 400
    for (let i = 0; i < n; ++i) {
        dy[i][0] = f[0](x)[i]
        J[i] = f[1](x)[i]
    }
    // console.log(n)
    // console.log(dy)
    // console.log(J)
    console.log(`n: ${n}, x: ${x}, chi2: ${mtimes(transpose(dy), dy)[0][0]}`)
    let previousError = mtimes(transpose(dy), dy)[0][0]

    for (let iteration = 0; iteration < _MaxIterations; ++iteration) {
        let h = mldivide(mtimes(transpose(J), J), mtimes(transpose(J), dy))

        for (let i = 0; i < x.length; ++i) {
            x[i] += h[i][0]
        }
        for (let i = 0; i < n; ++i) {
            dy[i][0] = f[0](x)[i]
            J[i] = f[1](x)[i]
        }
        const error = mtimes(transpose(dy), dy)[0][0]
        console.log(`x: ${x}, chi2: ${error}, chi2prev: ${previousError}`)
        if (Number.isNaN(error)) {
            console.log(`chi2 is not a number`)
            break
        }
        if (previousError - error < _FunctionTorelance) {
            console.log(`break. iteration: ${iteration}`)
            break
        } else {
            previousError = error
        }
    }
    return x
}


