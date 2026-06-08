import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import ControllableString from '../13gc/ControllableString.js'
import ControllableNumber from '../13gc/ControllableNumber.js'
import Variables from '../13gc/Variables.js'
import DestinationString from './DestinationString.js'

export default class extends Variables {
    constructor() {
        super()
        // overwrites are necessary to for ControllableBoolean/BatchBoolean/ControllableNumber?
        this.batchParams = new ListenableObject()
        this.batchResolve = new ListenableObject()

        this.batchProcessorDestinationState = new ControllableString('batchProcessorDestinationState', this.requestParams, this.batchResolve)
        // overwrite defined in ../13gc/Variables.js
        this.randomNumberGeneratorDestinationState = new DestinationString('randomNumberGeneratorDestinationState', this.requestParams, this.batchResolve)

        this.preset = new ControllableNumber('preset', this.requestParams, this.batchResolve)

        this.batchStopButtonDisabled = new ElementBoolean('/batchStopButtonDisabled', this.elementValues, this.webSocketPathnames)
    }
}

