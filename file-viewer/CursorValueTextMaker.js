export default class {
    /**
     * @param {import('./ImageVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._svgInnerHTML
        variables.svgInnerHTML.prependListener(arg => { this._svgInnerHTML = arg })
        /** @type {CanvasRenderingContext2D} */
        this._canvasContext
        variables.canvasContext.prependListener(arg => { this._canvasContext = arg })
        /** @type {string} */
        this._cmaxValue
        variables.cmaxValue.prependListener(arg => { this._cmaxValue = arg })
        /** @type {string} */
        this._cminValue
        variables.cminValue.prependListener(arg => { this._cminValue = arg })
        /** @type {number[]} */
        this._currentPoint
        variables.currentPoint.prependListener(arg => { this._currentPoint = arg })
        /** @type {string} */
        this._cScale
        variables.cScale.addListener(arg => {
            this._cScale = arg
            this._operation()
        })
        /** @type {number[]} */
        this._cursorOffset
        variables.cursorOffset.addListener(arg => {
            this._cursorOffset = arg
            this._operation()
        })
        this._operation = () => {
            if (this._svgInnerHTML === '') return

            const imageData = this._canvasContext.getImageData(this._cursorOffset[0], this._cursorOffset[1], 1, 1),
                cmin = parseFloat(this._cminValue),
                cmax = parseFloat(this._cmaxValue)
            if (Number.isNaN(cmin)) return
            if (Number.isNaN(cmax)) return
            // convert 0..255 by clim, assuming c is grayscale
            const clim = this._cScale === 'log'
                ? [Math.log10(cmin), Math.log10(cmax)]
                : [cmin, cmax]
            const c = clim[0] + imageData.data[0] / 255 * (clim[1] - clim[0])

            variables.divInnerText.assign(`cursor: {x: ${this._currentPoint[0]}, y: ${this._currentPoint[1]}, c: ${c}}`)
        }
    }
}
