import { Server } from 'net'
import { clearInterval } from 'timers'

const server = new Server({})

server.maxConnections = 1
server.on('connection', socket => {
    socket.setEncoding('utf8')
    const buffer = Array(16)
    let tail = 0
    let head = 0
    console.log('connect')
    const interval = setInterval(() => {
        console.log(`head: ${head}, tail: ${tail}`)
        buffer[head] = head
        head = (head + 1) % buffer.length
        if (head === tail) socket.end()
    }, 100)

    socket.on('data', (/** @type {string} */data) => {
        if (data === 'get') {
            console.log(`data: ${data}, head: ${head}, tail: ${tail}`)
            if (tail < head) {
                socket.write(JSON.stringify(buffer.slice(tail, head)))
            } else {
                socket.write(JSON.stringify(buffer.slice(tail).concat(buffer.slice(0, head))))
            }
            tail = head
        }
    }).on('close', () => {
        console.log('close')
        clearInterval(interval)
    })
}).listen(23)

