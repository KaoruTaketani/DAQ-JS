import { strictEqual } from 'assert'
import { test } from 'node:test'
import dot from './dot.js'

test('matlab example 1', () => {
    const a = [4, -1, 2],
        b = [2, -2, -1],
        c=dot(a,b)

    strictEqual(c, 8)
})

