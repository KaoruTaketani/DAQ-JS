import { strictEqual } from 'assert'
import { test } from 'node:test'
import gausswin from './gausswin.js'

test('example input 1 in gausswin of matlab', () => {
    strictEqual(gausswin(64).length, 64)
})

test('example input 2 in gausswin of matlab', () => {
    strictEqual(gausswin(64,8).length, 64)
})
