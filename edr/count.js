import { createReadStream } from 'fs'
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
    performance.mark('8bit')
    console.log(`a: ${a.toLocaleString()}, b: ${b.toLocaleString()}, c: ${c.toLocaleString()}, d: ${d.toLocaleString()}, ${performance.measure('', 'start', '8bit').duration} ms`)
    a = 0
    b = 0
    c = 0
    d = 0
    createReadStream(filePath()).on('data', chunk => {
        const array = new BigUint64Array(
            chunk.buffer,
            chunk.byteOffset,
            chunk.length / BigUint64Array.BYTES_PER_ELEMENT)
        for (let i = 0; i < array.length; ++i) {
            if (array[i] & 0b1n) {
                b++
            } else {
                if (array[i] & 0b10n) {
                    a++
                } else {
                    c++
                }
            }
        }
    }).on('close', () => {
        performance.mark('64bit')
        console.log(`a: ${a.toLocaleString()}, b: ${b.toLocaleString()}, c: ${c.toLocaleString()}, d: ${d.toLocaleString()}, ${performance.measure('', '8bit', '64bit').duration} ms`)
    })
})
