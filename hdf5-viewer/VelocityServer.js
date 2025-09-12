import Variables from './Variables.js'
import VelocitySender from './VelocitySender.js'

export default class {
    /**
     * @param {import('ws').WebSocket} webSocket 
     */
    constructor(webSocket) {
        this.variables = new Variables(webSocket)

        new VelocitySender(this.variables)

        this.variables.tofInMilliseconds.assign(40)
        this.variables.tofInputValue.assign('40')
        this.variables.flightLengthInMeters.assign(20)
        this.variables.flightLengthInputValue.assign('20')
    }
}

