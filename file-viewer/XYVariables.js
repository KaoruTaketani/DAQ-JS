import SVGVariables from './SVGVariables.js'
import ListenableString from '../lib/ListenableString.js'

export default class extends SVGVariables {
    constructor() {
        super()

        this.xkeyText = new ListenableString()
        this.ykeyText = new ListenableString()
    }
}

