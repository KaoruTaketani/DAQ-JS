import { createReadStream, readFile, statSync } from 'fs'
import { performance } from 'perf_hooks'
import filePath from './filePath.js'

console.log(`fileSize: ${statSync(filePath()).size.toLocaleString()} bytes`)

let events = []

performance.mark('start')
createReadStream(filePath()).on('data', chunk => {
    for (let i = 0; i < chunk.length / 8; ++i) {
        // if (chunk.readUint8(8 * i) === 0x5a) {
        // const i1 = chunk.readUint8(8 * i + 1),
        // i2 = chunk.readUint8(8 * i + 2),
        // i3 = chunk.readUint8(8 * i + 3),
        // i4 = chunk.readUint8(8 * i + 4),
        // i5 = chunk.readUint8(8 * i + 5),
        // i6 = chunk.readUint8(8 * i + 6),
        // i7 = chunk.readUint8(8 * i + 7)
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

        //     events.push({
        //         channel: channel,
        //         time: time,
        //         left: left,
        //         right: right
        //     })
        // }
    }
}).on('end', () => {
    performance.mark('uint8')

    console.log(`uint8 events.length: ${events.length.toLocaleString()}, duration: ${performance.measure('', 'start', 'uint8').duration} ms`)

    events = []
    createReadStream(filePath()).on('data', chunk => {
        for (let i = 0; i < chunk.length / 8; ++i) {
            chunk.readBigInt64BE(8 * i)
        }
    }).on('end', () => {
        performance.mark('bigint')
        console.log(`bigint events.length: ${events.length.toLocaleString()}, duration: ${performance.measure('', 'uint8', 'bigint').duration} ms`)

        createReadStream(filePath()).on('data', chunk => {
            const arr = new BigUint64Array(
                chunk.buffer,
                chunk.byteOffset,
                chunk.length / BigUint64Array.BYTES_PER_ELEMENT)
            // arr.forEach(e => { })
            const mask24 = 0xffffffn,
                mask8 = 0xffn,
                mask12 = 0b111111111111n
            for (let i = 0; i < arr.length; ++i) {
                // ((i1 << 16) + (i2 << 8) + i3) * 25, /** time bin is 25 nsec */
                const time = (arr[i] >> 32n) & mask24,
                    // channel = i4 & 0x7,
                    channel = (arr[i] >> 24n) & mask8,
                    // left = (i5 << 4) + (i6 >> 4),
                    left = (arr[i] >> 16n) & mask12,
                    // right = ((i6 & 0xf) << 8) + i7
                    right = arr[i] & mask12

            }
            // console.log(`${chunk.length.toLocaleString()}, ${arr.length.toLocaleString()}`)
        }).on('end', () => {
            performance.mark('typed')
            console.log(`typed events.length: ${events.length.toLocaleString()}, duration: ${performance.measure('', 'bigint', 'typed').duration} ms`)
        })
    })
})
