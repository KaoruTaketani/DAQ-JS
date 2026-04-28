import axes from '../lib/axes.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'

export default class {
    /**
     * @param {import('./FigureVariablesPNG.js').default} variables 
     */
    constructor(variables) {
        /** @type {CanvasRenderingContext2D} */
        this._canvasContext
        variables.canvasContext.prependListener(arg => { this._canvasContext = arg })
        /** @type {HTMLImageElement} */
        this._imageElement
        variables.imageElement.prependListener(arg => { this._imageElement = arg })
        /** @type {number} */
        this._pngXMaxInMillimeters
        variables.pngXMaxInMillimeters.prependListener(arg => { this._pngXMaxInMillimeters = arg })
        /** @type {number} */
        this._pngXMinInMillimeters
        variables.pngXMinInMillimeters.prependListener(arg => { this._pngXMinInMillimeters = arg })
        /** @type {number} */
        this._pngYMaxInMillimeters
        variables.pngYMaxInMillimeters.prependListener(arg => { this._pngYMaxInMillimeters = arg })
        /** @type {number} */
        this._pngYMinInMillimeters
        variables.pngYMinInMillimeters.prependListener(arg => { this._pngYMinInMillimeters = arg })
        /** @type {number} */
        this._pngHeightInPixels
        variables.pngHeightInPixels.addListener(arg => {
            this._pngHeightInPixels = arg
            this._operation()
        })
        /** @type {number} */
        this._pngWidthInPixels
        variables.pngWidthInPixels.addListener(arg => {
            this._pngWidthInPixels = arg
            this._operation()
        })
        /** @type {string} */
        this._xminValue
        variables.xminValue.addListener(arg => {
            this._xminValue = arg
            this._operation()
        })
        /** @type {string} */
        this._xmaxValue
        variables.xmaxValue.addListener(arg => {
            this._xmaxValue = arg
            this._operation()
        })
        /** @type {string} */
        this._yminValue
        variables.yminValue.addListener(arg => {
            this._yminValue = arg
            this._operation()
        })
        /** @type {string} */
        this._ymaxValue
        variables.ymaxValue.addListener(arg => {
            this._ymaxValue = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._pngHeightInPixels) return
            if (!this._pngWidthInPixels) return
            if (!this._xminValue) return
            if (!this._xmaxValue) return
            if (!this._yminValue) return
            if (!this._ymaxValue) return

            const ax = {
                xLim: [parseFloat(this._xminValue), parseFloat(this._xmaxValue)],
                yLim: [parseFloat(this._yminValue), parseFloat(this._ymaxValue)],
                xTick: [parseFloat(this._xminValue), parseFloat(this._xmaxValue)],
                yTick: [parseFloat(this._yminValue), parseFloat(this._ymaxValue)],
                xTickLabel: [this._xminValue, this._xmaxValue],
                yTickLabel: [this._yminValue, this._ymaxValue]
            }
            variables.svgInnerHTML.assign([
                axes(ax),
                xlabel(ax, 'width (mm)'),
                ylabel(ax, 'height (mm)')
            ].join(''))
            // svs size is [400, 300] and its viewBox is [560,420]
            // moreover, axes position in pixels are fixed to [560*0.13, 420 * 0.89, 560*0.775, 420*0.815]
            // xMinInPixels = (axes.parentWidth ?? 560) * (axes.innerLeft ?? 0.13),
            // yMinInPixels = (axes.parentHeight ?? 420) * (1 - (axes.innerBottom ?? 0.11)),
            // xMaxInPixels = xMinInPixels + (axes.parentWidth ?? 560) * (axes.innerWidth ?? 0.775),
            // yMaxInPixels = yMinInPixels - (axes.parentHeight ?? 420) * (axes.innerHeight ?? 0.815),

            // this._canvasContext.drawImage(
            //     this._imageElement,
            //     (560 * 0.13) * 400 / 560,
            //     (420 * (1 - 0.11 - 0.815)) * 300 / 420,
            //     (560 * 0.775) * 400 / 560,
            //     (420 * 0.815) * 300 / 420
            // )
            // calculate pixels cit from the original 1024x1024 image
            // bottom y value of axes ges smaller but
            // bottom y value of drawImage gets larger
            // normalized coordinate is useful
            const dx = this._pngXMaxInMillimeters - this._pngXMinInMillimeters,
                xmin = parseFloat(this._xminValue),
                xmax = parseFloat(this._xmaxValue),
                dy = this._pngYMaxInMillimeters - this._pngYMinInMillimeters,
                ymin = parseFloat(this._yminValue),
                ymax = parseFloat(this._ymaxValue),
                ymaxInNormalized = ymax / dy
            this._canvasContext.drawImage(
                this._imageElement,
                this._pngWidthInPixels * xmin / dx,
                this._pngHeightInPixels * (1 - ymaxInNormalized),
                this._pngWidthInPixels * (xmax - xmin) / dx,
                this._pngHeightInPixels * (ymax - ymin) / dy,
                (560 * 0.13) * 400 / 560,
                (420 * (1 - 0.11 - 0.815)) * 300 / 420,
                (560 * 0.775) * 400 / 560,
                (420 * 0.815) * 300 / 420
            )
        }
    }
}
