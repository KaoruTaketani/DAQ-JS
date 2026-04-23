import ControllableBoolean from '../13/ControllableBoolean.js'
import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import ControllableNumber from '../13gc/ControllableNumber.js'
import BatchBoolean from '../13gd/BatchBoolean.js'
import Variables from '../13gd/Variables.js'

export default class extends Variables {
    constructor() {
        super()

        this.textAreaValue = new ElementString('/textAreaValue', this.elementValues, this.webSocketPathnames)
    }
}

