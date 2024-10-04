import { createReadStream, readFile, statSync } from 'fs'

const filePath = '../../edr/20230420/rpmt_run2.edr'

console.log(`fileSize: ${statSync(filePath).size.toLocaleString()} bytes`)

const startTime = Date.now()
const times = []

createReadStream(filePath).on('data', chunk => {
    for (let i = 0; i < chunk.length / 8; ++i) {
        if (chunk.readUint8(8 * i) === 0x5c) {
            const i1 = chunk.readUint8(8 * i + 1),
                i2 = chunk.readUint8(8 * i + 2),
                i3 = chunk.readUint8(8 * i + 3),
                i4 = chunk.readUint8(8 * i + 4),
                second = ((i1 << 24) + (i2 << 16) + (i3 << 8) + i4) >> 2
            times.push(second)
        }
    }
}).on('end', () => {
    const elapsedTime = Date.now() - startTime
    console.log(`createReadString times.length: ${times.length.toLocaleString()}, elapsedTime: ${elapsedTime} ms`)

    times.splice(0)

    readFile(filePath, (err, data) => {
        if (err) throw err

        for (let i = 0; i < data.length / 8; ++i) {
            if (data.readUint8(8 * i) == 0x5c) {
                const i1 = data.readUint8(8 * i + 1),
                    i2 = data.readUint8(8 * i + 2),
                    i3 = data.readUint8(8 * i + 3),
                    i4 = data.readUint8(8 * i + 4),
                    second = ((i1 << 24) + (i2 << 16) + (i3 << 8) + i4) >> 2
                times.push(second)
            }
        }
        console.log(`readFile times.length: ${times.length.toLocaleString()} elapasedTime: ${Date.now() - startTime - elapsedTime} ms`)
    })
})
