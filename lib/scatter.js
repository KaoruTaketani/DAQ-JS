import { ok } from 'assert'
/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} x
 * @param {number[]} y
 * @returns {string}
 */
export default (
    axes,
    x,
    y
) => {
    ok(x.length === y.length)

    const xMinInPixels = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        xMaxInPixels = xMinInPixels + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        yMinInPixels = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        yMaxInPixels = yMinInPixels - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815)

    return y.map((_, i) => {
        if (Number.isNaN(x[i])) return ''

        const xInPixels = xMinInPixels + (xMaxInPixels - xMinInPixels)
            * (x[i] - axes.xLim[0]) / (axes.xLim[1] - axes.xLim[0])
        const yInPixels = yMinInPixels + (yMaxInPixels - yMinInPixels)
            * (y[i] - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])

        // size ends with px seems to keep the size on the canvas. read follwing site:
        //  https://stackoverflow.com/questions/27991472/keeping-svg-elements-to-a-fixed-size-while-position-scales
        //
        // matlab defines scatter size by its area, whose default size is 36
        // therefore, the default radius is 6/sqrt(pi) = 3.4px?
        // third parameter can be used to define the size
        //  https://jp.mathworks.com/help/matlab/ref/scatter.html
        return `<circle cx="${xInPixels.toFixed()}" cy="${yInPixels.toFixed()}" r="3.4" stroke="black" fill="none"/>`
    }).join('')
}
