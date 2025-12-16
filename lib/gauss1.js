/**
 * @param {number} x
 * @param {number[]} p
 */
export default (
    x,
    p
) => /** see @JacobianGauss */[
    p[0] * Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2),
    [
        Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2),
        (2 * p[0] * (x - p[1]) / p[2] ** 2) * Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2),
        (2 * p[0] * (x - p[1]) ** 2 / p[2] ** 3) * Math.exp(-1 * (x - p[1]) ** 2 / p[2] ** 2)
    ]
]
