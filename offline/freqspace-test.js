import { test } from 'node:test'
import colon from './colon.js'
import freqspace from './freqspace.js'

test('example inputs 0 in colon of matlab', () => {
    // two arguments are not implemented yet
    console.log(colon(0, 2 / 5, 1))
    console.log(freqspace(5))
    // length must be (5+1)/2 = 3
    // output [0,0.4,0.8]
})

test('example inputs 1 in colon of matlab', () => {
    console.log(colon(0, 2 / 4, 1))
    console.log(freqspace(4))
    // length must be (4+2)/2 = 3
    // output [0,0.5,0.8]
})

