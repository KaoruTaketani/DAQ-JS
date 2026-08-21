/**
 * @param {import('./index.js').Axes} axes
 * @param {string} label
 * @returns {string}
 */
export default (
    axes,
    label
) => {
    const viewBox = axes.viewBox ?? [0, 0, 560, 420]
    const position = axes.position ?? [0.1300, 0.1100, 0.7750, 0.8150]

    const x0 = viewBox[2] * position[0],
        x1 = x0 + viewBox[2] * position[2],
        x2 = (x0 + x1) / 2,
        y0 = viewBox[3] * (1 - position[1]),
        y1 = y0 + (axes.xLabelGapOffset ?? 40)

    return `<text x="${x2}" y="${y1}" text-anchor="middle" >${label}</text>`
}