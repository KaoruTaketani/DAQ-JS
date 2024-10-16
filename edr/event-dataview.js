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
    console.log(`8bit events: ${events.toLocaleString()}, ${performance.measure('', 'start', '8bit').duration} ms`)
    events = 0
    createReadStream(filePath()).on('data', chunk => {
        const view = new DataView(
            chunk.buffer,
            chunk.byteOffset,
            chunk.byteLength)
        for (let i = 0; i < chunk.length / 8; ++i) {
            if (chunk.readUint8(8 * i) === 0x5a) {
                events++
                // const i1 = chunk.readUint8(8 * i + 1),
                // i2 = chunk.readUint8(8 * i + 2),
                // i3 = chunk.readUint8(8 * i + 3),
                // i4 = chunk.readUint8(8 * i + 4),
                // i5 = chunk.readUint8(8 * i + 5),
                // i6 = chunk.readUint8(8 * i + 6),
                // i7 = chunk.readUint8(8 * i + 7)
                const
                    i4 = chunk[8 * i + 4],
                    i5 = chunk[8 * i + 5],
                    i6 = chunk[8 * i + 6],
                    i7 = chunk[8 * i + 7],
                    time = (view.getUint32(8 * i, false) >> 8) * 25, /** time bin is 25 nsec */
                    channel = i4 & 0x7,
                    tmp = (view.getUint32(8 * i + 4, false)) & 0xffffff, // mask top 8 bit
                    left = tmp >> 12,
                    right = tmp & 0b111111111111 

                //     events.push({
                //         channel: channel,
                //         time: time,
                //         left: left,
                //         right: right
                //     })
            }
        }
    }).on('end', () => {
        performance.mark('dataview')
        console.log(`dataview events: ${events.toLocaleString()}, ${performance.measure('', '8bit', 'dataview').duration} ms`)
    })
})

