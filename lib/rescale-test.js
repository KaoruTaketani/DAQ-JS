import { strictEqual } from 'assert'
import { test } from 'node:test'
import rescale from './rescale.js'

test('example with InputMin&InputMax of matlab', () => {
    const limits = [1, 5]
    strictEqual(rescale(-30, limits), 0)
    strictEqual(rescale(1, limits), 0)
    strictEqual(rescale(2, limits), 0.25)
    strictEqual(rescale(3, limits), 0.5)
    strictEqual(rescale(4, limits), 0.75)
    strictEqual(rescale(5, limits), 1)
    strictEqual(rescale(70, limits), 1)
})

