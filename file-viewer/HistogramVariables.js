import SVGVariables from './SVGVariables.js'
import ListenableString from '../lib/ListenableString.js'

export default class extends SVGVariables {
    constructor() {
        super()

        this.keyText = new ListenableString()
        this.shapeInnerText = new ListenableString()
    }
}

