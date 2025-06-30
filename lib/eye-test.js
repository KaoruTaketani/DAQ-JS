import { test } from 'node:test'
import eye from './eye.js'
import { deepStrictEqual } from 'assert'

test('example inputs 1 in eye of matlab', () => {
    deepStrictEqual(eye(4), [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])
})

