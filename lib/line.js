import { ok } from 'assert'
/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} x
 * @param {number[]} y
 * @param {import('./index.js').LineOptions} [opts]
 * @returns {string}
 */
export default (
    axes,
    x,
    y,
    opts
) => {
    ok(x.length === y.length)

    const xMinInPixels = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        xMaxInPixels = xMinInPixels + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        yMinInPixels = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        yMaxInPixels = yMinInPixels - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815),
        xMin = axes.xLim[0],
        xMax = axes.xLim[1],
        yMin = axes.yLim[0],
        yMax = axes.yLim[1]

    /** @type {string[]} */
    const points = y.map((_, i) => {
        if (Number.isNaN(y[i])) return ''

        const xInPixels = xMinInPixels + (xMaxInPixels - xMinInPixels)
            * (x[i] - xMin) / (xMax - xMin)
        const yInPixels = yMinInPixels + (yMaxInPixels - yMinInPixels)
            * (y[i] - yMin) / (yMax - yMin)
        return `${xInPixels.toFixed()},${yInPixels.toFixed()}`
    })
    if (!opts) {
        return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
    } else {
        // restrict color in [red, green, blue, cyan, magenta, yellow, white, black]?
        if (!opts.lineStyle) {
            if (!opts.color) {
                return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
            } else {
                return `<polyline points="${points.join(' ')}" stroke="${opts.color}" fill="none" />`
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