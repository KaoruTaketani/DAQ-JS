import ControllableString from '../13/ControllableString.js'
import Variables from '../13/Variables.js'

export default class extends Variables {
    constructor() {
        super()

        this.randomNumberGetterDestinationState = new ControllableString('randomNumberGetterDestinationState', this.requestParams)
    }
}

