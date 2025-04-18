/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} x
 */
export default (
    axes,
    x
) => {
    const x0 = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        x1 = x0 + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        y0 = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815)
    const peak = x.reduce((a, b) => Math.max(a, b), -Infinity)
    if (peak === 0) return ''
    const scaledY = Array.from(x).map(v => v / peak)
    const points = new Array(x.length).fill(0)
        .map((_, i) => [
            `${x0 + i * (x1 - x0) / x.length},${y0 + (y1 - y0) * scaledY[i]}`,
            `${x0 + (i + 1) * (x1 - x0) / x.length},${y0 + (y1 - y0) * scaledY[i]}`
        ].join(' '))

    return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
}