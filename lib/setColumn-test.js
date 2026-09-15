import { deepStrictEqual } from 'assert'
import { test } from 'node:test'
import getColumn from './getColumn.js'
import setColumn from './setColumn.js'
import colon from './colon.js'

test('returns column of a matrix', () => {
    const x = {
        shape: [4, 4],
        data: new Array(4 * 4).fill(0)
    }
    setColumn(x, 1, colon(1, 4))
    setColumn(x, 2, colon(5, 8))
    setColumn(x, 3, colon(9, 12))
    setColumn(x, 4, colon(13, 16))
    deepStrictEqual(getColumn(x, 1), [1, 2, 3, 4])
    deepStrictEqual(getColumn(x, 2), [5, 6, 7, 8])
    deepStrictEqual(getColumn(x, 3), [9, 10, 11, 12])
    deepStrictEqual(getColumn(x, 4), [13, 14, 15, 16])
    deepStrictEqual(x.data, [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16])
})

