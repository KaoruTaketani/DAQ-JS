/**
 * @param {import('./index.js').Axes} axes
 * @param {number} x
 * @param {string} [lineSpec]
 * @returns {string}
 */
export default (
    axes,
    x,
    lineSpec
) => {
    /**
     * see stairs.js for box parameters
     * which are from [50,50] to [350, 250]
     */
    if (x < axes.xLim[0] || axes.xLim[1] < x) return ''
    const x0 = axes.parentWidth * (axes.innerLeft ?? 0.13),
        x1 = x0 + axes.parentWidth * (axes.innerWidth ?? 0.775),
        y0 = axes.parentHeight * (1 - (axes.innerBottom ?? 0.11)),
        y1 = y0 - axes.parentHeight * (axes.innerHeight ?? 0.815)

    const scaledX = (x - axes.xLim[0]) / (axes.xLim[1] - axes.xLim[0]),
        x_ = x0 + (x1 - x0) * scaledX
    let stroke = 'rgb(0,0,0)'
    if (lineSpec) {
        if (lineSpec === 'r') stroke = 'rgb(255,0,0)'
        if (lineSpec === 'red') stroke = 'rgb(255,0,0)'
        if (lineSpec === 'g') stroke = 'rgb(0,255,0)'
        if (lineSpec === 'green') stroke = 'rgb(0,255,0)'
        if (lineSpec === 'b') stroke = 'rgb(0,0,255)'
        if (lineSpec === 'blue') stroke = 'rgb(0,0,255)'
        if (lineSpec === 'c') stroke = 'rgb(0,255,255)'
        if (lineSpec === 'cyan') stroke = 'rgb(0,255,255)'
        if (lineSpec === 'm') stroke = 'rgb(255,0,255)'
        if (lineSpec === 'magenta') stroke = 'rgb(255,0,255)'
        if (lineSpec === 'y') stroke = 'rgb(255,255,0)'
        if (lineSpec === 'yellow') stroke = 'rgb(255,255,0)'
    }
    return `<polyline points="${x_},${y0} ${x_},${y1}" stroke="${stroke}" fill="none" />`
}