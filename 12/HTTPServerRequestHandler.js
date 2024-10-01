import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._httpServer.on('request', (request, response) => {
                variables.httpResponse.assign(response)
                variables.httpRequestUrl.assign(request.url)
            })
        }
    }
}

