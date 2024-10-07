import { createReadStream, readFile, statSync } from 'fs'
import { performance } from 'perf_hooks'

const filePath = '../../edr/20230420/rpmt_run2.edr'

console.log(`fileSize: ${statSync(filePath).size.toLocaleString()} bytes`)

performance.mark('start')
createReadStream(filePath).on('data', _ => {
}).on('end', () => {
    performance.mark('stream')
    console.log(`stream duration: ${performance.measure('', 'start', 'stream').duration} ms`)

    readFile(filePath, (err, data) => {
        if (err) throw err

        performance.mark('buffer')
        console.log(`buffer duration: ${performance.measure('', 'stream', 'buffer').duration} ms`)
    })
})
