import { strictEqual } from 'assert'
import { test } from 'node:test'
import colon from './colon.js'
import fliplr from './fliplr.js'

test('matlab example 1', () => {
    const a = colon(1, 10),
        b = fliplr(a)

    strictEqual(b[0], 10)
    strictEqual(b[1], 9)
    strictEqual(b[2], 8)
    strictEqual(b[3], 7)
    strictEqual(b[4], 6)
    strictEqual(b[5], 5)
    strictEqual(b[6], 4)
    strictEqual(b[7], 3)
    strictEqual(b[8], 2)
    strictEqual(b[9], 1)
})

