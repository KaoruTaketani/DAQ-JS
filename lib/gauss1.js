/**
 * @param {number} x
 * @param {number[]} p
 * @returns {number}
 */
function func(x, p) {
    return p[0] * Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2)
}

/**
 * @param {number} x
 * @param {number[]} p
 * @returns {number[]}
 */
function grad(x, p) {
    return [
        Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2),
        (2 * p[0] * (x - p[1]) / p[2] ** 2) * Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2),
        (2 * p[0] * (x - p[1]) ** 2 / p[2] ** 3) * Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2)
    ]
}

// https://jp.mathworks.com/help/curvefit/list-of-library-models-for-curve-and-surface-fitting.html
export default [func, grad]
