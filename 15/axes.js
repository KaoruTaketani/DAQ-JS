export default (
    axes
) => {
    const xMinInPixels = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        xMaxInPixels = xMinInPixels + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        xLabelInPixels = xMinInPixels - (axes.xTickLabelGapOffset ?? 5),
        yMinInPixels = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        yMaxInPixels = yMinInPixels - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815),
        yLabelInPixels = yMinInPixels + (axes.yTickLabelGapOffset ?? 15),
        xmin = axes.xLim[0],
        xmax = axes.xLim[1],
        ymin = axes.yLim[0],
        ymax = axes.yLim[1]
    return [
        `<polyline`,
        ` points="${xMinInPixels},${yMinInPixels} ${xMaxInPixels},${yMinInPixels} ${xMaxInPixels},${yMaxInPixels} ${xMinInPixels},${yMaxInPixels} ${xMinInPixels},${yMinInPixels}"`,
        ` stroke="black"`,
        ` fill="none"`,
        ` />`,
        axes.xTick.map((x, i) => {
            return `<text
             x="${xMinInPixels + (x - xmin) / (xmax - xmin) * (xMaxInPixels - xMinInPixels)}"
             y="${yLabelInPixels}"
             text-anchor="middle"
             dominant-baseline="central"
             font-size="12"
            >${axes.xTickLabel[i]}</text>`
        }).join(''),
        axes.yTick.map((y, i) => {
            return `<text
             x="${xLabelInPixels}"
             y="${yMinInPixels + (y - ymin) / (ymax - ymin) * (yMaxInPixels - yMinInPixels)}"
             text-anchor="end"
             dominant-baseline="central"
             font-size="12"
            >${axes.yTickLabel[i]}</text>`
        }).join('')
    ].join('')
}