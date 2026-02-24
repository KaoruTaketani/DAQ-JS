import { test } from 'node:test'
import isapprox from './isapprox.js'
import fft0 from './fft0.js'

test('example inputs 8', () => {
    const data = new Uint32Array([3, 2 + Math.SQRT1_2, 2, 2 - Math.SQRT1_2, 1, 2 - Math.SQRT1_2, 2, 2 + Math.SQRT1_2]),
        [x0, y0] = fft0(data),
        x = data[0]
            + data[1] * Math.SQRT1_2
            - data[3] * Math.SQRT1_2
            - data[4]
            - data[5] * Math.SQRT1_2
            + data[7] * Math.SQRT1_2,
        y = data[1] * Math.SQRT1_2
            + data[2]
            + data[3] * Math.SQRT1_2
            - data[5] * Math.SQRT1_2
            - data[6]
            - data[7] * Math.SQRT1_2

    isapprox(x0, x)
    isapprox(y0, 0)
    isapprox(x, 3.414213)
    isapprox(y, 2.2204e-16)
    isapprox(Math.atan2(y0, x0), 0)
})

test('example inputs 8 with different phase', () => {
    const data = new Uint32Array([2 + Math.SQRT1_2, 3, 2 + Math.SQRT1_2, 2, 2 - Math.SQRT1_2, 1, 2 - Math.SQRT1_2, 2]),
        [x0, y0] = fft0(data),
        x = data[0]
            + data[1] * Math.SQRT1_2
            - data[3] * Math.SQRT1_2
            - data[4]
            - data[5] * Math.SQRT1_2
            + data[7] * Math.SQRT1_2,
        y = data[1] * Math.SQRT1_2
            + data[2]
            + data[3] * Math.SQRT1_2
            - data[5] * Math.SQRT1_2
            - data[6]
            - data[7] * Math.SQRT1_2

    isapprox(x0, x)
    isapprox(y0, y)
    isapprox(x, 2.4142135)
    isapprox(y, 2.4142135)
    isapprox(Math.atan2(y0, x0), Math.PI / 4)
})


