/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} binEdges
 * @param {Uint32Array|number[]} binCounts
 * @returns {string}
 */
export default (
    axes,
    binEdges,
    binCounts
) => {
    // ok(binEdges.length === binCounts.length + 1)
    const viewBox = axes.viewBox ?? [0, 0, 560, 420]
    const position = axes.position ?? [0.1300, 0.1100, 0.7750, 0.8150]

    const xMinInPixels = viewBox[2] * position[0],
        xMaxInPixels = xMinInPixels + viewBox[2] * position[2],
        yMinInPixels = viewBox[3] * (1 - position[1]),
        yMaxInPixels = yMinInPixels - viewBox[3] * position[3],
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

    if (axes.yScale === 'log' && yMin <= 0) {
        const xInPixcels = 0.5 * (xMinInPixels + xMaxInPixels)
        const yInPixels = 0.5 * (yMinInPixels + yMaxInPixels)
        return `<text x="${xInPixcels.toFixed()}" y="${yInPixels.toFixed()}" text-anchor="middle" font-size="30" fill="red">y min must be positive</text>`
    } else {
        return `<polyline points="${points.trim()}" stroke="black" fill="none" clip-path="url(#axes)" />`
    }
}
