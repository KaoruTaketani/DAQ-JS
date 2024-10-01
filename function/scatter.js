import { ok } from 'assert'
/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} x
 * @param {number[]} [y]
 * @returns {string}
 */
export default (
    axes,
    x,
    y
) => {
    if (!y) {
        ok(x)
        // const max = x.filter(a => !Number.isNaN(a)).reduce((a, b) => Math.max(a, b), -Infinity)
        // const min = x.filter(a => !Number.isNaN(a)).reduce((a, b) => Math.min(a, b), Infinity)
        // svg coordinate increases from left/top to right/bottom
        const x0 = axes.parentWidth * (axes.innerLeft ?? 0.13),
            x1 = x0 + axes.parentWidth * (axes.innerWidth ?? 0.775),
            y0 = axes.parentHeight * (1 - (axes.innerBottom ?? 0.11)),
            y1 = y0 - axes.parentHeight * (axes.innerHeight ?? 0.815)

        const points = new Array(x.length).fill(0)
            .map((_x, i) => Number.isNaN(x[i])
                ? '' :
                `${x0 + i * (x1 - x0) / x.length},${y0 + (y1 - y0) * (x[i] - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])}`)
        // size ends with px seems to keep the size on the canvas. read follwing site:
        //  https://stackoverflow.com/questions/27991472/keeping-svg-elements-to-a-fixed-size-while-position-scales
        //
        // matlab defines scatter size by its area, whose default size is 36
        // therefore, the default radius is 6/sqrt(pi) = 3.4px?
        // third parameter can be used to define the size
        //  https://jp.mathworks.com/help/matlab/ref/scatter.html
        return points.map(point =>
            `<circle cx="${point.split(',')[0]}" cy="${point.split(',')[1]}" r="3px" />`
        ).join('')
    } else {
        return ''
    }
}