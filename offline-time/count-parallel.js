import { createReadStream } from 'fs'
import { availableParallelism } from 'os'
import { performance } from 'perf_hooks'
import { Worker } from 'worker_threads'
import partition from '../lib/partition.js'
import filePath from './filePath.js'

performance.mark('start')
let a = 0,
    b = 0,
    c = 0,
    d = 0,
    workers = new Array(availableParallelism()).fill(null)
const sharedBuffer = new SharedArrayBuffer(4 * 4)
const sharedArray = new Uint32Array(sharedBuffer)

Promise.all(
    workers.map((_, index) => new Promise(resolve => {
        const worker = new Worker('./count-worker.js', { workerData: sharedBuffer })
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
        console.log(`all exit ${performance.measure('', 'parallel', 'exit').duration}ms`)
    })
    // this is less than 1ms
    // performance.mark('online2')
    // console.log(`all listener ${performance.measure('', 'online', 'online2').duration}ms`)
    createReadStream(filePath(), { highWaterMark: 16 * 1024 * 1024 }).on('data', chunk => {
        // const sharedBuffer = new SharedArrayBuffer(/** @type {Buffer} */(chunk).byteLength)
        // const sharedArray = new Uint8Array(sharedBuffer)
        // workers.forEach((worker, index) => {
        //     const [start, end] = partition(chunk.length / 8, workers.length, index)
        //     // worker.postMessage(chunk.slice(8 * start, 8 * end))
        //     worker.postMessage(chunk.slice(8 * start, 8 * end))
        // })

        for (let i = 0; i < chunk.length / 8; ++i) {
            switch (chunk[8 * i]) {
                case 0x5a:
                    a++
                    break
                case 0x5b:
                    b++
                    break
                case 0x5c:
                    c++
                    break
                default:
                    d++
            }
        }
    }).on('close', () => {
        performance.mark('parallel')
        console.log(`a: ${a.toLocaleString()}, b: ${b.toLocaleString()}, c: ${c.toLocaleString()}, d: ${d.toLocaleString()}, ${performance.measure('', 'online', 'parallel').duration} ms`)
        // console.log(`sharedArray: ${sharedArray}, ${performance.measure('', 'online', 'parallel').duration} ms`)
        workers.forEach(worker => worker.postMessage(null))
        // workers.forEach(worker => worker.terminate())
    })
})

