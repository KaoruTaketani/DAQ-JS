import { strictEqual } from 'assert'
import { test } from 'node:test'
import colon from './colon.js'
import isapprox from './isapprox.js'
import peaks from './peaks.js'
import bounds from './bounds.js'
import min from './min.js'
import max from './max.js'

test('example inputs in peaks of matlab', () => {
    const Z = peaks(colon(-1, 0.25, 1))

    strictEqual(Z.shape.length, 2)
    strictEqual(Z.shape[0], 9)
    strictEqual(Z.shape[1], 9)
    strictEqual(Z.data.length, 81)
    isapprox(Z.data[0], 1.8559)
    isapprox(Z.data[1], 2.4537)
    isapprox(Z.data[2], 2.2247)
    isapprox(Z.data[9], 1.7829)
    isapprox(Z.data[18], 0.79689)
    isapprox(min(Z.data),-2.22224)
    isapprox(max(Z.data),3.68862)
})
