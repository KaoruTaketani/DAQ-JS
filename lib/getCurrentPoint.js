import getXLim from './getXLim.js'
import getYLim from './getYLim.js'
import polyfit from './polyfit.js'
import polyval from './polyval.js'
/**
 * @param {HTMLElement} axes
 * @param {MouseEvent} ev
 * @returns {number[]}
 */
export default (
    axes,
    ev
) => {
    if (!axes.dataset.position) return []
    const position = axes.dataset.position.split(' ').map(s => parseFloat(s))

    const xLim = getXLim(axes)
    const yLim = getYLim(axes)

    const svg = /** @type {SVGElement} */(ev.target)
    const width = svg.getAttribute('width')
    if (!width) return []
    const height = svg.getAttribute('height')
    if (!height) return []

    if (axes.dataset.yScale === 'log') {
        const px = polyfit([position[0], position[0] + position[2]], xLim, 1)
        const py = polyfit([position[1], position[1] + position[3]],
            [Math.log10(yLim[0]), Math.log10(yLim[1])], 1)
        return [
            polyval(px, [ev.offsetX / parseInt(width)])[0],
            10 ** polyval(py, [1 - ev.offsetY / parseInt(height)])[0]
        ]
    } else {
        const px = polyfit([position[0], position[0] + position[2]], xLim, 1)
        const py = polyfit([position[1], position[1] + position[3]], yLim, 1)
        return [
            polyval(px, [ev.offsetX / parseInt(width)])[0],
            polyval(py, [1 - ev.offsetY / parseInt(height)])[0]
        ]
    }
}