import { readFile } from 'fs'
import Operator from '../14/Operator.js'

export default class extends Operator {
    /**
     * @param {import('../14/Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._elementValues
        variables.elementValues.addListener(arg => { this._elementValues = arg })
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._httpServer.on('request', (request, response) => {
                if (request.method !== 'POST') return

                if (request.url === '/message') {
                    let posted = ''
                    request.on('data', data => {
                        posted += data
                    })
                    request.on('end', () => {
                        console.log(`posted: ${posted}`)
                        try {
                            const message = JSON.parse(posted)
                            console.log(`message: ${JSON.stringify(message)}`)
                            variables.message.assign(message)
                            response.writeHead(200)
                            response.end('OK')
                        } catch {
                            console.log(`JSON.parse failed`)
                            response.writeHead(404)
                            response.end('NG')
                        }
                    })
                }
            })
        }
    }
}

