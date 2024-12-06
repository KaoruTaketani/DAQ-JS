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
    console.log(`xdata[0]: ${xdata[0]}, ydata[0]: ${ydata[0]}, p: ${p}`)
    // console.log(f.length)
    // console.log(p0.length)
    // console.log(ydata[0] - f[0](xdata[0], p0))
    // console.log(f[1](xdata[0], p0))
    const J = zeros(n, p.length),
        dy = zeros(n, 1)

    for (let i = 0; i < n; ++i) {
        dy[i][0] = ydata[i] - f[0](xdata[i], p)
        J[i] = f[1](xdata[i], p)
    }
    // console.log(mtimes(transpose(dy),dy))
    // console.log(J)
    let h = mldivide(mtimes(transpose(J), J), mtimes(transpose(J), dy))
    // let p = zeros(p0.length, 1)
    // for (let i = 0; i < p0.length; ++i) {
    //     p[i][0] = p0[i]
    // }
    console.log(`${p}, chi2: ${mtimes(transpose(dy),dy)[0][0]}`)
    // console.log(h)
    for (let i = 0; i < p.length; ++i) {
        p[i] += h[i][0]
    }
    console.log(`${p}, chi2: ${mtimes(transpose(dy),dy)[0][0]}`)

    /// 1
    for (let i = 0; i < n; ++i) {
        dy[i][0] = ydata[i] - f[0](xdata[i], p)
        J[i] = f[1](xdata[i], p)
    }
    h = mldivide(mtimes(transpose(J), J), mtimes(transpose(J), dy))
    for (let i = 0; i < p.length; ++i) {
        p[i] += h[i][0]
    }
    console.log(`${p}, chi2: ${mtimes(transpose(dy),dy)[0][0]}`)

    /// 2
    for (let i = 0; i < n; ++i) {
        dy[i][0] = ydata[i] - f[0](xdata[i], p)
        J[i] = f[1](xdata[i], p)
    }
    h = mldivide(mtimes(transpose(J), J), mtimes(transpose(J), dy))
    for (let i = 0; i < p.length; ++i) {
        p[i] += h[i][0]
    }
    console.log(`${p}, chi2: ${mtimes(transpose(dy),dy)[0][0]}`)

    /// 3
    for (let i = 0; i < n; ++i) {
        dy[i][0] = ydata[i] - f[0](xdata[i], p)
        J[i] = f[1](xdata[i], p)
    }
    h = mldivide(mtimes(transpose(J), J), mtimes(transpose(J), dy))
    for (let i = 0; i < p.length; ++i) {
        p[i] += h[i][0]
    }
    console.log(`${p}, chi2: ${mtimes(transpose(dy),dy)[0][0]}`)
    // p = plus(p, h)
    // console.log(p)
    // console.log(transpose(p))
    // for (let i = 0; i < n; ++i) {
    //     dy[i][0] = ydata[i] - f[0](xdata[i], transpose(p)[0])
    //     J[i] = f[1](xdata[i], transpose(p)[0])
    // }
    // h = mldivide(mtimes(transpose(J), J), mtimes(transpose(J), dy))
    // console.log(h)
    // p = plus(p, h)
    // console.log(p)
    return p
}


