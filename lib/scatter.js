/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]|Float64Array} x
 * @param {number[]|Float64Array} y
 * @returns {string}
 */
export default (
    axes,
    x,
    y
) => {
    // ok(x.length === y.length)
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

    return Array.from(x).map((_, i) => {
        if (Number.isNaN(x[i])) return ''

        const rx = axes.xScale === 'log'
            ? (Math.log10(x[i]) - Math.log10(xMin)) / (Math.log10(xMax) - Math.log10(xMin))
            : (x[i] - xMin) / (xMax - xMin)
        const xInPixels = xMinInPixels + rx * (xMaxInPixels - xMinInPixels)

        const ry = axes.yScale === 'log'
            ? (Math.log10(y[i]) - Math.log10(yMin)) / (Math.log10(yMax) - Math.log10(yMin))
            : (y[i] - yMin) / (yMax - yMin)
        const yInPixels = yMinInPixels + ry * (yMaxInPixels - yMinInPixels)


        // size ends with px seems to keep the size on the canvas. read follwing site:
        //  https://stackoverflow.com/questions/27991472/keeping-svg-elements-to-a-fixed-size-while-position-scales
        //
        // matlab defines scatter size by its area, whose default size is 36
        // therefore, the default radius is 6/sqrt(pi) = 3.4px?
        // third parameter can be used to define the size
        //  https://jp.mathworks.com/help/matlab/ref/scatter.html
        return `<circle cx="${xInPixels.toFixed()}" cy="${yInPixels.toFixed()}" r="3.4" stroke="black" fill="none" clip-path="url(#axes)" />`
    }).join('')
}
