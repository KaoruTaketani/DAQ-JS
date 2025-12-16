/**
 * @param {number} x
 * @param {number[]} p
 */
export default (
    x,
    p
) => /** see @JacobianExp */[
    p[0] * Math.exp(p[1] * x),
    [
        Math.exp(p[1] * x),
        p[0] * x * Math.exp(p[1] * x)
    ]
]
