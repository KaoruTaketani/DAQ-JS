import { createWriteStream, statSync } from 'fs'

const
    totalLength = 1024,
    // totalLength = 64 * 1024,
    // totalLength = 128 * 1024,
    chunkLength = 128,
    // chunkLength = 1024,
    data = new Float64Array(totalLength)
let offset = 0
let drainCount = 0
for (let i = 0; i < totalLength; ++i) data[i] = Math.random()

const s = createWriteStream('../../tmp', {
    encoding: 'binary'
}).on('drain', () => {
    console.log('drain')
    drainCount++
    interval = setInterval(f)
}).on('end', () => {
    console.log('end')
}).on('finish', () => {
    console.log('finish')
    console.log(`${statSync('../../tmp').size}, ${8 * totalLength} bytes, drainCount: ${drainCount}, elapsedTime: ${Date.now() - startTime} ms, rate: ${1000 * 8 * totalLength / (Date.now() - startTime) / 1024 / 1024} MB/s`)
    clearInterval(interval)
}).on('close', () => {
    console.log('close')
}).on('error', () => {
    console.log('error')
})

const f = () => {
    console.log(`offset: ${offset}, ${totalLength}`)
    if (offset === totalLength) {
        s.end()
    } else {
        if (!s.write(data.subarray(offset, offset + chunkLength))) {
            console.log('write returns false')
            clearInterval(interval)
        }
        // even when write returns false, the data seems to be written before drain event
        offset += chunkLength
    }
}
const startTime = Date.now()
let interval = setInterval(f)
