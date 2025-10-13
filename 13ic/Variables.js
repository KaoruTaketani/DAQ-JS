import ControllableNumber from '../13h/ControllableNumber.js'
import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.requestParams = new ListenableObject()
        this.webSocketPathnames = new ListenableObject()
        this.elementValues = new ListenableObject()
        this.socketQueue = new ListenableObject()

        this.channel1Pulse = new ListenableNumber()
        this.channel2Pulse = new ListenableNumber()
        this.xPulse = new ListenableNumber()
        this.thetaPulse = new ListenableNumber()

        this.channel1Destination = new ControllableNumber('channel1Destination', this.requestParams)
        this.channel2Destination = new ControllableNumber('channel2Destination', this.requestParams)
        this.xDestination = new ControllableNumber('xDestination', this.requestParams)
        this.thetaDestination = new ControllableNumber('thetaDestination', this.requestParams)

        this.stopButtonDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.moveXButtonDisabled = new ElementBoolean('/moveXButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.moveThetaButtonDisabled = new ElementBoolean('/moveThetaButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.xDestinationDisabled = new ElementBoolean('/xDestinationDisabled', this.elementValues, this.webSocketPathnames)
        this.thetaDestinationDisabled = new ElementBoolean('/thetaDestinationDisabled', this.elementValues, this.webSocketPathnames)

        this.channel1PulseInnerText = new ElementString('/channel1PulseInnerText', this.elementValues, this.webSocketPathnames)
        this.channel2PulseInnerText = new ElementString('/channel2PulseInnerText', this.elementValues, this.webSocketPathnames)
        this.channel1DestinationInnerText = new ElementString('/channel1DestinationInnerText', this.elementValues, this.webSocketPathnames)
        this.channel2DestinationInnerText = new ElementString('/channel2DestinationInnerText', this.elementValues, this.webSocketPathnames)
        this.xPulseInnerText = new ElementString('/xPulseInnerText', this.elementValues, this.webSocketPathnames)
        this.thetaPulseInnerText = new ElementString('/thetaPulseInnerText', this.elementValues, this.webSocketPathnames)
        this.xDestinationValue = new ElementString('/xDestinationValue', this.elementValues, this.webSocketPathnames)
        this.thetaDestinationValue = new ElementString('/thetaDestinationValue', this.elementValues, this.webSocketPathnames)
    }
}

