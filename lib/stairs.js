/**
 * @param {import('./index.js').Axes} axes
 * @param {import('./index.js').Histogram} y
 * @returns {string}
 */
export default (
    axes,
    y
) => {
    const xMinInPixels = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        xMaxInPixels = xMinInPixels + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        yMinInPixels = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        yMaxInPixels = yMinInPixels - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815),
        xMin = axes.xLim[0],
        xMax = axes.xLim[1],
        yMin = axes.yLim[0],
        yMax = axes.yLim[1],
        binWidth = (y.binLimits[1] - y.binLimits[0]) / y.binCounts.length
    // binWidth = (xMaxInPixels - xMinInPixels) / y.binCounts.length

    // const peak = y.reduce((a, b) => Math.max(a, b), -Infinity)
    // if (peak === 0) return ''
    // const scaledY = axes.yScale === 'log'
    //     ? Array.from(y).map(v => v === 0 ? 0.1 : v) // Math.log10(0) is NaN
    //         .map(v => (Math.log10(v) - Math.log10(0.1)) / (Math.log10(peak) - Math.log10(0.1)))
    //     : Array.from(y).map(v => v / peak)

    const points = y.binCounts.map((_, i) => {
        if (axes.yScale === 'log') {
            const ry = y.binCounts[i] <= 0 ? 0 : (Math.log10(y.binCounts[i]) - Math.log10(yMin)) / (Math.log10(yMax) - Math.log10(yMin)),
                rx0 = i * binWidth / (xMax - xMin),
                rx1 = (i + 1) * binWidth / (xMax - xMin)

            return [
                `${(xMinInPixels + (xMaxInPixels - xMinInPixels) * rx0).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * ry).toFixed()}`,
                `${(xMinInPixels + (xMaxInPixels - xMinInPixels) * rx1).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * ry).toFixed()}`
            ].join(' ')
            // return [
            //     `${(xMinInPixels + i * binWidth).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * (Math.log10(y.binCounts[i]) - Math.log10(yMin)) / (Math.log10(yMax) - Math.log10(yMin))).toFixed()}`,
            //     `${(xMinInPixels + (i + 1) * binWidth).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * (Math.log10(y.binCounts[i]) - Math.log10(yMin)) / (Math.log10(yMax) - Math.log10(yMin))).toFixed()}`
            // ].join(' ')
        } else {
            const ry = (y.binCounts[i] - yMin) / (yMax - yMin),
                rx0 = i * binWidth / (xMax - xMin),
                rx1 = (i + 1) * binWidth / (xMax - xMin)

            return [
                `${(xMinInPixels + (xMaxInPixels - xMinInPixels) * rx0).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * ry).toFixed()}`,
                `${(xMinInPixels + (xMaxInPixels - xMinInPixels) * rx1).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * ry).toFixed()}`
            ].join(' ')
            // return [
            //     `${(xMinInPixels + i * binWidth).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * (y.binCounts[i] - yMin) / (yMax - yMin)).toFixed()}`,
            //     `${(xMinInPixels + (i + 1) * binWidth).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * (y.binCounts[i] - yMin) / (yMax - yMin)).toFixed()}`
            // ].join(' ')
        }
    })

    return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
}
