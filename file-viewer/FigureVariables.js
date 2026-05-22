import ClientVariables from './ClientVariables.js'
import ListenableObject from './ListenableObject.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableString from './ListenableString.js'

export default class extends ClientVariables {
    constructor() {
        super()

        /** @type {import('./ListenableObject.js').default<number[]>} */
        this.cursorOffset = new ListenableObject()
        this.dataset = new ListenableObject()

        this.xminInPixels = new ListenableNumber()
        this.yminInPixels = new ListenableNumber()
        this.xmaxInPixels = new ListenableNumber()
        this.ymaxInPixels = new ListenableNumber()
        this.xminInData = new ListenableNumber()
        this.yminInData = new ListenableNumber()
        this.xmaxInData = new ListenableNumber()
        this.ymaxInData = new ListenableNumber()

        this.xminValue = new ListenableString()
        this.xmaxValue = new ListenableString()
        this.yminValue = new ListenableString()
        this.ymaxValue = new ListenableString()
        this.xlabel = new ListenableString()
        this.ylabel = new ListenableString()
        this.svgInnerHTML = new ListenableString()
    }
}

