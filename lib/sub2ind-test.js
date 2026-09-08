import { strictEqual } from 'assert'
import { test } from 'node:test'
import sub2ind from './sub2ind.js'

test('returns index for 2d array starts from 0', () => {
    // flipped input returns that of matlab
    strictEqual(sub2ind([2, 3], 1, 1) + 1, 1)
    strictEqual(sub2ind([2, 3], 1, 2) + 1, 2)
    strictEqual(sub2ind([2, 3], 1, 3) + 1, 3)
    strictEqual(sub2ind([2, 3], 2, 1) + 1, 4)
    strictEqual(sub2ind([2, 3], 2, 2) + 1, 5)
    strictEqual(sub2ind([2, 3], 2, 3) + 1, 6)
})

test('sequential access to a matrix', () => {
    const shape = [2, 3]
    let index = 0
    for (let i = 0; i < shape[0]; ++i) {
        for (let j = 0; j < shape[1]; ++j) {
            strictEqual(sub2ind(shape, i + 1, j + 1), index++)
        }
    }
})

test('sequential access to an image', () => {
    const width = 3
    const height = 2

    const shape = [height, width]
    let index = 0
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            strictEqual(sub2ind(shape, y + 1, x + 1), index++)
        }
    }
})

test('sequential access to an tof image', () => {
    const numBins = 4
    const width = 3
    const height = 2

    const shape = [numBins, height, width]
    let index = 0
    for (let t = 0; t < numBins; ++t) {
        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                strictEqual(sub2ind(shape, t + 1, y + 1, x + 1), index++)
            }
        }
    }
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
