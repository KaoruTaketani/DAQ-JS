/**
 * @param {import('./index.js').PairedEvent} pairedEvent
 * @returns {number}
 */
export default (
    pairedEvent
) => (pairedEvent.xLeft + pairedEvent.xRight
    + pairedEvent.yLeft + pairedEvent.yRight) / 16
