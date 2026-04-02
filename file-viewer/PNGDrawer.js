export default class {
    /**
     * @param {import('./FigureVariablesPNG.js').default} variables 
     */
    constructor(variables) {
        /** @type {CanvasRenderingContext2D} */
        this._canvasContext
        variables.canvasContext.prependListener(arg => { this._canvasContext = arg })
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
        /** @type {HTMLImageElement} */
        this._imageElement
        variables.imageElement.addListener(arg => {
            this._imageElement = arg
            this._operation()
        })
        this._operation = () => {
            // svs size is [400, 300] and its viewBox is [560,420]
            this._canvasContext.drawImage(
                this._imageElement,
                this._xminInPixels * 400 / 560,
                this._yminInPixels * 300 / 420,
                (this._xmaxInPixels - this._xminInPixels) * 400 / 560,
                (this._ymaxInPixels - this._yminInPixels) * 300 / 420
            )
        }
    }
}
