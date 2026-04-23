import RemoteNumber from './RemoteNumber.js'
import ListenableObject from '../13/ListenableObject.js'

export default class {
    constructor() {
        this.visaQueue = new ListenableObject()
        this.visaParsers = new ListenableObject()
 
        this.frequency = new RemoteNumber(':SOURCE1:FREQ?\n', parseFloat, this.visaParsers, this.visaQueue)
        this.phase = new RemoteNumber(':SOURCE1:PHAS?\n', parseFloat, this.visaParsers, this.visaQueue)
    }
}

