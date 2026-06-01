import ControllableString from '../13/ControllableString.js'
import ElementString from '../13/ElementString.js'
import Variables from '../13fa/Variables.js'

export default class extends Variables {
    constructor() {
        super()

        this.zscale = new ControllableString('zscale', this.requestParams)

        this.zscaleInnerHTML = new ElementString('/zscaleInnerHTML', this.elementValues, this.webSocketPathnames)
    }
}

