import { ok } from 'assert'
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

    ok(axes.xTick.length === axes.xTickLabel.length)
    ok(axes.yTick.length === axes.yTickLabel.length)

    const polyline = [
        `<polyline`,
        `data-xmin-in-data="${xMin}"`,
        `data-xmax-in-data="${xMax}"`,
        `data-ymin-in-data="${yMin}"`,
        `data-ymax-in-data="${yMax}"`,
        `data-xmin-in-pixels="${xMinInPixels.toFixed()}"`,
        `data-xmax-in-pixels="${xMaxInPixels.toFixed()}"`,
        `data-ymin-in-pixels="${yMinInPixels.toFixed()}"`,
        `data-ymax-in-pixels="${yMaxInPixels.toFixed()}"`,
        `points="${xMinInPixels.toFixed()},${yMinInPixels.toFixed()} ${xMaxInPixels.toFixed()},${yMinInPixels.toFixed()} ${xMaxInPixels.toFixed()},${yMaxInPixels.toFixed()} ${xMinInPixels.toFixed()},${yMaxInPixels.toFixed()} ${xMinInPixels.toFixed()},${yMinInPixels.toFixed()}"`,
        `stroke="black"`,
        `fill="none"`,
        `/>`,
    ].join(' '),
        xTexts = axes.xTick.map((x, i) => {
            const xTickInPixels = xMinInPixels
                + (x - xMin) / (xMax - xMin) * (xMaxInPixels - xMinInPixels)
            return [`<text`,
                `x="${xTickInPixels.toFixed()}"`,
                `y="${yLabelInPixels.toFixed()}"`,
                `text-anchor="middle"`,
                `dominant-baseline="central"`,
                `font-size="12"`,
                `>${axes.xTickLabel[i]}</text>`
            ].join(' ')
        }).join(''),
        yTexts = axes.yTick.map((y, i) => {
            const yTickInPixels = yMinInPixels
                + (y - yMin) / (yMax - yMin) * (yMaxInPixels - yMinInPixels)

            return [`<text`,
                `x="${xLabelInPixels.toFixed()}"`,
                `y="${yTickInPixels.toFixed()}"`,
                `text-anchor="end"`,
                `dominant-baseline="central"`,
                `font-size="12"`,
                `>${axes.yTickLabel[i]}</text>`
            ].join(' ')
        }).join('')

    return [
        polyline,
        xTexts,
        yTexts
    ].join('')
}