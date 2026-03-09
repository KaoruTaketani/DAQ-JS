import ListenableString from './ListenableString.js'
import OfflineVariables from './OfflineVariables.js'

export default class extends OfflineVariables {
    constructor() {
        super()

        this.imageSrc = new ListenableString()
        this.svgInnerHTML = new ListenableString()
    }
}

