import Operator from './Operator.js'

export default class extends Operator {
    constructor(httpServer) {
        super()
        this._httpServer
        httpServer.addListener(arg => {
            this._httpserver = arg
            this._operation()
        })
        this._operation = () => {
            this._httpServer.listen(80)
        }
    }
}

