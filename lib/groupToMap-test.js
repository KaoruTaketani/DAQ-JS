import { deepStrictEqual, strictEqual } from 'assert'
import { test } from 'node:test'
import groupToMap from './groupToMap.js'

test('example dataset 1', () => {
    const records = [
        { player: 'a', team: 'red', score: 10 },
        { player: 'b', team: 'blue', score: 3 },
        { player: 'c', team: 'red', score: 4 },
        { player: 'd', team: 'green', score: 15 }
    ]
    const m1 = groupToMap(records, (/** @type {any} */r) => r.team)
    strictEqual(m1.size, 3)
    deepStrictEqual(Array.from(m1.keys()), ['red', 'blue', 'green'])
    // console.log(m1.get('red'))
    const m2 = groupToMap(records, (/** @type {any} */ r) => r.score)
    strictEqual(m2.size, 4)
    deepStrictEqual(Array.from(m2.keys()), [10, 3, 4, 15])
    // console.log(m2.get(3))
})
