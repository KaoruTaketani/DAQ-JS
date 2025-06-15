import { readFile } from 'fs'
import Operator from '../14/Operator.js'
import { BlockList } from 'net'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._blockList
        this._operation = () => {
            this._blockList = new BlockList()
            this._blockList.addRange('0.0.0.0', '255.255.255.255')

            this._httpServer.on('request', (request, response) => {
                if (this._blockList.check(request.socket.remoteAddress)
                    || this._blockList.check(request.socket.remoteAddress, 'ipv6')) {
                    response.statusCode = 403
                    response.end('Forbidden')
                    return
                }

                if (request.url === '/') {
                    response.writeHead(200, { 'Content-Type': 'text/html' })
                    response.end([
                        '<html>',
                        '<head>',
                        '    <meta charset="utf-8">',
                        '</head>',
                        '<body>',
                        `    <script type="module" src="./Client.js">`,
                        `    </script>`,
                        '</body>',
                        '</html>'
                    ].join('\n'))
                    return
                }
                if (request.url === '/Client.js') {
                    readFile(`../14/Client.js`, 'utf8', (err, data) => {
                        if (err) throw err

                        response.writeHead(200, { 'Content-Type': 'text/javascript' })
                        response.end(data)
                    })
                    return
                }
                response.writeHead(404)
                response.end(`${request.url} was not found on this server`)
            })
        }
    }
}

