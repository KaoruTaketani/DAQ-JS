import SVGVariables from './SVGVariables.js'
import ListenableString from './ListenableString.js'

export default class extends SVGVariables {
    constructor() {
        super()

        this.xkeyText = new ListenableString()
        this.ykeyText = new ListenableString()
    }
}

