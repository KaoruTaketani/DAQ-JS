import ControllableNumber from './ControllableNumber.js'
import ElementBoolean from './ElementBoolean.js'
import ElementString from './ElementString.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.message = new ListenableObject()
        this.webSocketPathnames = new ListenableObject()
        this.elementValues = new ListenableObject()

        this.xPulse = new ListenableNumber()
        this.thetaPulse = new ListenableNumber()

        this.xDestination = new ControllableNumber('xDestination', this.message)
        this.thetaDestination = new ControllableNumber('thetaDestination', this.message)

        this.stopButtonDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.moveXButtonDisabled = new ElementBoolean('/moveXButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.moveThetaButtonDisabled = new ElementBoolean('/moveThetaButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.xDestinationDisabled = new ElementBoolean('/xDestinationDisabled', this.elementValues, this.webSocketPathnames)
        this.thetaDestinationDisabled = new ElementBoolean('/thetaDestinationDisabled', this.elementValues, this.webSocketPathnames)

        this.xPulseInnerText = new ElementString('/xPulseInnerText', this.elementValues, this.webSocketPathnames)
        this.thetaPulseInnerText = new ElementString('/thetaPulseInnerText', this.elementValues, this.webSocketPathnames)
        this.xDestinationValue = new ElementString('/xDestinationValue', this.elementValues, this.webSocketPathnames)
        this.thetaDestinationValue = new ElementString('/thetaDestinationValue', this.elementValues, this.webSocketPathnames)
    }
}

