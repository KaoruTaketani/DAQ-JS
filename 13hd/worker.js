import { Socket } from 'net'
import { parentPort } from 'worker_threads'

let eventLength
let eventData = []
let totalLength = 0

const socket = new Socket()
socket.on('data', chunk => {
    if (eventData.length === 0) {
        eventLength = (chunk.readUint8(2) << 8) + chunk.readUint8(3)
        eventData.push(chunk.slice(4))
    } else {
        eventData.push(chunk)
    }
    totalLength += chunk.length

    if (totalLength === eventLength * 2 + 4) {
        const toParent = Buffer.concat(eventData)
        parentPort.postMessage(toParent, [toParent.buffer])

        totalLength = 0
        eventData = []
        if (!socket.closed)
            socket.write(Buffer.from([0xa3, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]))
    }
})

parentPort.on('message', message => {
    console.log(`message: ${message}`)
    if (message) {
        socket.connect(23, 'localhost', () => {
            socket.write(Buffer.from([0xa3, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]))
        })
    } else {
        socket.end()
    }
})