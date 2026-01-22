import { strictEqual } from 'assert'
import { test } from 'node:test'
import colon from './colon.js'
import sum from './sum.js'

test('example inputs 1 in sum of matlab', () => {
    strictEqual(sum(colon(1,10)), 55)
})

test('example inputs 1 in sum of matlab using Uint32Array', () => {
    strictEqual(sum(new Uint32Array(colon(1,10))), 55)
})

