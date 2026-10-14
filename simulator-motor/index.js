import { Server } from 'net'
import { ok } from 'assert'

const server = new Server({})
/** @type {NodeJS.Timeout} */
let interval
/** @type {boolean} */
let isBusy = false
/** @type {Map<string,number>} */
const pulses = new Map()
pulses.set('A:5', 30)
pulses.set('A:6', -50)

server.maxConnections = 1
server.on('connection', socket => {
    socket.setEncoding('utf8')
    socket.on('data', (/** @type {string} */data) => {
        console.log(`data: ${data}`)
        if (data.startsWith('remote?:')) {
            socket.write('ok 0')
            return
        }
        if (data.toString().startsWith('move_to:')) {
            const channel = data.split(' ')[0].substring(data.indexOf(':') + 1)
            const relativeFlag = data.split(' ')[1]
            let destination = parseInt(data.split(' ')[2])
            if (!pulses.has(channel)) {
                socket.write('ng')
                return
            }

            if (relativeFlag !== '1' && relativeFlag !== '2') {
                socket.write('ng')
                return
            }

            if (Number.isNaN(destination)) {
                socket.write('ng')
                return
            }

            socket.write('ok')
            isBusy = true
            if (relativeFlag === '1') {
                destination = pulses.get(channel) + destination
            }
            interval = setInterval(() => {
                const pulse = pulses.get(channel)
                // console.log(`channel: ${channel}, pulse: ${pulse}`)
                // ok(pulse) // pulse is 0, ok fails
                // console.log(pulse)
                if (pulse < destination) {
                    pulses.set(channel, pulse + 1)
                } else if (pulse > destination) {
                    pulses.set(channel, pulse - 1)
                } else {
                    isBusy = false
                    clearInterval(interval)
                }
            }, 100)
            return
        }
        if (data.startsWith('stop:')) {
            socket.write('ok')
            isBusy = false
            clearInterval(interval)
        }
        if (data.startsWith('pulse?:')) {
            const channel = data.substring(data.indexOf(':') + 1)

            if (!pulses.has(channel)) {
                socket.write('ng')
                return
            }
            const msg = `ok ${pulses.get(channel)} ${isBusy ? 1 : 0}`
            console.log(msg)
            socket.write(msg)
            return
        }
        socket.write('ng')
    }).on('close', () => {
        console.log('close')
    })
}).listen(3004)
