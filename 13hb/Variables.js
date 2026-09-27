import ControllableString from '../13/ControllableString.js'
import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import Variables from '../13/Variables.js'

export default class extends Variables {
    constructor() {
        super()

        this.ringBufferSocket = new ListenableObject()

        this.getButtonDisabled = new ElementBoolean('/getButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.ringBufferDataInnerText = new ElementString('/ringBufferDataInnerText', this.elementValues, this.webSocketPathnames)

        this.ringBufferDestinationState = new ControllableString('ringBufferDestinationState', this.requestParams)
        this.ringBufferMessage = new ControllableString('ringBufferMessage', this.requestParams)
    }
}

