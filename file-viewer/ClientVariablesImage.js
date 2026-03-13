import ListenableString from './ListenableString.js'
import ClientVariables from './ClientVariables.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class extends ClientVariables {
    constructor() {
        super()
        /** @type {import('./ListenableObject.js').default<HTMLImageElement>} */
        this.imageElement = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<CanvasRenderingContext2D>} */
        this.canvasContext = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<number[]>} */
        this.cursorOffset = new ListenableObject()

        this.xminInPixels = new ListenableNumber()
        this.yminInPixels = new ListenableNumber()
        this.xmaxInPixels = new ListenableNumber()
        this.ymaxInPixels = new ListenableNumber()
        this.xminInData = new ListenableNumber()
        this.yminInData = new ListenableNumber()
        this.xmaxInData = new ListenableNumber()
        this.ymaxInData = new ListenableNumber()

        this.imageSrc = new ListenableString()
        this.svgInnerHTML = new ListenableString()
    }
}

