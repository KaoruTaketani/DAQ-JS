import { test } from 'node:test'
import colon from './colon.js'

test('example inputs 0 in colon of matlab', () => {
    // two arguments are not implemented yet
    console.log(colon(0, 1, 10))
    // output [0,1,2,3,4,5,6,7,8,9,10]
})

test('example inputs 1 in colon of matlab', () => {
    console.log(colon(0, 0.1, 1))
    // output [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0]
})

test('example inputs 2 in colon of matlab', () => {
    console.log(colon(10, -2, 0))
    // output [10,8,6,4,2,0]
})

