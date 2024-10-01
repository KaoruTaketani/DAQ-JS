import { ok } from 'assert'
import min from './min.js'
/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} x
 * @param {number[]} viewBoxOffset
 * @returns {string}
 */
export default (
    axes,
    x,
    viewBoxOffset
) => {
    ok(x)
    // const max = x.filter(a => !Number.isNaN(a)).reduce((a, b) => Math.max(a, b), -Infinity)
    // const min = x.filter(a => !Number.isNaN(a)).reduce((a, b) => Math.min(a, b), Infinity)
    // svg coordinate increases from left/top to right/bottom
    const x0 = axes.parentWidth * (axes.innerLeft ?? 0.13),
        x1 = x0 + axes.parentWidth * (axes.innerWidth ?? 0.775),
        y0 = axes.parentHeight * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 - axes.parentHeight * (axes.innerHeight ?? 0.815)

    const points = new Array(x.length).fill(0)
        .filter(_x => !Number.isNaN(_x))
        .map((_x, i) => [
            x0 + i * (x1 - x0) / x.length,
            y0 + (y1 - y0) * (x[i] - axes.yLim[0]) / (axes.yLim[1] - axes.yLim[0])
        ])
    // const points = new Array(x.length).fill(0)
    //     .map((_x, i) => Number.isNaN(x[i])
    //         ? '' :
    //         `${50 + i * 300 / x.length},${250 - 200 * (x[i] - min) / (max - min)}`,)
    // return [
    //     `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
    // ].join('')
    // offset seems to give px in svg size and not viewBox size os viewBoxOffset is necessary
    const dist = points.map(p => Math.abs(p[0] - viewBoxOffset[0]) + Math.abs(p[1] - viewBoxOffset[1]))
    const i = dist.indexOf(min(dist))
    return [
        `<rect x="${points[i][0]}" y="${points[i][1]}" width="100" height="40" stroke="black" fill="white"/>`,
        `<text x="${points[i][0]+10}" y="${points[i][1]+15}">${i} </text>`,
        `<text x="${points[i][0]+10}" y="${points[i][1]+30}">${x[i]}</text>`,
        `<circle cx="${points[i][0]}" cy="${points[i][1]}" r="5" />`
    ].join('')
}