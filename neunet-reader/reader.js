import { Socket } from 'net'

let eventLength
let eventData = []
let totalLength = 0
let i = 0

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
        i++
        if (i > 10) {
            socket.end()
        } else {
            console.log(`data.length: ${eventLength}`)
            totalLength = 0
            eventData = []
            socket.write(Buffer.from([0xa3, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]))
        }
    }
}).connect(23, 'localhost', () => {
    socket.write(Buffer.from([0xa3, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]))
})