import { Worker } from 'worker_threads'
import { availableParallelism } from 'os'
import { createReadStream } from 'fs'
import filePath from './filePath.js'
import { performance } from 'perf_hooks'

performance.mark('start')
let a = 0,
    b = 0,
    c = 0,
    d = 0,
    workers = new Array(availableParallelism()).fill(null)

Promise.all(
    workers.map((_, index) => new Promise(resolve => {
        const worker = new Worker('./count-worker.js')
        worker.on('online', () => {
            workers[index] = worker
            console.log(`worker${index} online`)
            resolve()
        })
    }))
).then(() => {
    performance.mark('online')
    console.log(`all online ${performance.measure('', 'start', 'online').duration}ms`)
    Promise.all(
        workers.map((worker, index) => new Promise(resolve => {
            worker.on('exit', () => {
                workers[index] = null
                console.log(`worker${index} exit`)
                resolve()
            })
        }))
    ).then(() => {
        performance.mark('exit')
        console.log(`all exit ${performance.measure('', 'online', 'exit').duration}ms`)
    })
    // this is less than 1ms
    // performance.mark('online2')
    // console.log(`all listener ${performance.measure('', 'online', 'online2').duration}ms`)
    workers.forEach(worker => worker.terminate())
})
// workers.forEach((_, index) => {
//     worker.on('online', () => {
//         workers[index] = worker
//         console.log(`worker${index} online`)
//         if (workers.filter(worker => worker === null).length === 0) {

//             performance.mark('worker')
//             console.log(`all workers online. numWorkers: ${availableParallelism()} ${performance.measure('', 'start', 'worker').duration} ms`)
//             createReadStream(filePath(), { highWaterMark: 16 * 1024 * 1024 }).on('data', chunk => {
//                 for (let i = 0; i < chunk.length / 8; ++i) {
//                     switch (chunk[8 * i]) {
//                         case 0x5a:
//                             a++
//                             break
//                         case 0x5b:
//                             b++
//                             break
//                         case 0x5c:
//                             c++
//                             break
//                         default:
//                             d++
//                     }
//                 }
//             }).on('close', () => {
//                 performance.mark('serial')
//                 console.log(`a: ${a.toLocaleString()}, b: ${b.toLocaleString()}, c: ${c.toLocaleString()}, d: ${d.toLocaleString()}, ${performance.measure('', 'worker', 'serial').duration} ms`)
//                 a = 0
//                 b = 0
//                 c = 0
//                 d = 0
//                 createReadStream(filePath(), { highWaterMark: 16 * 1024 * 1024 }).on('data', chunk => {
//                     for (let i = 0; i < chunk.length / 8; ++i) {
//                         switch (chunk[8 * i]) {
//                             case 0x5a:
//                                 a++
//                                 break
//                             case 0x5b:
//                                 b++
//                                 break
//                             case 0x5c:
//                                 c++
//                                 break
//                             default:
//                                 d++
//                         }
//                     }
//                 }).on('close', () => {
//                     performance.mark('parallel')
//                     console.log(`a: ${a.toLocaleString()}, b: ${b.toLocaleString()}, c: ${c.toLocaleString()}, d: ${d.toLocaleString()}, ${performance.measure('', 'serial', 'parallel').duration} ms`)
//                     workers[index].terminate()
//                 })
//             })
//         }
//     }).on('exit', () => {
//         console.log(`worker${index} exit`)
//         workers[index] = null
//         if (workers.filter(worker => worker === null).length === 0) {
//             performance.mark('shutdown')
//             console.log(`shutdown completed ${performance.measure('', 'parallel', 'shutdown').duration} ms`)
//             process.exit()
//         }
//     })
// })

