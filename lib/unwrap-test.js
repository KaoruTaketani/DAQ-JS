import isapprox from './isapprox.js'
import { test } from 'node:test'
import unwrap from './unwrap.js'

test('example of matlab unwrap', () => {
    const P = [-1.5723, -1.5747, -1.5790, -1.5852, -1.5922, -1.6044, -1.6269, -1.6998,
        1.7252, 1.5989, 1.5916, 1.5708, 1.5582,
    -4.7838, -4.8143, -4.8456, -4.8764, -4.9002],
        Q = unwrap(P)
    isapprox(Q[0], -1.5723)
    isapprox(Q[1], -1.5747)
    isapprox(Q[2], -1.5790)
    isapprox(Q[3], -1.5852)
    isapprox(Q[4], -1.5922)
    isapprox(Q[5], -1.6044)
    isapprox(Q[6], -1.6269)
    isapprox(Q[7], -1.6998)
    isapprox(Q[8], -4.5580)
    isapprox(Q[9], -4.6843)
    isapprox(Q[10], -4.6916)
    isapprox(Q[11], -4.7124)
    isapprox(Q[12], -4.7250)
    isapprox(Q[13], -4.7838)
    isapprox(Q[14], -4.8143)
    isapprox(Q[15], -4.8456)
    isapprox(Q[16], -4.8764)
    isapprox(Q[17], -4.9002)
})

test('example 2 of matlab unwrap', () => {
    const P1 = [0.00, 0.19, 6.67, 0.59, 0.78],
        Q1 = unwrap(P1)
    isapprox(Q1[0], 0.00)
    isapprox(Q1[1], 0.19)
    isapprox(Q1[2], 0.38681)
    isapprox(Q1[3], 0.59)
    isapprox(Q1[4], 0.78)

    const P2 = [7.07,0.98,1.18,1.37,1.56],
        Q2 = unwrap(P2)
    isapprox(Q2[0], 7.07)
    isapprox(Q2[1], 7.2632)
    isapprox(Q2[2], 7.4632)
    isapprox(Q2[3], 7.6532)
    isapprox(Q2[4], 7.8432)
})
