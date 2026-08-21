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

    if (!axes.dataset.xLim) return []
    const xLim = axes.dataset.xLim.split(' ').map(s => parseFloat(s))

    if (!axes.dataset.yLim) return []
    const yLim = axes.dataset.yLim.split(' ').map(s => parseFloat(s))

    const svg = /** @type {SVGElement} */(ev.target)
    const width = svg.getAttribute('width')
    if (!width) return []
    const height = svg.getAttribute('height')
    if (!height) return []

    const px = polyfit([position[0], position[0] + position[2]], xLim, 1)
    const py = polyfit([position[1], position[1] + position[3]], yLim, 1)

    return [
        polyval(px, [ev.offsetX / parseInt(width)])[0],
        polyval(py, [1 - ev.offsetY / parseInt(height)])[0]
    ]
}