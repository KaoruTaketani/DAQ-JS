import Operator from './Operator.js'

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
        this._operation = () => {
            this._httpServer.on('request', (request, response) => {
                if (request.method !== 'PUT') return

                const url = new URL(`http://localhost${request.url}`)
                console.log(url.searchParams)
                variables.requestParams.assign(url.searchParams)
                console.log('put done')
                response.writeHead(200)
                response.end('')
            })
        }
    }
}

