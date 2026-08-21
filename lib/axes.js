// import { ok } from 'assert'
/**
 * @param {import('./index.js').Axes} axes
 */
export default (
    axes
) => {
    const viewBox = axes.viewBox ?? [0, 0, 560, 420]
    const position = axes.position ?? [0.1300, 0.1100, 0.7750, 0.8150]
    
    const xMinInPixels = viewBox[2] * position[0],
        xMaxInPixels = xMinInPixels + viewBox[2] * position[2],
        xLabelInPixels = xMinInPixels - (axes.xTickLabelGapOffset ?? 5),
        yMinInPixels = viewBox[3] * (1 - position[1]),
        yMaxInPixels = yMinInPixels - viewBox[3] * position[3],
        yLabelInPixels = yMinInPixels + (axes.yTickLabelGapOffset ?? 15),
        xMinInData = axes.xLim[0],
        xMaxInData = axes.xLim[1],
        yMinInData = axes.yLim[0],
        yMaxInData = axes.yLim[1]

    // ok(axes.xTick.length === axes.xTickLabel.length)
    // ok(axes.yTick.length === axes.yTickLabel.length)

    const polyline = [
        `<polyline`,
        `data-x-lim="${axes.xLim.join(' ')}"`,
        `data-y-lim="${axes.yLim.join(' ')}"`,
        `data-position="${position.join(' ')}"`,
        `data-xmin-in-data="${xMinInData}"`,
        `data-xmax-in-data="${xMaxInData}"`,
        `data-ymin-in-data="${yMinInData}"`,
        `data-ymax-in-data="${yMaxInData}"`,
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
                + (x - xMinInData) / (xMaxInData - xMinInData) * (xMaxInPixels - xMinInPixels)
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
                + (y - yMinInData) / (yMaxInData - yMinInData) * (yMaxInPixels - yMinInPixels)

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
        `<clipPath id="axes">`,
        `. <polyline points="${xMinInPixels.toFixed()},${yMinInPixels.toFixed()} ${xMaxInPixels.toFixed()},${yMinInPixels.toFixed()} ${xMaxInPixels.toFixed()},${yMaxInPixels.toFixed()} ${xMinInPixels.toFixed()},${yMaxInPixels.toFixed()} ${xMinInPixels.toFixed()},${yMinInPixels.toFixed()}" />`,
        `</clipPath>`,
        xTexts,
        yTexts
    ].join('')
}