import {ok} from 'assert'
/**
 * @param {string} fname
 * @param {number} x0
 */
export default (
    fname,
    x0
) => {
    let f, df, x1
    if (fname === 'sin') {
        f = (/** @type {number} */x) => Math.sin(x)
        df = (/** @type {number} */x) => Math.cos(x)
    }
    if (fname === 'cos') {
        f = (/** @type {number} */x) => Math.cos(x)
        df = (/** @type {number} */x) => -Math.sin(x)
    }
    ok(f)
    ok(df)
    /// @NewtonRaphsonMethod
    for (let i = 0; i < 10; ++i) {
        x1 = x0 - f(x0) / df(x0)
        if (Math.abs(x1 - x0) < 1e-4) break
        x0 = x1
    }
    return x0
}