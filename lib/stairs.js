/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} y
 * @returns {string}
 */
export default (
    axes,
    y
) => {
    const x0 = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        x1 = x0 + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        y0 = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815),
        binWidth = (x1 - x0) / y.length
    const peak = y.reduce((a, b) => Math.max(a, b), -Infinity)
    if (peak === 0) return ''
    const scaledY = axes.yScale === 'log'
        ? Array.from(y).map(v => v === 0 ? 0.1 : v) // Math.log10(0) is NaN
            .map(v => (Math.log10(v) - Math.log10(0.1)) / (Math.log10(peak) - Math.log10(0.1)))
        : Array.from(y).map(v => v / peak)

    const points = y.map((_, i) => [
        `${(x0 + i * binWidth).toFixed()},${(y0 + (y1 - y0) * scaledY[i]).toFixed()}`,
        `${(x0 + (i + 1) * binWidth).toFixed()},${(y0 + (y1 - y0) * scaledY[i]).toFixed()}`
    ].join(' '))

    return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
}
