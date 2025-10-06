import { strictEqual } from 'assert'
import { test } from 'node:test'
import isbetween from './isbetween.js'

test('example 1 of matlab', () => {
    const limits = [2, 7]
    strictEqual(isbetween(1, limits), false)
    strictEqual(isbetween(3, limits), true)
    strictEqual(isbetween(5, limits), true)
    strictEqual(isbetween(7, limits), true)
    strictEqual(isbetween(9, limits), false)
})

