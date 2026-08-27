export default class {
    /**
     * @param {import('./ImageVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {CanvasRenderingContext2D} */
        this._canvasContext
        variables.canvasContext.prependListener(arg => { this._canvasContext = arg })
        /** @type {string} */
        this._cmaxValue
        variables.cmaxValue.prependListener(arg => { this._cmaxValue = arg })
        /** @type {string} */
        this._cminValue
        variables.cminValue.prependListener(arg => { this._cminValue = arg })
        /** @type {string} */
        this._cScale
        variables.cScale.prependListener(arg => { this._cScale = arg })
        /** @type {number[]} */
        this._currentPoint
        variables.currentPoint.prependListener(arg => { this._currentPoint = arg })
        /** @type {number[]} */
        this._cursorOffset
        variables.cursorOffset.addListener(arg => {
            this._cursorOffset = arg
            this._operation()
        })
        this._operation = () => {
            const imageData = this._canvasContext.getImageData(this._cursorOffset[0], this._cursorOffset[1], 1, 1),
                pixelValue = imageData.data[0],
                cmin = parseFloat(this._cminValue),
                cmax = parseFloat(this._cmaxValue)
            if (Number.isNaN(cmin)) return
            if (Number.isNaN(cmax)) return

            if (this._cScale === 'log') {
                // as described in ImageDrawer.js
                // data in 0..255 was converted to c * log2(1+data)
                // where c is 255/8
                // so the opposite, solve pixelValue == c * log2(1+data)
                const data = 2 ** (pixelValue / (255 / 8)) - 1
                const c = cmin + data / 255 * (cmax - cmin)

                variables.divInnerText.assign(`cursor: {x: ${this._currentPoint[0]}, y: ${this._currentPoint[1]}, c: ${c}}`)
            } else {
                const c = cmin + pixelValue / 255 * (cmax - cmin)

                variables.divInnerText.assign(`cursor: {x: ${this._currentPoint[0]}, y: ${this._currentPoint[1]}, c: ${c}}`)
            }
        }
    }
}
