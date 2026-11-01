import ElementString from '../13/ElementString.js'
import ListenableObject from '../13/ListenableObject.js'
import Variables from '../13/Variables.js'

export default class extends Variables {
    constructor() {
        super()

        this.timeSeries = new ListenableObject()

        this.timeSeriesSVGInnerHTML = new ElementString('/timeSeriesSVGInnerHTML', this.elementValues, this.webSocketPathnames)
    }
}

