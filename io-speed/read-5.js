import { createReadStream } from 'fs'

const startTime = Date.now()
createReadStream('tmp.dat', { highWaterMark: 256 * 1024 * 1024 }).on('data', () => {

}).on('end', () => {
    const elapsedTime = Date.now() - startTime
    console.log(`${elapsedTime} ms, ${Math.trunc(256 / (1e-3 * elapsedTime))} MBps`)
})