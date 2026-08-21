/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} x
 * @param {number[]|Float64Array} y
 * @param {import('./index.js').LineOptions} [opts]
 * @returns {string}
 */
export default (
    axes,
    x,
    y,
    opts
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

    /** @type {string[]} */
    const points = x.map((_, i) => {
        if (Number.isNaN(y[i])) return ''

        const rx = axes.xScale === 'log'
            ? (Math.log10(x[i]) - Math.log10(xMin)) / (Math.log10(xMax) - Math.log10(xMin))
            : (x[i] - xMin) / (xMax - xMin)
        const xInPixels = xMinInPixels + rx * (xMaxInPixels - xMinInPixels)

        const ry = axes.yScale === 'log'
            ? (Math.log10(y[i]) - Math.log10(yMin)) / (Math.log10(yMax) - Math.log10(yMin))
            : (y[i] - yMin) / (yMax - yMin)
        const yInPixels = yMinInPixels + ry * (yMaxInPixels - yMinInPixels)

        return `${xInPixels.toFixed()},${yInPixels.toFixed()}`
    })
    if (!opts) {
        return `<polyline points="${points.join(' ')}" stroke="black" fill="none" clip-path="url(#axes)" />`
    } else {
        // restrict color in [red, green, blue, cyan, magenta, yellow, white, black]?
        if (!opts.lineStyle) {
            if (!opts.color) {
                return `<polyline points="${points.join(' ')}" stroke="black" fill="none" clip-path="url(#axes)" />`
            } else {
                return `<polyline points="${points.join(' ')}" stroke="${opts.color}" fill="none" clip-path="url(#axes)" />`
            }
        } else {
            //
            // - solid line
            // -- dashed line
            // : dotted line
            // -. dash dotted line
            //
            // https://jp.mathworks.com/help/matlab/ref/matlab.graphics.shape.line-properties.html
            //
            if (opts.lineStyle !== '--') {
                return ''
            } else {
                if (!opts.color) {
                    return `<polyline points="${points.join(' ')}" stroke="black" fill="none" stroke-dasharray="10 5" />`
                } else {
                    return `<polyline points="${points.join(' ')}" stroke="${opts.color}" fill="none" stroke-dasharray="10 5" />`
                }
            }
        }
    }
}