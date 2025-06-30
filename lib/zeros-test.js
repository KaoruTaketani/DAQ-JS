import { test } from 'node:test'
import zeros from './zeros.js'
import { deepStrictEqual } from 'assert'

test('example inputs 1 in zeros of matlab', () => {
    deepStrictEqual(zeros(5),[
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ])
})

test('example inputs 2 in zeros of matlab', () => {
    deepStrictEqual(zeros(5,3),[
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ])
})

