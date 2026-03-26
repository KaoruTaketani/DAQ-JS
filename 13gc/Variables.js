import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import ControllableNumber from './ControllableNumber.js'
import BatchBoolean from './BatchBoolean.js'
import ControllableBoolean from './ControllableBoolean.js'
import Variables from '../13ga/Variables.js'

export default class extends Variables {
    constructor() {
        super()
        this.batchParams = new ListenableObject()
        this.batchResolve = new ListenableObject()

        this.randomNumber = new ListenableNumber()

        // overwrite defined in ../13ga/Variables.js
        this.randomNumberGeneratorIsBusy = new BatchBoolean('randomNumberGeneratorIsBusy', this.requestParams, this.batchResolve)
        this.batchProcessorIsBusy = new ControllableBoolean('batchProcessorIsBusy', this.requestParams, this.batchResolve)

        // overwrite defined in ../13/Variables.js
        this.preset = new ControllableNumber('preset', this.requestParams, this.batchResolve)

        this.batchStartButtonDisabled = new ElementBoolean('/batchStartButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.batchTableInnerHTML = new ElementString('/batchTableInnerHTML', this.elementValues, this.webSocketPathnames)
    }
}

