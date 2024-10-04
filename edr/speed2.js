import { createReadStream, readFile, statSync } from 'fs'

const filePath = '../../edr/20230420/rpmt_run2.edr'

console.log(`fileSize: ${statSync(filePath).size.toLocaleString()}bytes`)

const startTime = Date.now()
let count = 0

createReadStream(filePath).on('data', chunk => {
    for (let i = 0; i < chunk.length / 8; ++i) {
        if (chunk.readUint8(8 * i) === 0x5b) count++
    }
}).on('end', () => {
    const elapsedTime = Date.now() - startTime
    console.log(`createReadString kickerCount: ${count.toLocaleString()}, elapsedTime: ${elapsedTime}ms`)
    count = 0
    readFile(filePath, (err, data) => {
        if (err) throw err

        for (let i = 0; i < data.length / 8; ++i) {
            if (data.readUint8(8 * i) == 0x5b) count++
        }
        console.log(`readFile kickerCount: ${count.toLocaleString()} elapasedTime: ${Date.now() - startTime - elapsedTime}ms`)
    })
})
