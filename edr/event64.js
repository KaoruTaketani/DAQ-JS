import { createReadStream, readFile, statSync } from 'fs'
import { performance } from 'perf_hooks'
import filePath from './filePath.js'

console.log(`fileSize: ${statSync(filePath()).size.toLocaleString()} bytes`)

let events = []

performance.mark('start')
createReadStream(filePath()).on('data', chunk => {
    for (let i = 0; i < chunk.length / 8; ++i) {
        if (chunk.readUint8(8 * i) === 0x5a) {
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
        }
    }
}).on('end', () => {
    performance.mark('8bit')
    console.log(`8bit events.length: ${events.length.toLocaleString()}, ${performance.measure('', 'start', '8bit').duration} ms`)

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
            if ((arr[i] & 0xffn) === 0x5an) {
                // const
                //     i1 = (arr[i] >> 8n) & 0xffn,
                //     i2 = (arr[i] >> 16n) & 0xffn,
                //     i3 = (arr[i] >> 24n) & 0xffn,
                //     i4 = (arr[i] >> 32n) & 0xffn,
                //     i5 = (arr[i] >> 40n) & 0xffn,
                //     i6 = (arr[i] >> 48n) & 0xffn,
                //     i7 = (arr[i] >> 56n) & 0xffn,
                //     time = ((i1 << 16n) + (i2 << 8n) + i3) * 25n, /** time bin is 25 nsec */
                //     channel = i4 & 0x7n,
                //     left = (i5 << 4n) + (i6 >> 4n),
                //     right = ((i6 & 0x0fn) << 8n) + i7
                const
                    time = (((arr[i] << 8n) & 0xffffffn) | (arr[i] & 0xffffn) | ((arr[i] >> 8n) & 0xffn)) * 25n, /** time bin is 25 nsec */
                    channel = (arr[i] >>24n)& 0x7n,
                    left = ((arr[i] >> 36n) & 0xfffn) | ((arr[i] >> 44n)),
                    right = ((arr[i] & 0x0fn) << 8n) | (arr[i] >> 56n)
            }
        }
        // console.log(`${chunk.length.toLocaleString()}, ${arr.length.toLocaleString()}`)
    }).on('end', () => {
        performance.mark('64bit')
        console.log(`64bit events.length: ${events.length.toLocaleString()}, ${performance.measure('', '8bit', '64bit').duration} ms`)
    })
})

