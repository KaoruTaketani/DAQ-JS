import { strictEqual } from 'assert'
import { test } from 'node:test'
import zeros from './zeros.js'
import size from './size.js'

test('2x3 matrix', () => {
    const m = size(zeros(2,3))

    strictEqual(m.length, 2)
    strictEqual(m[0], 2)
    strictEqual(m[1], 3)
})

test('3x3 matrix', () => {
    const m = size(zeros(3))

    strictEqual(m.length, 2)
    strictEqual(m[0], 3)
    strictEqual(m[1], 3)
})

