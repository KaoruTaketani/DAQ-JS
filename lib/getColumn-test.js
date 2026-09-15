import { deepStrictEqual } from 'assert'
import { test } from 'node:test'
import getClumn from './getColumn.js'
import colon from './colon.js'

test('returns column of a matrix', () => {
    const x = {
        shape: [4, 4],
        data: colon(1, 16)
    }
    deepStrictEqual(getClumn(x, 1), [1, 5, 9, 13])
    deepStrictEqual(getClumn(x, 2), [2, 6, 10, 14])
    deepStrictEqual(getClumn(x, 3), [3, 7, 11, 15])
    deepStrictEqual(getClumn(x, 4), [4, 8, 12, 16])
})

