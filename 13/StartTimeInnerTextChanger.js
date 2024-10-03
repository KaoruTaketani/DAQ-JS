import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketUrls
        variables.webSocketUrls.addListener(arg => { this._webSocketUrls = arg })
        this._startTime
        variables.startTime.addListener(arg => {
            this._startTime = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketUrls.forEach((url, ws) => {
                if (url !== '/HistogramMakerClient.js') return

                ws.send(JSON.stringify({
                    key: 'startTimeInnerText',
                    value: `start time is ${new Date(this._startTime).toString()}`
                }))
            })
        }
    }
}

