import zeros from './zeros.js'
import transpose from './transpose.js'
import mldivide from './mldivide.js'
import mtimes from './mtimes.js'

export default (
    f,
    p0,
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
    console.log(`xdata[0]: ${xdata[0]}, ydata[0]: ${ydata[0]}, p0: ${p0}`)
    // console.log(f.length)
    // console.log(p0.length)
    // console.log(ydata[0] - f[0](xdata[0], p0))
    // console.log(f[1](xdata[0], p0))
    const J = zeros(n, p0.length),
        dy = zeros(n, 1)
    for (let i = 0; i < n; ++i) {
        dy[i][0] = ydata[i] - f[0](xdata[i], p0)
        J[i] = f[1](xdata[i], p0)
    }
    // console.log(dy)
    // console.log(J)
    const h = mldivide(mtimes(transpose(J), J), mtimes(transpose(J), dy))
    console.log(h)
}


