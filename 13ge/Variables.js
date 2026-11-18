import ListenableObject from '../13/ListenableObject.js'
import Variables from '../13gd/Variables.js'
import ControllableNumber from './ControllableNumber.js'
import DestinationString from './DestinationString.js'

export default class extends Variables {
    constructor() {
        super()

        this.batchLimits = new ListenableObject()
        this.randomNumberGeneratorDestinationStateLimits = new ListenableObject()
        this.presetLimits = new ListenableObject()

        // overwrite defined in ../13gc/Variables.js
        this.randomNumberGeneratorDestinationState = new DestinationString('randomNumberGeneratorDestinationState', this.requestParams, this.batchResolve, this.batchLimits, this.randomNumberGeneratorDestinationStateLimits)

        // overwrite defined in ../13gc/Variables.js
        this.preset = new ControllableNumber('preset', this.requestParams, this.batchResolve, this.batchLimits, this.presetLimits)
    }
}

