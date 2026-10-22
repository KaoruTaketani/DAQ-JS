/**
 * @param {Element} line
 * @returns {number[]}
 */
export default (
    line
) => {
    const points = line.getAttribute('points')
    if (!points) return []
    return points.split(' ').map(xy => parseInt(xy))
}