import { test } from 'node:test'
import almostEqual from './almostEqual.js'
import fft0 from './fft0.js'

test('example inputs 8', () => {
    const data = new Uint32Array([3, 2 + Math.SQRT1_2, 3, 2, 1, 2 - Math.SQRT1_2, 1, 2]),
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

    almostEqual(x0, x)
    almostEqual(y0, y)
})

