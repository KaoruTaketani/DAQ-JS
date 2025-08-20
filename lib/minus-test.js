import { deepStrictEqual } from 'assert'
import { test } from 'node:test'
import minus from './minus.js'

test('example input of minus in matlab', () => {
    deepStrictEqual(minus([1, 0, 2, 4], [5,9,2,1]), [-4,-9,0,3])
})

