import { createReadStream, readFile, statSync } from 'fs'
import { performance } from 'perf_hooks'
import filePath from './filePath.js'

console.log(`fileSize: ${statSync(filePath()).size.toLocaleString()} bytes`)

let events = []

performance.mark('start')
createReadStream(filePath()).on('data', chunk => {
    for (let i = 0; i < chunk.length / 8; ++i) {
        if (chunk[8 * i] === 0x5a) {
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
    performance.mark('stream')

    console.log(`stream events.length: ${events.length.toLocaleString()}, duration: ${performance.measure('', 'start', 'stream').duration} ms`)

    events = []

    readFile(filePath(), (err, data) => {
        if (err) throw err

        for (let i = 0; i < data.length / 8; ++i) {
            if (data[8 * i] == 0x5a) {
                const i1 = data[8 * i + 1],
                    i2 = data[8 * i + 2],
                    i3 = data[8 * i + 3],
                    i4 = data[8 * i + 4],
                    i5 = data[8 * i + 5],
                    i6 = data[8 * i + 6],
                    i7 = data[8 * i + 7],
                    time = ((i1 << 16) + (i2 << 8) + i3) * 25, /** time bin is 25 nsec */
                    channel = i4 & 0x7,
                    left = (i5 << 4) + (i6 >> 4),
                    right = ((i6 & 0xf) << 8) + i7
            }
        }
        performance.mark('buffer')
        console.log(`buffer events.length: ${events.length.toLocaleString()}, duration: ${performance.measure('','stream','buffer').duration} ms`)
    })
})
