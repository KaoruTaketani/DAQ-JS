import mldivide from './mldivide.js'
import mtimes from './mtimes.js'
import transpose from './transpose.js'
import zeros from './zeros.js'
import plus from './plus.js'
import times from './times.js'
import diag from './diag.js'
import eye from './eye.js'
import max from './max.js'

export default (
    f,
    x
) => {
    const n = f[0](x).length,
        J = zeros(n, x.length),
        r = zeros(n, 1),
        _FunctionTorelance = 1e-3,// should be 1e-6?
        _MaxIterations = 50,// should be 400
        _InitDamping = 1e-2

    for (let i = 0; i < n; ++i) {
        r[i][0] = f[0](x)[i]
        J[i] = f[1](x)[i]
    }
    // console.log(n)
    // console.log(dy)
    // console.log(J)
    console.log(`x: ${x}, chi2: ${mtimes(transpose(r), r)[0][0]}, n: ${n}`)
    let damping = _InitDamping,
        _chi2 = mtimes(transpose(r), r)[0][0],
        chi2 = _chi2
    // console.log(max(diag(mtimes(transpose(J), J))))
    // damping *= max(diag(mtimes(transpose(J), J)))
    for (let iteration = 0; iteration < _MaxIterations; ++iteration) {
        const A = mtimes(transpose(J), J),
            b = mtimes(transpose(J), r),
            h = mldivide(
                plus(A, times(damping, diag(diag(A)))),
                // plus(A, times(damping, eye(n))),
                b
            ),
            _x = new Array(x.length).fill().map((_, i) => x[i] - h[i][0]),
            _J = zeros(n, x.length),
            _r = zeros(n, 1)

        for (let i = 0; i < n; ++i) {
            _r[i][0] = f[0](_x)[i]
            _J[i] = f[1](_x)[i]
        }
        _chi2 = mtimes(transpose(_r), _r)[0][0]

        // console.log(`h: ${h[0][0]}, J'*dy: ${mtimes(transpose(J), dy)}`)
        const rho = (chi2 - _chi2)
            / Math.abs(mtimes(
                transpose(h),
                plus(
                    mtimes(times(damping, diag(diag(A))), h),
                    // times(damping, h),
                    b
                )
            )[0][0])
        // js mul modifiies perturbation used in the js lib?
        // for (let i = 0; i < x.length; ++i) {
        //     h[i][0] *= damping
        //     h[i][0] += mtimes(transpose(J), dy)[i][0]
        // }

        // console.log(`pos1: ${mtimes(transpose(h), h)}, pos2: ${mtimes(transpose(h), mtimes(transpose(J), dy))}`)
        // console.log(`rho: ${rho}, damping: ${damping}`)
        console.log(`opt2: ${chi2.toFixed(4)}, chi2: ${_chi2.toFixed(4)}, rho: ${rho.toFixed(4)}, h: ${h[0][0].toFixed(4)},  parameter: ${x[0].toFixed(4)}`)
        if (rho > 0.01) { // _chi2 is better than chi2
            if (max(mtimes(transpose(_J), _r).map(x => Math.abs(x))) < _FunctionTorelance) { // first order is max of Jacobian?
                console.log(`break max(abs(J'*r)): ${max(mtimes(transpose(_J), _r).map(x => Math.abs(x)))}`)
                break
            }
            chi2 = _chi2
            for (let i = 0; i < x.length; ++i) {
                x[i] -= h[i][0]
            }
            for (let i = 0; i < n; ++i) {
                r[i][0] = f[0](x)[i]
                J[i] = f[1](x)[i]
            }
            damping = damping / 9
        } else {
            damping = damping * 11
        }
    }
    return x
}


