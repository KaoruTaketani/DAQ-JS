import mldivide from './mldivide.js'
import mtimes from './mtimes.js'
import transpose from './transpose.js'
import zeros from './zeros.js'
import plus from './plus.js'
import times from './times.js'
import eye from './eye.js'

export default (
    f,
    x
) => {
    const n = f[0](x).length,
        J = zeros(n, x.length),
        dy = zeros(n, 1),
        _FunctionTorelance = 1e-6,
        _MaxIterations = 400,
        _InitDamping = 1e-2
    let damping = _InitDamping

    for (let i = 0; i < n; ++i) {
        dy[i][0] = f[0](x)[i]
        J[i] = f[1](x)[i]
    }
    // console.log(n)
    // console.log(dy)
    // console.log(J)
    console.log(`x: ${x}, chi2: ${mtimes(transpose(dy), dy)[0][0]}, n: ${n}`)
    let previousError = mtimes(transpose(dy), dy)[0][0]

    for (let iteration = 0; iteration < _MaxIterations; ++iteration) {
        let h = mldivide(
            plus(mtimes(transpose(J), J), times(damping, eye(x.length))),
            mtimes(transpose(J), dy)
        )

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
        if (previousError < error) {
            damping = damping * 11
            console.log(`restore damping: ${damping}`)
            // restore the original parameter
            for (let i = 0; i < x.length; ++i) {
                x[i] -= h[i][0]
            }
        } else {
            damping = damping / 9
            if (previousError - error < _FunctionTorelance) {
                console.log(`break. iteration: ${iteration}`)
                break
            }
        }
        previousError = error
    }
    return x
}


