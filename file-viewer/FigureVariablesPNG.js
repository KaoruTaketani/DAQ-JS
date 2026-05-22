import FigureVariables from './FigureVariables.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class extends FigureVariables {
    constructor() {
        super()
        /** @type {import('./ListenableObject.js').default<CanvasRenderingContext2D>} */
        this.canvasContext = new ListenableObject()

        this.pngWidthInPixels = new ListenableNumber()
        this.pngHeightInPixels = new ListenableNumber()
        this.pngXMinInData = new ListenableNumber()
        this.pngYMinInData = new ListenableNumber()
        this.pngXMaxInData = new ListenableNumber()
        this.pngYMaxInData = new ListenableNumber()

        this.cminValue = new ListenableString()
        this.cmaxValue = new ListenableString()
        this.imageSrc = new ListenableString()
        this.keyText = new ListenableString()
    }
}

