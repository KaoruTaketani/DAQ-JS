/**
 * @param {HTMLElement} axes
 * @returns {number[]}
 */
export default (
    axes
) => {
    if (!axes.dataset.xLim) return []
    return axes.dataset.xLim.split(' ').map(s => parseFloat(s))
}