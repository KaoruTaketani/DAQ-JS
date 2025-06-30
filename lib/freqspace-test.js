import { test } from 'node:test'
import colon from './colon.js'
import freqspace from './freqspace.js'

test('freqspace returns matlab freqspace with whole', () => {
    // two arguments are not implemented yet
    console.log(colon(0, 2 / 5, 2 * (5 - 1) / 5))
    console.log(freqspace(5))
    // length must be (5+1)/2 = 3
    // output [0,0.4,0.8]
})

test('freqspace returns matlab freqspace with whole', () => {
    console.log(colon(0, 2 / 4, 2 * (4 - 1) / 4))
    console.log(freqspace(4))
    // length must be (4+2)/2 = 3
    // output [0,0.5,0.8]
})

test('freqspace returns matlab freqspace with whole', () => {
    console.log(colon(0, 2 / 8, 2 * (8 - 1) / 8))
    console.log(freqspace(8))
    // length must be (4+2)/2 = 3
    // output [0,0.5,0.8]
})

