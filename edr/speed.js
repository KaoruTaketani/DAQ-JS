import { createReadStream, readFile, statSync } from 'fs'

const filePath = '../../edr/20230420/rpmt_run2.edr'

console.log(`fileSize: ${statSync(filePath).size.toLocaleString()} bytes`)

const startTime = Date.now()

createReadStream(filePath).on('data', _ => {
}).on('end', () => {
    const elapsedTime = Date.now() - startTime
    console.log(`createReadString elapsedTime: ${elapsedTime} ms`)

    readFile(filePath, (err, data) => {
        if (err) throw err

        console.log(`readFile elapasedTime: ${Date.now() - startTime - elapsedTime}ms`)
    })
})
