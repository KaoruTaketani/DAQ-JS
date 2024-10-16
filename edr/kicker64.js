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
    performance.mark('uint8')
    console.log(`uint8 count: ${count.toLocaleString()}, duration: ${performance.measure('', 'start', 'uint8').duration} ms`)
    count = 0
    createReadStream(filePath(), { highWarterMark: 64 * 1024 }).on('data', chunk => {
        // const biguint64array = new BigUint64Array(
        //     chunk.buffer,
        //     chunk.byteOffset,
        //     chunk.length / BigUint64Array.BYTES_PER_ELEMENT);
        // biguint64array.forEach(elem => {
        //     // const tmp = BigInt.asUintN(8, elem >> 56n)
        //     // if (count === 0) console.log(tmp.toString(2))
        //     // if (tmp === 0x5b) count++
        // })
        for (let i = 0; i < chunk.length / 8; ++i) {
            chunk.readBigUint64BE(8 * i)
        }
    }).on('end', () => {
        performance.mark('bit')
        console.log(`stream count: ${count.toLocaleString()}, duration: ${performance.measure('', 'uint8', 'bit').duration} ms`)
    })
})