import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableObject from '../13/ListenableObject.js'
import Variables from '../13ga/Variables.js'
import BatchNumber from './BatchNumber.js'
import BatchString from './BatchString.js'
import DestinationString from './DestinationString.js'

export default class extends Variables {
    constructor() {
        super()
        this.batchParams = new ListenableObject()
        this.batchResolve = new ListenableObject()

        // overwrite defined in ../13ga/Variables.js
        this.randomNumberGeneratorDestinationState = new DestinationString('randomNumberGeneratorDestinationState', this.requestParams, this.batchResolve)
        this.batchProcessorDestinationState = new BatchString('batchProcessorDestinationState', this.requestParams, this.batchResolve)

        // overwrite defined in ../13/Variables.js
        this.preset = new BatchNumber('preset', this.requestParams, this.batchResolve)

        this.batchStartButtonDisabled = new ElementBoolean('/batchStartButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.batchTableInnerHTML = new ElementString('/batchTableInnerHTML', this.elementValues, this.webSocketPathnames)
    }
}

