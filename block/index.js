import { Server } from 'http'
import { BlockList } from 'net'

const blockList = new BlockList()
// blockList.addAddress('192.168.1.100')
blockList.addRange('0.0.0.0', '255.255.255.255')

const server = new Server()
server.on('request', (req, res) => {
    const remoteAddress = req.socket.remoteAddress
    console.log(`remoteAddress: ${remoteAddress}`)
    if (blockList.check(remoteAddress)) {
        res.statusCode = 403
        res.end('Forbidden')
    } else {
        res.end('Hello, World!')
    }
})

server.listen(80)