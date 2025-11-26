import { strictEqual } from 'assert'
import { test } from 'node:test'
import partition from './partition.js'
import colon from './colon.js'

test('example 13 divide bye 3', () => {
    strictEqual(partition(13, 3, 0)[0], 0)
    strictEqual(partition(13, 3, 0)[1], 5)
    strictEqual(partition(13, 3, 1)[0], 5)
    strictEqual(partition(13, 3, 1)[1], 9)
    strictEqual(partition(13, 3, 2)[0], 9)
    strictEqual(partition(13, 3, 2)[1], 13)
})

test('example 13 divide bye 3 with colon', () => {
    const data = colon(1, 13),
        [p0s, p0e] = partition(13, 3, 0),
        [p1s, p1e] = partition(13, 3, 1),
        [p2s, p2e] = partition(13, 3, 2),
        data0 = data.slice(p0s, p0e),
        data1 = data.slice(p1s, p1e),
        data2 = data.slice(p2s, p2e)

    strictEqual(data.length, 13)
    strictEqual(data0.length, 5)
    strictEqual(data1.length, 4)
    strictEqual(data2.length, 4)
    strictEqual(data0[0], 1)
    strictEqual(data0[4], 5)
    strictEqual(data1[0], 6)
    strictEqual(data1[3], 9)
    strictEqual(data2[0], 10)
    strictEqual(data2[3], 13)
})

