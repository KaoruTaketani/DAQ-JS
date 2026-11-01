import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import Variables from '../13/Variables.js'

export default class extends Variables {
    constructor() {
        super()
        
        this.cmin = new ListenableNumber()
        this.cmax = new ListenableNumber()

        this.imageSrc = new ElementString('/imageSrc', this.elementValues, this.webSocketPathnames)
    }
}

