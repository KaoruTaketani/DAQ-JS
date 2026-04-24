import { ok } from 'assert'

/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} binEdges
 * @param {Uint32Array} binCounts
 * @returns {string}
 */
export default (
    axes,
    binEdges,
    binCounts
) => {
    ok(binEdges.length === binCounts.length + 1)

    const xMinInPixels = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        xMaxInPixels = xMinInPixels + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        yMinInPixels = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        yMaxInPixels = yMinInPixels - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815),
        xMin = axes.xLim[0],
        xMax = axes.xLim[1],
        yMin = axes.yLim[0],
        yMax = axes.yLim[1]
    let points = ''
    binCounts.forEach((_, i) => {
        if (binEdges[i] < xMin || binEdges[i + 1] > xMax) {
            return
        }
        if (axes.yScale === 'log') {
            const ry = binCounts[i] <= 0 ? 0 : (Math.log10(binCounts[i]) - Math.log10(yMin)) / (Math.log10(yMax) - Math.log10(yMin)),
                rx0 = (binEdges[i] - xMin) / (xMax - xMin),
                rx1 = (binEdges[i + 1] - xMin) / (xMax - xMin)

            points += [
                `${(xMinInPixels + (xMaxInPixels - xMinInPixels) * rx0).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * ry).toFixed()}`,
                `${(xMinInPixels + (xMaxInPixels - xMinInPixels) * rx1).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * ry).toFixed()}`
            ].join(' ') + ' '
        } else {
            const ry = (binCounts[i] - yMin) / (yMax - yMin),
                rx0 = (binEdges[i] - xMin) / (xMax - xMin),
                rx1 = (binEdges[i + 1] - xMin) / (xMax - xMin)

            points += [
                `${(xMinInPixels + (xMaxInPixels - xMinInPixels) * rx0).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * ry).toFixed()}`,
                `${(xMinInPixels + (xMaxInPixels - xMinInPixels) * rx1).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * ry).toFixed()}`
            ].join(' ') + ' '
        }
    })

    return `<polyline points="${points.trim()}" stroke="black" fill="none" clip-path="url(#axes)" />`
}
