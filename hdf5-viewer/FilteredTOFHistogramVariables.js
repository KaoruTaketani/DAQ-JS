import ListenableString from './ListenableString.js'
import OfflineVariables from './OfflineVariables.js'

export default class extends OfflineVariables {
    constructor() {
        super()

        this.svgInnerHTML = new ListenableString()
    }
}

