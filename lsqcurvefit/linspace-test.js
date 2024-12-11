import { test } from 'node:test'
import linspace from './linspace.js'

test('example inputs 1 in colon of matlab', () => {
    console.log(linspace(-5, 5))
    // output [-5,-4.898990,-4.79798,..., 4.797980,4.898990,5]
    console.log(linspace(-5, 5).length)
    // output.length is 100
})

test('example inputs 2 in linspace of matlab', () => {
    console.log(linspace(-5, 5, 7))
    // output [-5,-3.333,-1.6667,0,1.6667,3.3333,5]
})

