import { Worker } from 'worker_threads'

const worker = new Worker('./worker.js')
worker.on('message', data => {
    console.log(`data.length: ${data.length}`)
})
worker.on('online', () => {
    console.log('worker online')

    worker.postMessage(true)

    setTimeout(() => {
        worker.postMessage(false)
    }, 100)
})
worker.on('messageerror', err => {
    console.log(`worker messageerror. err: ${JSON.stringify(err)}`)
})
worker.on('error', err => {
    console.log(`worker error. err: ${JSON.stringify(err)}`)
})
worker.on('exit', exitCode => {
    //If the worker was terminated, the exitCode parameter is 1.
    console.log(`worker exit. exitCode: ${exitCode}`)
})


