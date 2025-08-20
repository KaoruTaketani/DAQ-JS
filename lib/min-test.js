import { strictEqual } from 'assert'
import { test } from 'node:test'
import min from './min.js'

test('example inputs 1 in min of matlab', () => {
    strictEqual(min([23, 42, 37, 15, 52]), 15)
})

