import { strictEqual } from 'assert'
import { test } from 'node:test'
import gausswin from './gausswin.js'
import isapprox from './isapprox.js'

test('example input 1 in gausswin of matlab', () => {
    strictEqual(gausswin(64).length, 64)
    isapprox(gausswin(64)[0], 0.0439369)
    isapprox(gausswin(64)[63], 0.0439369)
})

test('example input 2 in gausswin of matlab', () => {
    strictEqual(gausswin(64, 8).length, 64)
    isapprox(gausswin(64,8)[21], 0.0285655)
    isapprox(gausswin(64,8)[42], 0.0285655)
})
