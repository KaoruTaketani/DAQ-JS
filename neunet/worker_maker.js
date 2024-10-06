import { Worker } from 'worker_threads'

const worker = new Worker('./worker.js')
worker.on('message', data => {
    console.log(`data.length: ${data.length}`)
})

worker.postMessage(true)

setTimeout(() => {
    worker.postMessage(false)
}, 1000)
