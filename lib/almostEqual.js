import { strictEqual } from 'assert'
/**
 * @param {number} actual
 * @param {number} expected
 * @param {number} [precision]
 */
export default (actual,
    expected,
    precision) => {
    if (!precision) precision = 5


    strictEqual(
        actual.toPrecision(precision),
        expected.toPrecision(precision)
    )
    // strictEqual(
    //     Math.fround(actual),
    //     Math.fround(expected)
    // )
    // strictEqual(
    //     actual.toString(2).length,
    //     expected.toString(2).length
    // )
}
