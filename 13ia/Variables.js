import RemoteNumber from './RemoteNumber.js'
import ListenableObject from '../13/ListenableObject.js'

export default class {
    constructor() {
        this.tcpQueue = new ListenableObject()
        this.tcpResponse = new ListenableObject()
 
        this.channel1Pulse = new RemoteNumber('pulse?:A:5', data => parseInt(data.split(' ')[1]), this.tcpResponse)
        this.channel2Pulse = new RemoteNumber('pulse?:A:6', data => parseInt(data.split(' ')[1]), this.tcpResponse)
    }
}

