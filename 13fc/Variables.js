import RemoteNumber from './RemoteNumber.js'
import ListenableObject from '../13/ListenableObject.js'

export default class {
    constructor() {
        this.visaQueue = new ListenableObject()
        this.visaParsers = new ListenableObject()
 
        console.log(`freq: ${queue.query(':SOURCE1:FREQ?\n')}`)

        this.channel1Pulse = new RemoteNumber('pulse?:1', data => parseInt(data.split(' ')[1]), this.visaParsers, this.visaQueue)
        this.channel2Pulse = new RemoteNumber('pulse?:2', data => parseInt(data.split(' ')[1]), this.visaParsers, this.visaQueue)
    }
}

