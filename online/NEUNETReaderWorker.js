import { ok } from 'assert'
import { Socket } from 'net'
import { parentPort } from 'worker_threads'

/** @type {number} */
let eventLength
/** @type {Buffer[]} */
let chunkArray = []
/** @type {number} */
let totalLength = 0

const neunetReaderSocket = new Socket()
neunetReaderSocket.on('data', chunk => {
    if (chunkArray.length === 0) {
        eventLength = (chunk[2] << 8) + chunk[3]
        chunkArray.push(chunk.subarray(4))
    } else {
        chunkArray.push(chunk)
    }
    totalLength += chunk.length

    if (totalLength === eventLength * 2 + 4) {
        // console.log(`data ${totalLength.toLocaleString()} bytes`)
        // variables.eventBuffer.assign(Buffer.concat(chunkArray))
        ok(parentPort)
        const toParent = Buffer.concat(chunkArray)
        parentPort.postMessage(toParent, [toParent.buffer])
        totalLength = 0
        chunkArray = []

        if (!neunetReaderSocket.closed)
            neunetReaderSocket.write(Buffer.from([0xa3, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]))
    }
}).on('close', () => {
    console.log('neunetReaderSocket close')
}).on('error', err => {
    console.log('neunetReaderSocket error')
    console.log(err)
})

ok(parentPort)
parentPort.on('message', message => {
    console.log(`worker message: ${message}`)
    if (message === true) {
        // neunetReaderIsBusy = true
        neunetReaderSocket.connect(23, 'localhost', () => {
            neunetReaderSocket.write(Buffer.from([0xa3, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]))
        })
    } else if (message === false) {
        // neunetReaderIsBusy = false
        ok(parentPort)
        parentPort.postMessage(Buffer.from([]))
        neunetReaderSocket.end()
    } else {

    }
}).on('close', () => {
    console.log(`terminated by the parent`)
})

