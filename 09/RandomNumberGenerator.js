import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        variables.httpServer.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            setInterval(() => {
                variables.randomNumber.assign(Math.random())
            }, 1000)
        }
    }
}

