import { test } from 'node:test'
import { strictEqual } from 'assert'
import prod from './prod.js'

test('returns mean', () => {
    strictEqual(prod([1024, 1024]), 1024 * 1024)
    strictEqual(prod([1, 2, 3]), 6)
    strictEqual(prod([4, 5, 6]), 120)
    strictEqual(prod([7, 8, 9]), 504)
})
