import { strictEqual } from 'assert'
import { test } from 'node:test'
import randn from './randn.js'
import size from './size.js'

test('1st example of matlab', () => {
    const r = randn(5)

    strictEqual(size(r).length, 2)
    strictEqual(size(r)[0], 5)
    strictEqual(size(r)[1], 5)
    // console.log(r)
})

test('2nd example of matlab', () => {
    const r = randn(10, 2)

    strictEqual(size(r).length, 2)
    strictEqual(size(r)[0], 10)
    strictEqual(size(r)[1], 2)
    // console.log(r)
})

test('histogram 1d', () => {
    const n = 1000,
        r = randn(1, n)[0],
        h = {
            lowerEdge: - 3,
            upperEdge: 3,
            overflowValue: 0,
            underflowValue: 0,
            value: new Array(60).fill(0)
        }
    for (let i = 0; i < n; ++i) {
        if (r[i] < h.lowerEdge) {
            h.underflowValue++
        } else if (h.upperEdge < r[i]) {
            h.overflowValue++
        } else {
            const idx = Math.floor((r[i] - h.lowerEdge) / (h.upperEdge - h.lowerEdge) * h.value.length)
            // console.log(`${idx} ${r[i]}`)
            h.value[idx]++
        }
    }
    // console.log(h)
})

test('histogram 1d', () => {
    const n = 1000,
        r = randn(2, n),
        h = {
            lowerEdge: - 3,
            upperEdge: 3,
            outValue: 0,
            value: new Array(60).fill().map(_ => new Array(60).fill(0))
        }
    for (let i = 0; i < n; ++i) {
        if (r[0][i] < h.lowerEdge
            || r[1][i] < h.lowerEdge
            || h.upperEdge < r[0][i]
            || h.upperEdge < r[1][i]) {
            h.outValue++
        } else {
            const ix = Math.floor((r[0][i] - h.lowerEdge) / (h.upperEdge - h.lowerEdge) * 60),
                iy = Math.floor((r[1][i] - h.lowerEdge) / (h.upperEdge - h.lowerEdge) * 60)
            // console.log(`${idx} ${r[i]}`)
            h.value[ix][iy]++
        }
    }
    // console.log(h)
})

