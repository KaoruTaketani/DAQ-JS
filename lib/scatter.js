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

    const x0 = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        x1 = x0 + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        y0 = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815)

    const points = new Array(x.length).fill(0)
        .map((_, i) => Number.isNaN(x[i])
            ? '' : [
                `${x0 + (x1 - x0) * (x[i] - axes.xLim[0]) / (axes.xLim[1] - axes.xLim[0])}`,
                `${y0 + (y1 - y0) * (y[i] - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])}`
            ].join(','))
    // size ends with px seems to keep the size on the canvas. read follwing site:
    //  https://stackoverflow.com/questions/27991472/keeping-svg-elements-to-a-fixed-size-while-position-scales
    //
    // matlab defines scatter size by its area, whose default size is 36
    // therefore, the default radius is 6/sqrt(pi) = 3.4px?
    // third parameter can be used to define the size
    //  https://jp.mathworks.com/help/matlab/ref/scatter.html
    return points.map(point =>
        // `<circle cx="${point.split(',')[0]}" cy="${point.split(',')[1]}" r="3px" />`
        // `<circle cx="${point.split(',')[0]}" cy="${point.split(',')[1]}" r="3.4" />`
        `<circle cx="${point.split(',')[0]}" cy="${point.split(',')[1]}" r="3.4" stroke="black" fill="none"/>`
    ).join('')
}
//         ` stroke="black"`,
// ` fill="none"`,
