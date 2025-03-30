import { readFile } from 'fs'

const startTime = Date.now()
readFile('tmp.dat', err => {
    if (err) throw err

    const elapsedTime = Date.now() - startTime
    console.log(`${elapsedTime} ms, ${Math.trunc(256 / (1e-3 * elapsedTime))} MBps`)
})