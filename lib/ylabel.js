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
        x1 = x0 + (axes.yLabelGapOffset ?? -50),
        y0 = viewBox[3] * (1 - position[1]),
        y1 = y0 - viewBox[3] * position[3],
        y2 = (y1 + y0) / 2

    return `<text x="${x1}" y="${y2}" text-anchor="middle" transform="rotate(-90,${x1},${y2})">${label}</text>`
}