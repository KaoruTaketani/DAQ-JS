import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._newWebSocket
        variables.newWebSocket.addListener(arg => {
            this._newWebSocket = arg
            this._operation()
        })
        this._operation = () => {
            setInterval(() => {
                // console.log(Math.random())
                this._newWebSocket.send(JSON.stringify({ randomNumberInnerText: `random number is ${Math.random()}` }))
            }, 1000)
        }
    }
}

