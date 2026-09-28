import { deepStrictEqual, strictEqual } from 'assert'
import { test } from 'node:test'
import Variables from '../13/Variables.js'
import HistogramInitializer from '../13/HistogramInitializer.js'

test('returns Uint32Array whose length is 10', (_, done) => {
    const variables = new Variables()
    variables.histogramBinCounts.addListener(arg => {
        strictEqual(arg.length, 10)
        done()
    })
    new HistogramInitializer(variables)
    variables.randomNumberGeneratorDestinationState.assign('busy')
})

