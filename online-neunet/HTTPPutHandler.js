import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('net').BlockList} */
        this._blockList
        variables.blockList.prependListener(arg => { this._blockList = arg })
        /** @type {import('http').Server} */
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._httpServer.on('request', (request, response) => {
                if (request.method !== 'PUT') return

                const clientIp = request.socket.remoteAddress
                if (clientIp === undefined
                    || this._blockList.check(clientIp)
                    || this._blockList.check(clientIp, 'ipv6')) {
                    response.writeHead(403)
                    response.end()
                    return
                }

                const url = new URL(`http://localhost${request.url}`)
                variables.requestParams.assign(url.searchParams)

                response.writeHead(200)
                response.end('')
            })
        }
    }
}

