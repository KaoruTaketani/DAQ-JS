import { ok } from 'assert'
/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} x
 * @param {number[]} y
 * @param {number[]} err
 * @returns {string}
 */
export default (
    axes,
    x,
    y,
    err
) => {
    ok(x.length === y.length)

    const viewBox = axes.viewBox ?? [0, 0, 560, 420]
    const position = axes.position ?? [0.1300, 0.1100, 0.7750, 0.8150]

    const xMinInPixels = viewBox[2] * position[0],
        xMaxInPixels = xMinInPixels + viewBox[2] * position[2],
        yMinInPixels = viewBox[3] * (1 - position[1]),
        yMaxInPixels = yMinInPixels - viewBox[3] * position[3]

    return new Array(y.length).fill(0)
        .map((_y, i) => {
            // const x = x0 + i * (x1 - x0) / y.length
            const x_ = xMinInPixels + (xMaxInPixels - xMinInPixels) * (x[i] - axes.xLim[0]) / (axes.xLim[1] - axes.xLim[0])
            const yd = yMinInPixels + (yMaxInPixels - yMinInPixels) * ((y[i] - err[i]) - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])
            const yu = yMinInPixels + (yMaxInPixels - yMinInPixels) * ((y[i] + err[i]) - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])
            return `<line x1="${x_}" y1="${yd}" x2="${x_}" y2="${yu}" stroke="black"/>`
        }).join('')
}