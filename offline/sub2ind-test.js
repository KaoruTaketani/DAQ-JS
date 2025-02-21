import { strictEqual } from 'assert'
import { test } from 'node:test'
import sub2ind from './sub2ind.js'

test('returns index for 2d array starts from 0', () => {
    // flipped input returns that of matlab
    strictEqual(sub2ind([2, 3], 1, 1) + 1, 1)
    strictEqual(sub2ind([2, 3], 2, 1) + 1, 4)
    strictEqual(sub2ind([2, 3], 1, 2) + 1, 2)
    strictEqual(sub2ind([2, 3], 2, 2) + 1, 5)
})
test('returns index for 3d array starts from 0', () => {
    // flipped input returns that of matlab
    strictEqual(sub2ind([5, 2, 3], 1, 1, 1) + 1, 1)
    strictEqual(sub2ind([5, 2, 3], 1, 1, 2) + 1, 2)
    strictEqual(sub2ind([5, 2, 3], 1, 2, 1) + 1, 4)
    strictEqual(sub2ind([5, 2, 3], 2, 1, 1) + 1, 7)
    strictEqual(sub2ind([5, 2, 3], 2, 2, 1) + 1, 10)
    strictEqual(sub2ind([5, 2, 3], 2, 1, 2) + 1, 8)
    strictEqual(sub2ind([5, 2, 3], 1, 2, 2) + 1, 5)
    strictEqual(sub2ind([5, 2, 3], 2, 2, 2) + 1, 11)
})
