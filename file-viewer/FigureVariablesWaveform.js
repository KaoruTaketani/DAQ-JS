import FigureVariables from './FigureVariables.js'
import ListenableString from './ListenableString.js'

export default class extends FigureVariables {
    constructor() {
        super()

        this.keyText = new ListenableString()
    }
}

