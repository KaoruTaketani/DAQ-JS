import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import ControllableNumber from './ControllableNumber.js'
import BatchString from './BatchString.js'
import ControllableString from './ControllableString.js'
import Variables from '../13ga/Variables.js'

export default class extends Variables {
    constructor() {
        super()
        this.batchParams = new ListenableObject()
        this.batchResolve = new ListenableObject()

        // overwrite defined in ../13ga/Variables.js
        this.randomNumberGeneratorDestinationState = new BatchString('randomNumberGeneratorDestinationState', this.requestParams, this.batchResolve)
        this.batchProcessorDestinationState = new ControllableString('batchProcessorDestinationState', this.requestParams, this.batchResolve)

        // overwrite defined in ../13/Variables.js
        this.preset = new ControllableNumber('preset', this.requestParams, this.batchResolve)

        this.batchStartButtonDisabled = new ElementBoolean('/batchStartButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.batchTableInnerHTML = new ElementString('/batchTableInnerHTML', this.elementValues, this.webSocketPathnames)
    }
}

