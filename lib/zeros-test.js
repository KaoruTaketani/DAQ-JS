import { test } from 'node:test'
import zeros from './zeros.js'

test('example inputs 0 in colon of matlab', () => {
    // two arguments are not implemented yet
    console.log(zeros(5))
    // output [1,2,3,4,5,6,7,8,9,10]
})

test('example inputs 0 in colon of matlab', () => {
    // two arguments are not implemented yet
    console.log(zeros(5,3))
    // output [1,2,3,4,5,6,7,8,9,10]
})

