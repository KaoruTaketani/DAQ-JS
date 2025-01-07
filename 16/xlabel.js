export default (
    axes,
    label
) => {
    const x0 = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
        x1 = x0 + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
        x2 = (x0 + x1) / 2,
        y0 = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 + (axes.xLabelGapOffset ?? 40)

    return `<text x="${x2}" y="${y1}" text-anchor="middle" >${label}</text>`
}