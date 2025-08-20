import { strictEqual } from 'assert'
import { test } from 'node:test'
import gausswin from './gausswin.js'
import almostEqual from './almostEqual.js'

test('example input 1 in gausswin of matlab', () => {
    strictEqual(gausswin(64).length, 64)
    almostEqual(gausswin(64)[0], 0.0439369)
    almostEqual(gausswin(64)[63], 0.0439369)
})

test('example input 2 in gausswin of matlab', () => {
    strictEqual(gausswin(64, 8).length, 64)
    almostEqual(gausswin(64,8)[21], 0.0285655)
    almostEqual(gausswin(64,8)[42], 0.0285655)
})
