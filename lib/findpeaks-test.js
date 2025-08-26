import { deepStrictEqual } from 'assert'
import { test } from 'node:test'
import findpeaks from './findpeaks.js'

test('example input 1 in findpeaks of matlab', () => {
    const [pks, locs] = findpeaks([25, 8, 15, 5, 6, 10, 10, 3, 1, 20, 7])

    deepStrictEqual(pks, [15, 10, 20])
    deepStrictEqual(locs, [2, 5, 9])
})
