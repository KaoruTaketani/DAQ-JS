
export default (
    fname,
    x0
) => {
    let f, df, x1
    if (fname === 'sin') {
        f = x => Math.sin(x)
        df = x => Math.cos(x)
    }
    if (fname === 'cos') {
        f = x => Math.cos(x)
        df = x => -Math.sin(x)
    }
    if (f === undefined) return
    /// @NewtonRaphsonMethod
    for (let i = 0; i < 10; ++i) {
        x1 = x0 - f(x0) / df(x0)
        if (Math.abs(x1 - x0) < 1e-4) break
        x0 = x1
    }
    return x0
}