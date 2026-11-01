import ControllableString from '../13/ControllableString.js'
import ElementBoolean from '../13/ElementBoolean.js'
import Variables from '../13ca/Variables.js'

export default class extends Variables {
    constructor() {
        super()

        this.readButtonDisabled = new ElementBoolean('/readButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.influxReaderField = new ControllableString('influxReaderField', this.requestParams)
    }
}

