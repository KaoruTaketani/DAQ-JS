import { deepStrictEqual } from 'assert'
import { test } from 'node:test'
import Variables from '../13/Variables.js'
import HistogramMaker from '../13/HistogramMaker.js'

test('increments bin id 5', (_, done) => {
    const variables = new Variables()
    new HistogramMaker(variables)
    variables.histogramBinCounts.assign(new Uint32Array(10))
    variables.histogramBinCounts.addListener(arg => {
        for (let i = 0; i < 10; ++i) {
            deepStrictEqual(arg[i], i === 5 ? 1 : 0)
        }
        done()
    })
    variables.randomNumber.assign(0.55)
})

