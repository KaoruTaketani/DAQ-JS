import RemoteNumber from './RemoteNumber.js'
import ListenableObject from '../13/ListenableObject.js'

export default class {
    constructor() {
        this.tcpQueue = new ListenableObject()
        this.tcpResponseHandlers = new ListenableObject()
 
        this.channel1Pulse = new RemoteNumber('pulse?:1', data => parseInt(data.split(' ')[1]), this.tcpResponseHandlers, this.tcpQueue)
        this.channel2Pulse = new RemoteNumber('pulse?:2', data => parseInt(data.split(' ')[1]), this.tcpResponseHandlers, this.tcpQueue)
    }
}

