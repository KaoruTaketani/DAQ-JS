import { test } from 'node:test'
import { ok } from 'assert'

test('generation performance by fill', () => {
    const startTime = Date.now()
    const length = 1_000_000
    const v = new Array(length).fill(0).map(_ => Math.random())
    ok(v)
    // console.log(v)
    // console.log(`elapsedTime: ${Date.now() - startTime}ms`)
    ok(Date.now() - startTime < 100)
})

test('generation performace by push', () => {
    const startTime = Date.now()
    const v = []
    const length = 1_000_000
    for (let i = 0; i < length; ++i) {
        v.push(Math.random())
    }
    // console.log(v)
    // console.log(`elapsedTime: ${Date.now() - startTime}ms`)
    ok(Date.now() - startTime < 100)
})
test('generation performace for 2dim', () => {
    const startTime = Date.now()
    const v = []
    const length = 1_000_000
    for (let i = 0; i < length; ++i) {
        v.push([Math.random(),Math.random()])
    }
    // console.log(v)
    // console.log(`elapsedTime: ${Date.now() - startTime}ms`)
    ok(Date.now() - startTime < 100)
})
test('generation performace for 2 arrays', () => {
    const startTime = Date.now()
    const x = [], y = []
    const length = 1_000_000
    for (let i = 0; i < length; ++i) {
        x.push(Math.random())
        y.push(Math.random())
    }
    // console.log(v)
    // console.log(`elapsedTime: ${Date.now() - startTime}ms`)
    ok(Date.now() - startTime < 100)
})
