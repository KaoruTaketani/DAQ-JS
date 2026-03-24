import { createReadStream, readFile, statSync } from 'fs'
import { performance } from 'perf_hooks'
import filePath from './filePath.js'

console.log(`fileSize: ${statSync(filePath()).size.toLocaleString()} bytes`)

let count = 0

performance.mark('start')
createReadStream(filePath(), { highWarterMark: 64 * 1024 }).on('data', chunk => {
    for (let i = 0; i < chunk.length / 8; ++i) {
        if (chunk.readUint8(8 * i) === 0x5b) count++
    }
}).on('end', () => {
    performance.mark('stream')
    console.log(`stream count: ${count.toLocaleString()}, duration: ${performance.measure('', 'start', 'stream').duration} ms`)
    count = 0
    readFile(filePath(), (err, data) => {
        if (err) throw err

        performance.mark('end')
        for (let i = 0; i < data.length / 8; ++i) {
            if (data.readUint8(8 * i) == 0x5b) count++
        }
        performance.mark('buffer')
        console.log(`buffer count: ${count.toLocaleString()}, duration: ${performance.measure('', 'stream', 'buffer').duration} ms`)
    })
})
