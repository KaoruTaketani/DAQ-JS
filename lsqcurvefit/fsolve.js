
export default (
    fname,
    x0
) => {
    /// @NewtonRaphsonMethod
    let f, jf
    if (fname === 'sin') {
        f = (x, y) => []
        jf = (x, y) => []
    }
    if (fname === 'mathews') {
        f = x => [x[0] ** 2 - 2 * x[0] + -x[1] + 0.5,
        x[0] ** 2 + 4 * x[1] ** 2 - 4]

        // jf = x => [2 * x[0] - 2, 2 * x[0], -1, 8 * x[1]]
        jf = x => [[2 * x[0] - 2, -1], [2 * x[0], 8 * x[1]]]
    }
    if (f === undefined) return
    if (jf === undefined) return

    const y = f(x0),
        j = jf(x0)
    return jf(x0)
    for (let i = 0; i < 10; ++i) {
        y = f(x0)
        j = jf(x0)
        // q = minus(x0, transpose(mldivide(j, transpose(y)))
        // z = f(q)
        // if(norm(minus(q,p)) < 1e-4) break
    }




}