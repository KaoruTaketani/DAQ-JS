import { createReadStream, readFile, statSync } from 'fs'
import { performance } from 'perf_hooks'

const filePath = '../../edr/20230420/rpmt_run2.edr'

console.log(`fileSize: ${statSync(filePath).size.toLocaleString()} bytes`)

const startTime = Date.now()
performance.mark('start')
createReadStream(filePath).on('data', _ => {
}).on('end', () => {
    const elapsedTime = Date.now() - startTime
    console.log(`createReadString elapsedTime: ${elapsedTime} ms`)
    performance.mark('1')

    readFile(filePath, (err, data) => {
        if (err) throw err

        performance.mark('2')
        console.log(`readFile elapasedTime: ${Date.now() - startTime - elapsedTime}ms`)
        const streaming = performance.measure('createReadString', 'start', '1')
        const buffering = performance.measure('readFile', '1', '2')
        console.log(streaming.duration)
        console.log(buffering.duration)
    })
})
