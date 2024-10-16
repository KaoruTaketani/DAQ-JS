import { createReadStream } from 'fs'
import filePath from './filePath.js'
import { performance } from 'perf_hooks'

let a = 0,
    b = 0,
    c = 0,
    d = 0
performance.mark('start')
createReadStream(filePath()).on('data', chunk => {
    for (let i = 0; i < chunk.length; ++i) {
        if (chunk[8 * i] === 0x5b) b++
    }
}).on('end', () => {
    performance.mark('8bit')
    console.log(`b: ${b.toLocaleString()}, ${performance.measure('', 'start', '8bit').duration} ms`)
    b = 0
    createReadStream(filePath()).on('data', chunk => {
        const array = new BigUint64Array(
            chunk.buffer,
            chunk.byteOffset,
            chunk.length / BigUint64Array.BYTES_PER_ELEMENT)
        for (let i = 0; i < array.length; ++i) {
            if (array[i] & 0b1n) {
                b++
            }
        }
    }).on('close', () => {
        performance.mark('64bit')
        console.log(`b: ${b.toLocaleString()}, ${performance.measure('', '8bit', '64bit').duration} ms`)
    })
})
