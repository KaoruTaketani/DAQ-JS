/**
 * @param {HTMLElement} axes
 * @returns {number[]}
 */
export default (
    axes
) => {
    if (!axes.dataset.yLim) return []
    return axes.dataset.yLim.split(' ').map(s => parseFloat(s))
}