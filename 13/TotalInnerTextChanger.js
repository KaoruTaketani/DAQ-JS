import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketUrls
        variables.webSocketUrls.addListener(arg => { this._webSocketUrls = arg })
        this._total
        variables.total.addListener(arg => {
            this._total = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketUrls.forEach((url, ws) => {
                if (url !== '/HistogramMakerClient.js') return

                ws.send(JSON.stringify({
                    key: 'totalInnerText',
                    value: `total is ${this._total}`
                }))
            })
        }
    }
}

