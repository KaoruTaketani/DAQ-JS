import ListenableObject from '../13/ListenableObject.js'
import Variables from '../13ia/Variables.js'

export default class extends Variables {
    constructor() {
        super()

        this.visaQueue = new ListenableObject()
        this.visaResponse = new ListenableObject()
    }
}

