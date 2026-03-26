import Variables from '../13/Variables.js'
import ControllableBoolean from './ControllableBoolean.js'

export default class extends Variables {
    constructor() {
        super()

        // overwrite defined in ../13/Variables.js
        this.randomNumberGeneratorIsBusy = new ControllableBoolean('randomNumberGeneratorIsBusy', this.requestParams)
    }
}

