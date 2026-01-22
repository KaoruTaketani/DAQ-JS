import { deepStrictEqual } from 'assert'
import { test } from 'node:test'
import bounds from './bounds.js'

test('returns [minimum, maximum] from number[]', () => {
    deepStrictEqual(bounds([1, 2, 3]), [1, 3])
    deepStrictEqual(bounds([3, 2, 1]), [1, 3])
})

test('returns [minimum, maximum] from number[]', () => {
    deepStrictEqual(bounds(new Uint32Array([1, 2, 3])), [1, 3])
    deepStrictEqual(bounds(new Uint32Array([3, 2, 1])), [1, 3])
})
