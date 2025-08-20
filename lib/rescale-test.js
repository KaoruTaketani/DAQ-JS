import { deepStrictEqual } from 'assert'
import { test } from 'node:test'
import rescale from './rescale.js'
import colon from './colon.js'

test('example 1 of rescale in matlab', () => {
    deepStrictEqual(
        rescale(colon(1, 5)),
        [0, 0.25, 0.5, 0.75, 1]
    )
})

test('example 2 of rescale in matlab', () => {
    deepStrictEqual(
        rescale(colon(1, 5), -1, 1),
        [-1, -0.5, 0, 0.5, 1]
    )
})

