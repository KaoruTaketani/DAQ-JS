import { throws, strictEqual } from 'assert'
import { test } from 'node:test'
import { checkStatus } from './visa.js'


test('checkStatus returns undefined', () => {
    strictEqual(checkStatus(0x3FFF009B), undefined)
})

test('checkStatus throws an error', () => {
    throws(
        () => { checkStatus(0xbFFF0000) },
        { name: 'Error', message: `NI-VISA Error: (0xbfff0000)` }
    )
})
