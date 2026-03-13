import ListenableString from './ListenableString.js'
import ClientVariables from './ClientVariables.js'
import ListenableNumber from './ListenableNumber.js'

export default class extends ClientVariables {
    constructor() {
        super()

        this.xminInPixels = new ListenableNumber()
        this.yminInPixels = new ListenableNumber()
        this.xmaxInPixels = new ListenableNumber()
        this.ymaxInPixels = new ListenableNumber()

        this.imageSrc = new ListenableString()
        this.svgInnerHTML = new ListenableString()
    }
}

