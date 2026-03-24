import { createReadStream } from 'fs'
import filePath from './filePath.js'

const s8 = createReadStream(filePath(), { highWaterMark: 8 }).on('data', chunk => {
    console.log(chunk.length)
    console.log([0, 1, 2, 3, 4, 5, 6, 7].reverse().map(i => chunk[i].toString(16)).join(','))
    s8.destroy()
}).on('close', () => {
    console.log('s8 close')
    const s64 = createReadStream(filePath(), { highWaterMark: 8 }).on('data', chunk => {
        const arr = new BigUint64Array(
            chunk.buffer,
            chunk.byteOffset,
            chunk.length / BigUint64Array.BYTES_PER_ELEMENT)
        console.log(arr.length)
        console.log(arr[0].toString(16))

        s64.destroy()
    })
}).on('close', () => {
    console.log('s64 close')
})
