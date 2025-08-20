/**
 * @param {import('./index.js').Axes} axes
 */
export default (
    axes
) => {
    const xMinInPixels = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        xMaxInPixels = xMinInPixels + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        xLabelInPixels = xMinInPixels - (axes.xTickLabelGapOffset ?? 5),
        yMinInPixels = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        yMaxInPixels = yMinInPixels - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815),
        yLabelInPixels = yMinInPixels + (axes.yTickLabelGapOffset ?? 15),
        xMin = axes.xLim[0],
        xMax = axes.xLim[1],
        yMin = axes.yLim[0],
        yMax = axes.yLim[1]
    return [
        `<polyline`,
        ` points="${xMinInPixels},${yMinInPixels} ${xMaxInPixels},${yMinInPixels} ${xMaxInPixels},${yMaxInPixels} ${xMinInPixels},${yMaxInPixels} ${xMinInPixels},${yMinInPixels}"`,
        ` stroke="black"`,
        ` fill="none"`,
        ` />`,
        axes.xTick.map((x, i) => {
            return `<text
             x="${xMinInPixels + (x - xMin) / (xMax - xMin) * (xMaxInPixels - xMinInPixels)}"
             y="${yLabelInPixels}"
             text-anchor="middle"
             dominant-baseline="central"
             font-size="12"
            >${axes.xTickLabel[i]}</text>`
        }).join(''),
        axes.yTick.map((y, i) => {
            return `<text
             x="${xLabelInPixels}"
             y="${yMinInPixels + (y - yMin) / (yMax - yMin) * (yMaxInPixels - yMinInPixels)}"
             text-anchor="end"
             dominant-baseline="central"
             font-size="12"
            >${axes.yTickLabel[i]}</text>`
        }).join('')
    ].join('')
}