/**
 * @param {number} x
 * @param {number[]} p
 */
function func(x, p) {
    return p[0] * Math.exp(p[1] * x)
}

/**
 * @param {number} x
 * @param {number[]} p
 */
function grad(x, p) {
    return [
        Math.exp(p[1] * x),
        p[0] * x * Math.exp(p[1] * x)
    ]
}

export default [func, grad]