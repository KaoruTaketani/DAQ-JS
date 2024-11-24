import { createReadStream } from 'fs'

const startTime = Date.now()
createReadStream('tmp.dat', { highWaterMark: 256 * 1024 * 1024 }).on('data', () => {

}).on('end', () => {
    console.log(`${Date.now() - startTime} ms`)
})