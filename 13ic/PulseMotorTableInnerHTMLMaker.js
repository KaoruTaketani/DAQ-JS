import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._channel1Pulse
        variables.channel1Pulse.addListener(arg => {
            this._channel1Pulse = arg
            this._operation()
        })
        this._channel1Destination
        variables.channel1Destination.addListener(arg => {
            this._channel1Destination = arg
            this._operation()
        })
        this._channel2Pulse
        variables.channel2Pulse.addListener(arg => {
            this._channel2Pulse = arg
            this._operation()
        })
        this._channel2Destination
        variables.channel2Destination.addListener(arg => {
            this._channel2Destination = arg
            this._operation()
        })
        this._operation = () => {
            const innerHTML = [
                '<thead>',
                '<tr><th>name</th><th>pulse</th><th>destination</th></tr>',
                '</thead>',
                '</body>',
                `<tr><td>channel 1</td><td>${this._channel1Pulse}</td><td><a href="#channel1">${this._channel1Destination}</a></td></tr>`,
                `<tr><td>channel 2</td><td>${this._channel2Pulse}</td><td><a href="#channel2">${this._channel2Destination}</a></td></tr>`,
                '</tbody>'
            ].join('')
            variables.pulseMotorTableInnerHTML.assign(innerHTML)
        }
    }
}
