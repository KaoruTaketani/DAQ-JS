/**
 * @param {import('./index.js').Axes} axes
 * @param {string} label
 * @returns {string}
 */
export default (
    axes,
    label
) => {
    const x0 = axes.parentWidth * (axes.innerLeft ?? 0.13),
        x1 = x0 + axes.parentWidth * (axes.innerWidth ?? 0.775),
        x2 = (x0 + x1) / 2,
        y0 = axes.parentHeight * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 + (axes.xLabelGapOffset ?? 30)

    return `<text x="${x2}" y="${y1}" text-anchor="middle" >${label}</text>`
}