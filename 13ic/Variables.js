import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableObject from '../13/ListenableObject.js'
import ControllableNumber from '../13ga/ControllableNumber.js'
import RemoteNumber from '../13ia/RemoteNumber.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.requestParams = new ListenableObject()
        this.webSocketPathnames = new ListenableObject()
        this.elementValues = new ListenableObject()
        this.tcpQueue = new ListenableObject()
        this.response = new ListenableObject()

        this.channel1Pulse = new RemoteNumber('pulse?:A:5', data => parseInt(data.split(' ')[1]), this.response)
        this.channel2Pulse = new RemoteNumber('pulse?:A:6', data => parseInt(data.split(' ')[1]), this.response)

        this.stopChannel = new ControllableNumber('stopChannel', this.requestParams)
        this.channel1Destination = new ControllableNumber('channel1Destination', this.requestParams)
        this.channel2Destination = new ControllableNumber('channel2Destination', this.requestParams)

        this.stopButtonDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.channel1PulseInnerText = new ElementString('/channel1PulseInnerText', this.elementValues, this.webSocketPathnames)
        this.channel2PulseInnerText = new ElementString('/channel2PulseInnerText', this.elementValues, this.webSocketPathnames)
        this.channel1DestinationInnerText = new ElementString('/channel1DestinationInnerText', this.elementValues, this.webSocketPathnames)
        this.channel2DestinationInnerText = new ElementString('/channel2DestinationInnerText', this.elementValues, this.webSocketPathnames)
    }
}

