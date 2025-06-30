import { test } from 'node:test'
import fsolve from './fsolve.js'

test('example inputs in lsqcurvefit of matlab', () => {
    console.log(`${fsolve('mathews', [2.00, 0.25])}`)
})
