/**
 * @param {number} x
 * @param {number[]} p
 * @returns {number}
 */
function func(x, p) {
    return p[0] * Math.exp(p[1] * x)
}

/**
 * @param {number} x
 * @param {number[]} p
 * @returns {number[]}
 */
function grad(x, p) {
    return [
        Math.exp(p[1] * x),
        p[0] * x * Math.exp(p[1] * x)
    ]
}

// https://jp.mathworks.com/help/curvefit/list-of-library-models-for-curve-and-surface-fitting.html
export default [func, grad]