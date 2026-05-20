import ControllableBoolean from '../13/ControllableBoolean.js'
import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import Variables from '../13fa/Variables.js'
import ControllableNumber from '../13ga/ControllableNumber.js'

export default class extends Variables {
    constructor() {
        super()

        // overwrite cmin/cmax
        this.cmin = new ControllableNumber('cmin',this.requestParams)
        this.cmax = new ControllableNumber('cmax',this.requestParams)

        this.cminValue = new ElementString('/cminValue', this.elementValues, this.webSocketPathnames)
        this.cmaxValue = new ElementString('/cmaxValue', this.elementValues, this.webSocketPathnames)
    }
}

