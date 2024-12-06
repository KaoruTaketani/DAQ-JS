import { Worker } from 'worker_threads'

const worker = new Worker('./worker.js')
worker.on('message', data => {
    console.log(`data.length: ${data.length.toLocaleString()}, heapUsed: ${process.memoryUsage().heapUsed.toLocaleString()}, arrayBuffers: ${process.memoryUsage().arrayBuffers.toLocaleString()}, rss: ${process.memoryUsage().rss.toLocaleString()}`)
    for (let i = 0; i < 1e9; ++i) { }
})

worker.on('exit', code => {
    console.log(`worker exit code: ${code}`)
})
