import line from './line.js'

/**
 * @param {import('./index.js').Axes} axes
 * @param {number} x
 * @param {import('./index.js').LineOptions} [opts]
 * @returns {string}
 */
export default (
    axes,
    x,
    opts
) => {
    return line(axes, [x, x], axes.yLim, opts)
}
