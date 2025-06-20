import { Server } from 'net'
import { ok } from 'assert'

const server = new Server({})
/** @type {NodeJS.Timeout} */
let interval
/** @type {boolean} */
let isBusy = false
/** @type {Map<number,number>} */
const pulses = new Map()
pulses.set(0, 30)
pulses.set(1, -50)

server.maxConnections = 1
server.on('connection', socket => {
    socket.setEncoding('utf8')
    socket.on('data', (/** @type {string} */data) => {
        console.log(`data: ${data}`)
        if (data === 'remote?:') {
            socket.write('ok 0')
            return
        }
        if (data.toString().startsWith('move_to:')) {
            const channel = parseInt(data.split(':')[1]),
                destination = parseInt(data.split(' ')[1])
            if (!pulses.has(channel)) {
                socket.write('ng')
                return
            }

            if (Number.isNaN(destination)) {
                socket.write('ng')
                return
            }

            socket.write('ok')
            isBusy = true
            interval = setInterval(() => {
                const pulse = pulses.get(channel)
                ok(pulse)
                console.log(pulse)
                if (pulse < destination) {
                    pulses.set(channel, pulse + 1)
                } else if (pulse > destination) {
                    pulses.set(channel, pulse - 1)
                } else {
                    isBusy = false
                    clearInterval(interval)
                }
            }, 10)
            return
        }
        if (data.startsWith('stop:')) {
            socket.write('ok')
            isBusy = false
            clearInterval(interval)
        }
        if (data.startsWith('pulse?:')) {
            const channel = parseInt(data.split(':')[1])

            if (!pulses.has(channel)) {
                socket.write('ng')
                return
            }

            socket.write(`ok ${pulses.get(channel)} ${isBusy ? 1 : 0}`)
            return
        }
        socket.write('ng')
    }).on('close', () => {
        console.log('close')
    })
}).listen(23)
