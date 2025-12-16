export default [
    /** see @JacobianExp */
    (/** @type {number} */x, /** @type {number[]} */p) => p[0] * Math.exp(p[1] * x),
    (/** @type {number} */x, /** @type {number[]} */p) => [
        Math.exp(p[1] * x),
        p[0] * x * Math.exp(p[1] * x)
    ]
]
