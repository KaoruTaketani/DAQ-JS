import { createReadStream } from 'fs'
import filePath from './filePath.js'

const s8 = createReadStream(filePath(), { highWaterMark: 8 }).on('data', chunk => {
    console.log(chunk.length)
    console.log([0, 1, 2, 3, 4, 5, 6, 7].map(i => chunk[i].toString(16)).join(','))
    s8.destroy()
}).on('close', () => {
    console.log('s8 close')
    const s64 = createReadStream(filePath(), { highWaterMark: 8 }).on('data', chunk => {
        const view = new DataView(
            chunk.buffer,
            chunk.byteOffset,
            chunk.byteLength)
        console.log(view.getUint32(0, false).toString(16))
        console.log(view.getUint32(4, false).toString(16))

        s64.destroy()
    })
}).on('close', () => {
    console.log('s64 close')
})
