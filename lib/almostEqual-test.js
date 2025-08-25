import { test } from 'node:test'
import almostEqual from './almostEqual.js'

test('matches output of MATLAB', () => {
    almostEqual(123456789e0, 1.2346e8)
    almostEqual(123456789e-1, 1.2346e7)
    almostEqual(123456789e-2, 1.2346e6)
    almostEqual(123456789e-3, 1.2346e5)
    almostEqual(123456789e-4, 1.2346e4)
    almostEqual(123456789e-5, 1234.6)
    almostEqual(123456789e-6, 123.46)
    almostEqual(123456789e-7, 12.346)
    almostEqual(123456789e-8, 1.2346)
    almostEqual(123456789e-9, 0.12346)
    almostEqual(123456789e-10, 0.012346)
    almostEqual(123456789e-11, 1.2346e-3)
    almostEqual(123456789e-12, 1.2346e-4)
    almostEqual(123456789e-13, 1.2346e-5)
    almostEqual(123456789e-14, 1.2346e-6)
    almostEqual(123456789e-15, 1.2346e-7)
})
