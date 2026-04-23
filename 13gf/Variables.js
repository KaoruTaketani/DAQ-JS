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

        this.means = new ListenableObject()
        this.meanErrors = new ListenableObject()
        this.presets = new ListenableObject()

        this.presetStart = new ListenableNumber()
        this.presetStop = new ListenableNumber()
        this.presetStep = new ListenableNumber()

        this.presetStartValue = new ElementString('/presetStartValue', this.elementValues, this.webSocketPathnames)
        this.presetStopValue = new ElementString('/presetStopValue', this.elementValues, this.webSocketPathnames)
        this.presetStepValue = new ElementString('/presetStepValue', this.elementValues, this.webSocketPathnames)
        this.meansSVGInnerHTML = new ElementString('/meansSVGInnerHTML', this.elementValues, this.webSocketPathnames)
    }
}

