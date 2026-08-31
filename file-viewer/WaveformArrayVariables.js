import SVGVariables from './SVGVariables.js'
import ListenableString from './ListenableString.js'

export default class extends SVGVariables {
    constructor() {
        super()

        this.offsetValue = new ListenableString()
        this.numWaveformsInnerText = new ListenableString()
    }
}

