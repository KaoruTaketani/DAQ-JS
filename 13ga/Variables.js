import ControllableBoolean from '../13/ControllableBoolean.js'
import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import Variables from '../13/Variables.js'
import ControllableNumber from './ControllableNumber.js'

export default class extends Variables {
    constructor() {
        super()

        this.preset = new ControllableNumber('preset', this.requestParams)

        this.presetDisabled = new ElementBoolean('/presetDisabled', this.elementValues, this.webSocketPathnames)

        this.presetValue = new ElementString('/presetValue', this.elementValues, this.webSocketPathnames)
    }
}

