import mldivide from './mldivide.js'
import mtimes from './mtimes.js'
import transpose from './transpose.js'
import zeros from './zeros.js'

export default (
    f,
    p,
    xdata,
    ydata
) => {
    if (xdata.length !== ydata.length) {
        console.log(`xdata.length must be equal to ydata.length. xdata.length: ${xdata.length}, ydata.length: ${ydata.length}`)
        return
    }
    const n = xdata.length

    if (typeof f === 'string') {
        console.log(`'f: is ${f}`)
        switch (f) {
            case 'exp':
                f = [
                    (x, p) => p[0] * Math.exp(p[1] * x),
                    (x, p) => [
                        Math.exp(p[1] * x),
                        p[0] * x * Math.exp(p[1] * x)
                    ]
                ]
                break
            default:
                console.log(`'recieved unregistered function: ${f}`)
                return
        }
    }
    console.log(`call lsqnonlin`)

    const J = zeros(n, p.length),
        dy = zeros(n, 1),
        _FunctionTorelance = 1e-6,
        _MaxIterations = 400
    for (let i = 0; i < n; ++i) {
        dy[i][0] = ydata[i] - f[0](xdata[i], p)
        J[i] = f[1](xdata[i], p)
    }
    let previousError = mtimes(transpose(dy), dy)[0][0]
    console.log(`p: ${p}, chi2: ${mtimes(transpose(dy), dy)[0][0]}`)
    for (let iteration = 0; iteration < _MaxIterations; ++iteration) {

        let h = mldivide(mtimes(transpose(J), J), mtimes(transpose(J), dy))
        for (let i = 0; i < p.length; ++i) {
            p[i] += h[i][0]
        }
        for (let i = 0; i < n; ++i) {
            dy[i][0] = ydata[i] - f[0](xdata[i], p)
            J[i] = f[1](xdata[i], p)
        }
        const error = mtimes(transpose(dy), dy)[0][0]
        console.log(`p: ${p}, chi2: ${error}, chi2prev: ${previousError}`)
        if (previousError - error < _FunctionTorelance) {
            console.log(`break. iteration: ${iteration}`)
            break
        } else {
            previousError = error
        }
    }
    return p
}

