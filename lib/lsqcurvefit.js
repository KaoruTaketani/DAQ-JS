import mldivide from './mldivide.js'
import mtimes from './mtimes.js'
import transpose from './transpose.js'
import zeros from './zeros.js'
import { fail, ok } from 'assert'

/**
 * @param {function[]|string} f
 * @param {number[]} p
 * @param {number[]} xdata
 * @param {number[]} ydata
 * @returns {number[]}
 */
export default (
    f,
    p,
    xdata,
    ydata
) => {
    ok(xdata.length === ydata.length)
    const n = xdata.length

    if (typeof f === 'string') {
        // console.log(`'f: is ${f}`)
        switch (f) {
            case 'gauss':
                /** see @JacobianGauss */
                f = [
                    (/** @type {number} */x,/** @type {number[]} */ p) => p[0] * Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2),
                    (/** @type {number} */x, /** @type {number[]} */p) => [
                        Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2),
                        (2 * p[0] * (x - p[1]) / p[2] ** 2) * Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2),
                        (2 * p[0] * (x - p[1]) ** 2 / p[2] ** 3) * Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2)
                    ]
                ]
                break
            default:
                console.log(`'recieved unregistered function: ${f}`)
                fail()
        }
    }
    // console.log(`call lsqnonlin`)

    const J = zeros(n, p.length),
        dy = zeros(n, 1),
        _FunctionTorelance = 1e-6,
        _MaxIterations = 400
    for (let i = 0; i < n; ++i) {
        dy[i][0] = ydata[i] - f[0](xdata[i], p)
        J[i] = f[1](xdata[i], p)
    }
    let previousError = mtimes(transpose(dy), dy)[0][0]
    // console.log(`p: ${p}, chi2: ${mtimes(transpose(dy), dy)[0][0]}`)
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
        // console.log(`p: ${p}, chi2: ${error}, chi2prev: ${previousError}`)
        if (previousError - error < _FunctionTorelance) {
            // console.log(`break. iteration: ${iteration}`)
            break
        } else {
            previousError = error
        }
    }
    return p
}


