import { parentPort } from 'worker_threads'
import { Buffer } from 'buffer'

const lengths = new Array(10).fill(0).map(_ => Math.trunc(256 * 1024 * 1024 * Math.random()))
lengths.forEach(length => {
    const buf = Buffer.alloc(length)
    console.log(`allocated length: ${length.toLocaleString()}, heapUsed: ${process.memoryUsage().heapUsed.toLocaleString()}, arrayBuffers: ${process.memoryUsage().arrayBuffers.toLocaleString()}, rss: ${process.memoryUsage().rss.toLocaleString()}`)
    // parentPort.postMessage(buf)
    parentPort.postMessage(buf, [buf.buffer])
})
console.log('worker done')

