import { Server } from 'net'

const server = new Server({})

server.maxConnections = 1
server.on('connection', socket => {
    socket.setEncoding('utf8')
    socket.on('data', (/** @type {string} */data) => {
        console.log(`data: ${data}`)
        if (data === 'get')
            socket.write(Math.random().toString())
    }).on('close', () => {
        console.log('close')
    })
}).listen(23)
