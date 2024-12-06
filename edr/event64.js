import { createReadStream, readFile, statSync } from 'fs'
import { performance } from 'perf_hooks'
import filePath from './filePath.js'

console.log(`fileSize: ${statSync(filePath()).size.toLocaleString()} bytes`)

let events = 0

performance.mark('start')
createReadStream(filePath()).on('data', chunk => {
    for (let i = 0; i < chunk.length / 8; ++i) {
        if (chunk.readUint8(8 * i) === 0x5a) {
            events++
            const i1 = chunk[8 * i + 1],
                i2 = chunk[8 * i + 2],
                i3 = chunk[8 * i + 3],
                i4 = chunk[8 * i + 4],
                i5 = chunk[8 * i + 5],
                i6 = chunk[8 * i + 6],
                i7 = chunk[8 * i + 7],
                time = ((i1 << 16) + (i2 << 8) + i3) * 25, /** time bin is 25 nsec */
                channel = i4 & 0x7,
                left = (i5 << 4) + (i6 >> 4),
                right = ((i6 & 0xf) << 8) + i7
        }
    }
}).on('end', () => {
    performance.mark('8bit')
    console.log(`8bit events: ${events.toLocaleString()}, ${performance.measure('', 'start', '8bit').duration} ms`)
    events = 0
    createReadStream(filePath()).on('data', chunk => {
        const arr = new BigUint64Array(
            chunk.buffer,
            chunk.byteOffset,
            chunk.length / BigUint64Array.BYTES_PER_ELEMENT)
        const mask24 = 2 ** 24 - 1,
            mask8 = 2 ** 8 - 1,
            mask12 = 2 ** 12 - 1n
        for (let i = 0; i < arr.length; ++i) {
            if ((arr[i] & 0xffn) === 0x5an) {
                events++
                const
                    time = (((arr[i] << 8n) & 0xffffffn) | (arr[i] & 0xffffn) | ((arr[i] >> 8n) & 0xffn)) * 25n, /** time bin is 25 nsec */
                    channel = (arr[i] >> 24n) & 0x7n,
                    left = ((arr[i] >> 36n) & 0xfffn) | ((arr[i] >> 44n)),
                    right = ((arr[i] & 0x0fn) << 8n) | (arr[i] >> 56n)
            }
        }
    }).on('end', () => {
        performance.mark('64bit')
        console.log(`64bit events: ${events.toLocaleString()}, ${performance.measure('', '8bit', '64bit').duration} ms`)
    })
})

