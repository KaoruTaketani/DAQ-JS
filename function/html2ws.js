/**
 * @param {string} htmlURL
 * @returns {string}
 */
export default (
    htmlURL
) => `ws${htmlURL.substring('http'.length, htmlURL.length - '.html'.length)}`