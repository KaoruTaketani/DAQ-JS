/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} x
 * @param {number[]} y
 */
export default (
    axes,
    x,
    y
) => {
    const x0 = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        x1 = x0 + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        y0 = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815)

    /** @type {string[]} */
    const points = []
    y.forEach((_, i) => {
        const xInPixels = x0 + (x1 - x0)
            * (x[i] - axes.xLim[0]) / (axes.xLim[1] - axes.xLim[0])
        const yInPixels = y0 + (y1 - y0)
            * ((Number.isFinite(y[i]) ? y[i] : 0) - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])
        // return `${xInPixels},${yInPixels}`
        points.push(`${xInPixels},${yInPixels}`)
    })
    return [
        `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
    ].join('')
}