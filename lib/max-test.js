import { strictEqual } from 'assert'
import { test } from 'node:test'
import max from './max.js'

test('example inputs 1 in max of matlab', () => {
    strictEqual(max([23, 42, 37, 18, 52]), 52)
})

test('example inputs 1 in max of matlab using Uint32Array', () => {
    strictEqual(max(new Uint32Array([23, 42, 37, 18, 52])), 52)
})

