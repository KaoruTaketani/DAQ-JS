import mldivide from './mldivide.js'
import mtimes from './mtimes.js'
import transpose from './transpose.js'
import zeros from './zeros.js'
import { ok } from 'assert'

/**
 * @param {function} f
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

    const J = zeros(n, p.length),
        dy = zeros(n, 1),
        _FunctionTorelance = 1e-6,
        _MaxIterations = 400
    for (let i = 0; i < n; ++i) {
        dy[i][0] = ydata[i] - f(xdata[i], p)[0]
        J[i] = f(xdata[i], p)[1]
    }
    let previousError = mtimes(transpose(dy), dy)[0][0]
    // console.log(`p: ${p}, chi2: ${mtimes(transpose(dy), dy)[0][0]}`)
    for (let iteration = 0; iteration < _MaxIterations; ++iteration) {

        let h = mldivide(mtimes(transpose(J), J), mtimes(transpose(J), dy))
        for (let i = 0; i < p.length; ++i) {
            p[i] += h[i][0]
        }
        for (let i = 0; i < n; ++i) {
            dy[i][0] = ydata[i] - f(xdata[i], p)[0]
            J[i] = f(xdata[i], p)[1]
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


