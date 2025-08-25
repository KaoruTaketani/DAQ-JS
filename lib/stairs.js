/**
 * @param {import('./index.js').Axes} axes
 * @param {number[]} y
 * @returns {string}
 */
export default (
    axes,
    y
) => {
    const xMinInPixels = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        xMaxInPixels = xMinInPixels + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        yMinInPixels = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        yMaxInPixels = yMinInPixels - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815),
        binWidth = (xMaxInPixels - xMinInPixels) / y.length

    const peak = y.reduce((a, b) => Math.max(a, b), -Infinity)
    if (peak === 0) return ''
    const scaledY = axes.yScale === 'log'
        ? Array.from(y).map(v => v === 0 ? 0.1 : v) // Math.log10(0) is NaN
            .map(v => (Math.log10(v) - Math.log10(0.1)) / (Math.log10(peak) - Math.log10(0.1)))
        : Array.from(y).map(v => v / peak)

    const points = y.map((_, i) => [
        `${(xMinInPixels + i * binWidth).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * scaledY[i]).toFixed()}`,
        `${(xMinInPixels + (i + 1) * binWidth).toFixed()},${(yMinInPixels + (yMaxInPixels - yMinInPixels) * scaledY[i]).toFixed()}`
    ].join(' '))

    return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
}
