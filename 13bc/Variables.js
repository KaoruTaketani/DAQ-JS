import Variables from '../13/Variables.js'
import ControllableString from './ControllableString.js'

export default class extends Variables {
    constructor() {
        super()

        // overwrite defined in ../13/Variables.js
        this.randomNumberGeneratorDestinationState = new ControllableString('randomNumberGeneratorDestinationState', this.requestParams)
    }
}

