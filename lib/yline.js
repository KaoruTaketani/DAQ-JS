import line from './line.js'

/**
 * @param {import('./index.js').Axes} axes
 * @param {number} y
 * @param {import('./index.js').LineOptions} [opts]
 * @returns {string}
 */
export default (
    axes,
    y,
    opts
) => {
    return line(axes, axes.xLim, [y, y], opts)
}
