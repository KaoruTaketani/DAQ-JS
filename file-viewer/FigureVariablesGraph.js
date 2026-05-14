import FigureVariables from './FigureVariables.js'
import ListenableString from './ListenableString.js'

export default class extends FigureVariables {
    constructor() {
        super()

        this.xkeyText = new ListenableString()
        this.ykeyText = new ListenableString()
    }
}

