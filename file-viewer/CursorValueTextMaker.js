export default class {
    /**
     * @param {import('./ImageVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {number} */
        this._xminInPixels
        variables.xminInPixels.prependListener(arg => { this._xminInPixels = arg })
        /** @type {number} */
        this._yminInPixels
        variables.yminInPixels.prependListener(arg => { this._yminInPixels = arg })
        /** @type {number} */
        this._xmaxInPixels
        variables.xmaxInPixels.prependListener(arg => { this._xmaxInPixels = arg })
        /** @type {number} */
        this._ymaxInPixels
        variables.ymaxInPixels.prependListener(arg => { this._ymaxInPixels = arg })
        /** @type {number} */
        this._xminInData
        variables.xminInData.prependListener(arg => { this._xminInData = arg })
        /** @type {number} */
        this._yminInData
        variables.yminInData.prependListener(arg => { this._yminInData = arg })
        /** @type {number} */
        this._xmaxInData
        variables.xmaxInData.prependListener(arg => { this._xmaxInData = arg })
        /** @type {number} */
        this._ymaxInData
        variables.ymaxInData.prependListener(arg => { this._ymaxInData = arg })
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

            // svs size is [400, 300] and its viewBox is [560,420]
            const xInPixels = this._cursorOffset[0] * 560 / 400
            const xInNormalized = (xInPixels - this._xminInPixels)
                / (this._xmaxInPixels - this._xminInPixels)
            const xInData = this._xminInData
                + xInNormalized * (this._xmaxInData - this._xminInData)

            const yInPixels = this._cursorOffset[1] * 420 / 300
            const yInNormalized = (this._yminInPixels - yInPixels)
                / (this._yminInPixels - this._ymaxInPixels)
            const yInData = this._yminInData
                + yInNormalized * (this._ymaxInData - this._yminInData)

            if (xInNormalized < 0 || xInNormalized > 1) {
                variables.divInnerText.assign(`cursor: undefined`)
                return
            }
            if (yInNormalized < 0 || yInNormalized > 1) {
                variables.divInnerText.assign(`cursor: undefined`)
                return
            }
            // the above code is duplicated in CursorTextMaker.js
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

            variables.divInnerText.assign(`cursor: {x: ${xInData}, y: ${yInData}, c: ${c}}`)
        }
    }
}
