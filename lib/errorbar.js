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

    const xMinInPixels = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        xMaxInPixels = xMinInPixels + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        yMinInPixels = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        yMaxInPixels = yMinInPixels - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815)

    return new Array(y.length).fill(0)
        .map((_y, i) => {
            // const x = x0 + i * (x1 - x0) / y.length
            const x_ = xMinInPixels + (xMaxInPixels - xMinInPixels) * (x[i] - axes.xLim[0]) / (axes.xLim[1] - axes.xLim[0])
            const yd = yMinInPixels + (yMaxInPixels - yMinInPixels) * ((y[i] - err[i]) - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])
            const yu = yMinInPixels + (yMaxInPixels - yMinInPixels) * ((y[i] + err[i]) - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])
            return `<line x1="${x_}" y1="${yd}" x2="${x_}" y2="${yu}" stroke="black"/>`
        }).join('')
}