import SVGVariables from './SVGVariables.js'
import ListenableString from './ListenableString.js'

export default class extends SVGVariables {
    constructor() {
        super()

        this.keyText = new ListenableString()
        this.shapeInnerText = new ListenableString()
    }
}

