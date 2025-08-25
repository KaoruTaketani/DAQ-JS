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

    const x0 = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        x1 = x0 + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        y0 = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815)

    /** @type {string[]} */
    const points = y.map((_, i) => {
        if (Number.isNaN(y[i])) return ''

        const xInPixels = x0 + (x1 - x0)
            * (x[i] - axes.xLim[0]) / (axes.xLim[1] - axes.xLim[0])
        const yInPixels = y0 + (y1 - y0)
            * (y[i] - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])
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