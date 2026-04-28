import FigureVariablesSVG from './FigureVariablesSVG.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class extends FigureVariablesSVG {
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
        this.pngWidthInPixels = new ListenableNumber()
        this.pngHeightInPixels = new ListenableNumber()
        this.pngXMinInMillimeters = new ListenableNumber()
        this.pngYMinInMillimeters = new ListenableNumber()
        this.pngXMaxInMillimeters = new ListenableNumber()
        this.pngYMaxInMillimeters = new ListenableNumber()

        this.imageSrc = new ListenableString()
    }
}

