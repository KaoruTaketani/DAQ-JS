import { strictEqual } from 'assert'
import { test } from 'node:test'
import isbetween from './isbetween.js'

test('example 1 of matlab, but modified to right-open interval so that this function can be used in histogram makers', () => {
    const limits = [2, 7]
    strictEqual(isbetween(1, limits), false)
    strictEqual(isbetween(3, limits), true)
    strictEqual(isbetween(5, limits), true)
    strictEqual(isbetween(7, limits), false)
    strictEqual(isbetween(9, limits), false)
})

