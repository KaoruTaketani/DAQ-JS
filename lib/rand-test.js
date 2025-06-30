import { strictEqual } from 'assert'
import { test } from 'node:test'
import rand from './rand.js'
import size from '../lsqcurvefit/size.js'

test('1st example of matlab', () => {
    const r = rand(5)

    strictEqual(size(r).length, 2)
    strictEqual(size(r)[0], 5)
    strictEqual(size(r)[1], 5)
    // console.log(r)
})

test('2nd example of matlab', () => {
    const r = rand(10,1)

    strictEqual(size(r).length, 2)
    strictEqual(size(r)[0], 10)
    strictEqual(size(r)[1], 1)
    // console.log(r)
})

