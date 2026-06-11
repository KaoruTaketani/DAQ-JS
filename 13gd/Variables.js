import ControllableString from '../13/ControllableString.js'
import ElementBoolean from '../13/ElementBoolean.js'
import ListenableObject from '../13/ListenableObject.js'
import ControllableNumber from '../13gc/ControllableNumber.js'
import DestinationString from '../13gc/DestinationString.js'
import Variables from '../13gc/Variables.js'

export default class extends Variables {
    constructor() {
        super()

        this.batchStopButtonDisabled = new ElementBoolean('/batchStopButtonDisabled', this.elementValues, this.webSocketPathnames)
    }
}

