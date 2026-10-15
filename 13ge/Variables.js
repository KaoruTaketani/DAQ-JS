import ElementString from '../13/ElementString.js'
import Variables from '../13gd/Variables.js'

export default class extends Variables {
    constructor() {
        super()

        this.textAreaValue = new ElementString('/textAreaValue', this.elementValues, this.webSocketPathnames)
    }
}

