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
        this.centerInMillimeters = new ListenableNumber()
        this.widthInMillimeters = new ListenableNumber()

        this.stopChannel = new ControllableNumber('stopChannel', this.requestParams)
        this.channel1Destination = new ControllableNumber('channel1Destination', this.requestParams)
        this.channel2Destination = new ControllableNumber('channel2Destination', this.requestParams)
        this.widthDestination = new ControllableNumber('widthDestination', this.requestParams)
        this.centerDestination = new ControllableNumber('centerDestination', this.requestParams)

        this.stopButtonDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.channel1PulseInnerText = new ElementString('/channel1PulseInnerText', this.elementValues, this.webSocketPathnames)
        this.channel2PulseInnerText = new ElementString('/channel2PulseInnerText', this.elementValues, this.webSocketPathnames)
        this.channel1DestinationInnerText = new ElementString('/channel1DestinationInnerText', this.elementValues, this.webSocketPathnames)
        this.channel2DestinationInnerText = new ElementString('/channel2DestinationInnerText', this.elementValues, this.webSocketPathnames)
        this.centerInMillimetersInnerText = new ElementString('/centerInMillimetersInnerText', this.elementValues, this.webSocketPathnames)
        this.widthInMillimetersInnerText = new ElementString('/widthInMillimetersInnerText', this.elementValues, this.webSocketPathnames)
        this.centerDestinationInnerText = new ElementString('/centerDestinationInnerText', this.elementValues, this.webSocketPathnames)
        this.widthDestinationInnerText = new ElementString('/widthDestinationInnerText', this.elementValues, this.webSocketPathnames)
    }
}

