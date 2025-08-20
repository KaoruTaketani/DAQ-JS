import { ok } from 'assert'
/**
 * @param {string} fname
 * @param {number[]} x0
 * @returns {number[][]}
 */
export default (
    fname,
    x0
) => {
    /// @NewtonRaphsonMethod
    let f, jf
    // if (fname === 'sin') {
    //     f = (x, y) => []
    //     jf = (x, y) => []
    // }
    if (fname === 'mathews') {
        f = (/** @type {number[]} */x) => [
            x[0] ** 2 - 2 * x[0] + -x[1] + 0.5,
            x[0] ** 2 + 4 * x[1] ** 2 - 4
        ]

        // jf = x => [2 * x[0] - 2, 2 * x[0], -1, 8 * x[1]]
        jf = (/** @type {number[]} */x) => [
            [2 * x[0] - 2, -1],
            [2 * x[0], 8 * x[1]]
        ]
    }
    ok(f)
    ok(jf)

    // const y = f(x0),
    //     j = jf(x0)
    return jf(x0)
}