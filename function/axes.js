/**
 * @param {import('./index.js').Axes} axes
 * @returns {string}
 */
export default (
    axes
) => {
    // svg coordinate increases from left/top to right/bottom
    const x0 = axes.parentWidth * (axes.innerLeft ?? 0.13),
        x1 = x0 + axes.parentWidth * (axes.innerWidth ?? 0.775),
        x2 = x0 - (axes.xTickLabelGapOffset ?? 5),
        y0 = axes.parentHeight * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 - axes.parentHeight * (axes.innerHeight ?? 0.815),
        y2 = y0 + (axes.yTickLabelGapOffset ?? 15)
    // const peak = histogram.value.reduce((a, b) => Math.max(a, b), -Infinity)
    // if (peak === 0) return ''
    // '<polyline points="50,50 350,50 350,250 50,250 50,50" stroke="black" fill="none" />',
    // `<text x="50" y="270" text-anchor="middle" dominant-baseline="central">${histogram.lowerEdge}</text>`,
    // `<text x="350" y="270" text-anchor="middle" dominant-baseline="central">${histogram.upperEdge}</text>`,
    // `<text x="30" y="50" text-anchor="middle" dominant-baseline="central">${peak.toLocaleString()}</text>`,
    // '<text x="30" y="250" text-anchor="middle" dominant-baseline="central">0</text>',
    const xtls = axes.xTickLabels ?? axes.xLim.map(x => `${x}`)
    const ytls = axes.yTickLabels ?? axes.yLim.map(y => y.toExponential(2))

    return [
        `<polyline points="${x0},${y0} ${x1},${y0} ${x1},${y1} ${x0},${y1} ${x0},${y0}" stroke="black" fill="none" />`,
        xtls.map((xtl, idx) => {
            return `<text y="${y2}" x="${x0 + idx * (x1 - x0) / (xtls.length - 1)}"  text-anchor="middle" dominant-baseline="central" font-size="12">${xtl}</text>`
        }).join(''),
        ytls.map((ytl, idx) => {
            return `<text x="${x2}" y="${y0 + idx * (y1 - y0) / (ytls.length - 1)}" text-anchor="end" dominant-baseline="central" font-size="12">${ytl}</text>`
        }).join('')
    ].join('')

}