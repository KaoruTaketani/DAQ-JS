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
        // const points = new Array(x.length).fill(0)
        //     .map((_x, i) => Number.isNaN(x[i])
        //         ? '' :
        //         `${50 + i * 300 / x.length},${250 - 200 * (x[i] - min) / (max - min)}`,)
        return [
            `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
        ].join('')
    } else {
        const x0 = axes.parentWidth * (axes.innerLeft ?? 0.13),
            x1 = x0 + axes.parentWidth * (axes.innerWidth ?? 0.775),
            y0 = axes.parentHeight * (1 - (axes.innerBottom ?? 0.11)),
            y1 = y0 - axes.parentHeight * (axes.innerHeight ?? 0.815)

        const points = new Array(x.length).fill(0)
            .map((_x, i) => Number.isNaN(x[i])
                ? '' :
                `${x0 + (x[i]-axes.xLim[0]) * (x1 - x0) / ((axes.xLim[1] - axes.xLim[0]))},${y0 + (y1 - y0) * (y[i] - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])}`)
        // const points = new Array(x.length).fill(0)
        //     .map((_x, i) => Number.isNaN(x[i])
        //         ? '' :
        //         `${50 + i * 300 / x.length},${250 - 200 * (x[i] - min) / (max - min)}`,)
        return [
            `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
        ].join('')
    }
}