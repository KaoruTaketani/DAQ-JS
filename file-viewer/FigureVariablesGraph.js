import FigureVariablesSVG from './FigureVariablesSVG.js'
import ListenableString from './ListenableString.js'

export default class extends FigureVariablesSVG {
    constructor() {
        super()

        this.xkeyText = new ListenableString()
        this.ykeyText = new ListenableString()
    }
}

