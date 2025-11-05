import {Worker} from 'worker_threads'
import { createWriteStream } from 'fs'

const ws = createWriteStream('Acq-IntClk-DigRef-Loop.bin')
console.log('Acquiring samples continuously. Press Enter to interrupt')
process.stdin.on('readable',()=>{
    console.log('stop worker')
    worker.postMessage(false)
})
const worker = new Worker('./Acq-IntClk-DigRef-Worker.js')

worker.on('message',data=>{
    console.log(`worker message`)
    ws.write(data)
}).on('online',()=>{
    console.log('worker online')
}).on('exit',exitCode=>{
    console.log(`worker exit. exitCode: ${exitCode}`)
}).on('error',err=>{
    console.log(err)
}).postMessage(true)

