import ElementBoolean from '../13/ElementBoolean.js'
import Variables from '../13gc/Variables.js'

export default class extends Variables {
    constructor() {
        super()

        this.batchStopButtonDisabled = new ElementBoolean('/batchStopButtonDisabled', this.elementValues, this.webSocketPathnames)
    }
}

