import ListenableString from './ListenableString.js'
import ClientVariables from './ClientVariables.js'

export default class extends ClientVariables {
    constructor() {
        super()

        this.imageSrc = new ListenableString()
        this.svgInnerHTML = new ListenableString()
    }
}

