import { createReadStream, readFile, statSync } from 'fs'
import filePath from './filePath.js'

console.log(`fileSize: ${statSync(filePath()).size.toLocaleString()} bytes`)

let count = 0

performance.mark('start')
createReadStream(filePath()).on('data', chunk => {
    for (let i = 0; i < chunk.length / 8; ++i) {
        if (chunk.readUint8(8 * i) === 0x5c) {
            const i1 = chunk.readUint8(8 * i + 1),
                i2 = chunk.readUint8(8 * i + 2),
                i3 = chunk.readUint8(8 * i + 3),
                i4 = chunk.readUint8(8 * i + 4),
                mlftime = ((i1 << 24) + (i2 << 16) + (i3 << 8) + i4) >> 2
            count++
        }
    }
}).on('end', () => {
    performance.mark('stream')
    console.log(`stream count: ${count.toLocaleString()}, duration: ${performance.measure('', 'start', 'stream').duration} ms`)
    count = 0

    readFile(filePath(), (err, data) => {
        if (err) throw err

        for (let i = 0; i < data.length / 8; ++i) {
            if (data.readUint8(8 * i) == 0x5c) {
                const i1 = data.readUint8(8 * i + 1),
                    i2 = data.readUint8(8 * i + 2),
                    i3 = data.readUint8(8 * i + 3),
                    i4 = data.readUint8(8 * i + 4),
                    mlftime = ((i1 << 24) + (i2 << 16) + (i3 << 8) + i4) >> 2
                count++
            }
        }
        performance.mark('buffer')
        console.log(`buffer count: ${count.toLocaleString()}, duration: ${performance.measure('', 'stream', 'buffer').duration} ms`)
    })
})
