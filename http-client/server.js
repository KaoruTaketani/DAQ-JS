import { Server } from 'http'

const server = new Server()
server.on('request', (request, response) => {
    console.log(`url: ${request.url}, method: ${request.method}`)
    if (request.method === 'POST') {
        let posted = ''
        request.on('data', data => {
            posted += data
        })
        request.on('end', () => {
            console.log(`posted: ${posted}`)
            try {
                const message = JSON.parse(posted)
                console.log(`message: ${JSON.stringify(message)}`)
                response.writeHead(200)
                response.end()
            } catch {
                console.log(`JSON.parse failed`)
                response.writeHead(404)
                response.end()
            }
        })
        return
    }
    if (request.method === 'GET') {
        response.writeHead(200)
        response.end(`${Date.now()}`)
        return
    }
    response.writeHead(404)
    response.end()
}).listen(80)