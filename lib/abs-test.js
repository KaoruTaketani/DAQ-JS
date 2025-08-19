import { deepStrictEqual } from 'assert'
import { test } from 'node:test'
import abs from './abs.js'

test('returns absolute values of number array', () => {
    deepStrictEqual(abs([1.3, -3.56, 8.23, -5, -0.01]), [1.3, 3.56, 8.23, 5, 0.01])
})
