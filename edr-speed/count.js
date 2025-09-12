import { createReadStream, readFile } from 'fs'
import filePath from './filePath.js'
import { performance } from 'perf_hooks'

let a = 0,
    b = 0,
    c = 0,
    d = 0
performance.mark('start')
createReadStream(filePath()).on('data', chunk => {
    for (let i = 0; i < chunk.length / 8; ++i) {
        switch (chunk[8 * i]) {
            case 0x5a:
                a++
                break
            case 0x5b:
                b++
                break
            case 0x5c:
                c++
                break
            default:
                d++
        }
    }
}).on('end', () => {
    performance.mark('stream')
    console.log(`a: ${a.toLocaleString()}, b: ${b.toLocaleString()}, c: ${c.toLocaleString()}, d: ${d.toLocaleString()}, ${performance.measure('', 'start', 'stream').duration} ms`)
    a = 0
    b = 0
    c = 0
    d = 0
    readFile(filePath(), (err, data) => {
        if (err) throw err

        for (let i = 0; i < data.length / 8; ++i) {
            switch (data[8 * i]) {
                case 0x5a:
                    a++
                    break
                case 0x5b:
                    b++
                    break
                case 0x5c:
                    c++
                    break
                default:
                    d++
            }
        }
        performance.mark('buffer')
        console.log(`a: ${a.toLocaleString()}, b: ${b.toLocaleString()}, c: ${c.toLocaleString()}, d: ${d.toLocaleString()}, ${performance.measure('', 'stream', 'buffer').duration} ms`)
    })
})
