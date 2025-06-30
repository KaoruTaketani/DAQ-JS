import mldivide from './mldivide.js'
import mtimes from './mtimes.js'
import transpose from './transpose.js'
import zeros from './zeros.js'
import plus from './plus.js'
import times from './times.js'
import diag from '../lib/diag.js'
import abs from './abs.js'
import max from './max.js'
import uminus from './uminus.js'

/**
 * @param {function[]} f
 * @param {number[]} x
 */
export default (
    f,
    x
) => {
    const n = f[0](x).length,
        J = zeros(n, x.length),
        r = zeros(n, 1),
        _FunctionTorelance = 1e-3,// matlab's default is 1e-6
        _MaxIterations = 50,// matlab' default is 400
        _InitDamping = 1e-2// matlab's default is 1e-2

    for (let i = 0; i < n; ++i) {
        r[i][0] = f[0](x)[i]
        J[i] = f[1](x)[i]
    }

    console.log(`x: ${x}, chi2: ${mtimes(transpose(r), r)[0][0]}, n: ${n}`)
    let lambda = _InitDamping,
        _chi2 = mtimes(transpose(r), r)[0][0],
        chi2 = _chi2

    for (let iteration = 0; iteration < _MaxIterations; ++iteration) {
        const A = mtimes(transpose(J), J),
            b = mtimes(transpose(J), r),
            h = mldivide(
                plus(A, times(lambda, diag(diag(A)))),
                uminus(b)
            ),
            _x = new Array(x.length).fill().map((_, i) => x[i] + h[i][0]),
            _J = zeros(n, x.length),
            _r = zeros(n, 1)

        if (max(abs(transpose(b)[0])) < _FunctionTorelance) { // first order is max of Jacobian?
            console.log(`break max(abs(J'*r)): ${max(abs(transpose(b)[0]))}`)
            break
        }

        for (let i = 0; i < n; ++i) {
            _r[i][0] = f[0](_x)[i]
            _J[i] = f[1](_x)[i]
        }
        _chi2 = mtimes(transpose(_r), _r)[0][0]

        const rho = (chi2 - _chi2)
            / Math.abs(mtimes(
                transpose(h),
                plus(
                    mtimes(times(lambda, diag(diag(A))), h),
                    b
                )
            )[0][0])

        console.log(`chi2: ${chi2.toFixed(4)}, _chi2: ${_chi2.toFixed(4)}, b: [${transpose(b)[0].map(b => b.toFixed(4))}], l: ${lambda.toFixed(4)}, rho: ${rho.toFixed(4)}, h: [${transpose(h)[0].map(x => x.toFixed(4))}], x: [${x.map(x => x.toFixed(4))}]`)

        if (rho > 0.01) { // _chi2 is better than chi2
            chi2 = _chi2
            for (let i = 0; i < x.length; ++i) {
                x[i] = _x[i]
            }
            for (let i = 0; i < n; ++i) {
                r[i][0] = _r[i][0]
                for (let j = 0; j < x.length; ++j) {
                    J[i][j] = _J[i][j]
                }
            }
            lambda = lambda / 9
        } else {
            lambda = lambda * 11
        }
    }
    return x
}


