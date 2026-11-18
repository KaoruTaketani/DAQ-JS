import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import Variables from '../13ge/Variables.js'
import ControllableString from '../13/ControllableString.js'

export default class extends Variables {
    constructor() {
        super()

        this.batchEditButtonDisabled = new ElementBoolean('/batchEditButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.batchParamsMakerInput = new ControllableString('batchParamsMakerInput', this.requestParams)

        this.textAreaValue = new ElementString('/textAreaValue', this.elementValues, this.webSocketPathnames)
    }
}

