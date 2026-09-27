import { Server } from 'net'
import { clearInterval } from 'timers'

const server = new Server({})

server.maxConnections = 1
server.on('connection', socket => {
    const buffer = Array(16)
    let tail = 0
    let head = 0
    const interval = setInterval(() => {
        buffer[head] = head
        head = (head + 1) % buffer.size
        if (head === tail) socket.end()
    }, 1000)

    socket.on('data', (/** @type {string} */data) => {
        console.log(`data: ${data}`)
        if (data === 'get') {
            if (tail < head) {
                socket.write(buffer.slice(tail, head))
            } else {
                socket.write(buffer.slice(head).concat(buffer.slice(0, tail)))
            }
            tail = head
        }
    }).on('close', () => {
        console.log('close')
        clearInterval(interval)
    })
}).listen(23)

