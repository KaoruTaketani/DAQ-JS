import Operator from './Operator.js'

export default class extends Operator {
    constructor(httpServer, randomNumber) {
        super()
        httpServer.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            setInterval(() => {
                randomNumber.assign(Math.random())
            }, 1000)
        }
    }
}

