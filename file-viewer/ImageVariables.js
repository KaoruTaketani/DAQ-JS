import ListenableObject from '../lib/ListenableObject.js'
import ListenableString from '../lib/ListenableString.js'
import SVGVariables from './SVGVariables.js'

export default class extends SVGVariables {
    constructor() {
        super()
        /** @type {import('../lib/ListenableObject.js').default<CanvasRenderingContext2D>} */
        this.canvasContext = new ListenableObject()
        this.currentPoint = new ListenableObject()
        this.dataset = new ListenableObject()
        this.cursorOffset = new ListenableObject()
        this.datasetXlim = new ListenableObject()
        this.datasetYlim = new ListenableObject()

        this.canvasDataURL = new ListenableString()
        this.cScale = new ListenableString()
        this.cminValue = new ListenableString()
        this.cmaxValue = new ListenableString()
        this.keyText = new ListenableString()
        this.shapeInnerText = new ListenableString()
        this.svgIntensityInnerHTML = new ListenableString()
    }
}

