import { deepStrictEqual } from 'assert'
import { test } from 'node:test'
import diff from './diff.js'

test('returns difference values of number array', () => {
    deepStrictEqual(diff([1, 1, 2, 3, 5, 8, 13, 21]), [0, 1, 1, 2, 3, 5, 8])
})
