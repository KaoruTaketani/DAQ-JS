import { createServer } from 'net'
import randn from './randn.js'
import txy2edr from './txy2edr.js'

createServer().on('connection', socket => {
    console.log('server connection')

    socket.on('close', () => {
        console.log('socket close')
    }).on('data', data => {
        console.log('socket data')

        if (data.readUint8(0) !== 0xa3) return

        const kickerEvent = Buffer.from([
            0x5b, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ])
        // totalLength === eventLength * 2 + 4 in bytes
        //  event length is 4 per event?
        // 12 == 4*1*2 + 4                 
        // so events.length/2 seems to be assigned to eventLength?
        // 1 event 8byte -> 4
        // 3 event 3*8 = 24 byte -> 12
        // i.e #event*4 is necessary?
        // kicker event: 4, neutron event: 8
        // if length is less than 256, following code seems to be usable
        //  Buffer.from(new Uint8Array([120]).buffer)
        // so can less than 2**16==65,536 Uint16Array can be used?
        // const eventLength = Buffer.from([0x00, 0x00, 0x00, 0x04])
        // socket.write(Buffer.concat([eventLength, kickerEvent]))?
        // const eventLength = Buffer.from([0x00, 0x00, 0x00, 0x0c])

        const n = Math.round(1_000 * Math.random()),
            v3 = randn(n, 3)
        const len = (1 + 2 * n) * 4 // 1 neutron event needs 2 channel events
        const eventLength = Buffer.from(new Uint8Array([0, 0, len >> 8, len]).buffer)

        const meanX = 0.5
        const meanY = 0.5
        socket.write(Buffer.concat([
            eventLength, kickerEvent,
            Buffer.concat(v3.map(v =>
                txy2edr(Math.ceil(Math.hypot(v[0], v[1], v[2]) * 9_000) * 1_000, meanX, meanY)
            ))
        ]))
    })
}).listen(23)

