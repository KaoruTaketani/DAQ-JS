export default (
    axes,
    label
) => {
    const x0 = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        x1 = x0 + (axes.yLabelGapOffset ?? -50),
        y0 = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815),
        y2 = (y1 + y0) / 2

    return `<text x="${x1}" y="${y2}" text-anchor="middle" transform="rotate(-90,${x1},${y2})">${label}</text>`
}