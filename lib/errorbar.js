/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} y
 * @param {number[]} err
 * @returns {string}
 */
export default (
    axes,
    y,
    err
) => {
    const x0 = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        x1 = x0 + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        y0 = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815)

    return new Array(y.length).fill(0)
        .map((_y, i) => {
            const x = x0 + i * (x1 - x0) / y.length
            const yd = y0 + (y1 - y0) * ((y[i] - err[i]) - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])
            const yu = y0 + (y1 - y0) * ((y[i] + err[i]) - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])
            return `<line x1="${x}" y1="${yd}" x2="${x}" y2="${yu}" stroke="black"/>`
        }).join('')
}