import { test } from 'node:test'
import fzero from './fzero.js'

test('example inputs in lsqcurvefit of matlab', () => {
    console.log(`${fzero('sin', 3.0)}`)
console.log(`${fzero('cos', 1.5)}`)
})
