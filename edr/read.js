import { createReadStream, readFile, statSync } from 'fs'
import { performance } from 'perf_hooks'

const filePath = '../../edr/20230420/rpmt_run2.edr'

console.log(`fileSize: ${statSync(filePath).size.toLocaleString()} bytes`)

performance.mark('start')
createReadStream(filePath).on('data', _ => {
}).on('end', () => {
    performance.mark('createReadStream')
    console.log(`createReadString elapsedTime: ${performance.measure('', 'start', 'createReadStream').duration} ms`)

    readFile(filePath, (err, data) => {
        if (err) throw err

        performance.mark('readFile')
        console.log(`readFile elapasedTime: ${performance.measure('', 'createReadStream', 'readFile').duration}ms`)
    })
})
