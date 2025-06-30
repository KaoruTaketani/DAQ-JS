import { strictEqual } from 'assert'
import { test } from 'node:test'
import logspace from './logspace.js'
import almostEqual from './almostEqual.js'

test('returns logspace of matlab', () => {
    const result = logspace(1, 5, 7)
    strictEqual(result.length, 7)
    almostEqual(Math.log10(result[0]), 1.0000000)
    almostEqual(Math.log10(result[1]), 1.6666666)
    almostEqual(Math.log10(result[2]), 2.3333333)
    almostEqual(Math.log10(result[3]), 3.0000000)
    almostEqual(Math.log10(result[4]), 3.6666667)
    almostEqual(Math.log10(result[5]), 4.3333333)
    almostEqual(Math.log10(result[6]), 5.0000000)
})
