import axes from '../lib/axes.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
import imcrop from '../lib/imcrop.js'
import imagesc from '../lib/imagesc.js'
import diff from '../lib/diff.js'

export default class {
    /**
     * @param {import('./ImageVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {CanvasRenderingContext2D} */
        this._canvasContext
        variables.canvasContext.prependListener(arg => { this._canvasContext = arg })
        /** @type {string} */
        this._xlabel
        variables.xlabel.prependListener(arg => { this._xlabel = arg })
        /** @type {string} */
        this._ylabel
        variables.ylabel.prependListener(arg => { this._ylabel = arg })
        /** @type {number[]} */
        this._datasetXlim
        variables.datasetXlim.prependListener(arg => { this._datasetXlim = arg })
        /** @type {number[]} */
        this._datasetYlim
        variables.datasetYlim.prependListener(arg => { this._datasetYlim = arg })
        this._dataset
        variables.dataset.prependListener(arg => { this._dataset = arg })
        /** @type {number} */
        /** @type {string} */
        this._cScale
        variables.cScale.addListener(arg => {
            this._cScale = arg
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
        /** @type {string} */
        this._cminValue
        variables.cminValue.addListener(arg => {
            this._cminValue = arg
            this._operation()
        })
        /** @type {string} */
        this._cmaxValue
        variables.cmaxValue.addListener(arg => {
            this._cmaxValue = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._xminValue) return
            if (!this._xmaxValue) return
            if (!this._yminValue) return
            if (!this._ymaxValue) return
            if (!this._cminValue) return
            if (!this._cmaxValue) return

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
                xlabel(ax, this._xlabel),
                ylabel(ax, this._ylabel)
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

            const dx = diff(this._datasetXlim)[0],
                dy = diff(this._datasetYlim)[0],
                xmin = parseFloat(this._xminValue),
                xmax = parseFloat(this._xmaxValue),
                ymin = parseFloat(this._yminValue),
                ymax = parseFloat(this._ymaxValue),
                cmin = parseFloat(this._cminValue),
                cmax = parseFloat(this._cmaxValue)

            if (this._cScale === 'log') {
                this._canvasContext.clearRect(
                    (560 * 0.13) * 400 / 560,
                    (420 * (1 - 0.11 - 0.815)) * 300 / 420,
                    (560 * 0.775) * 400 / 560,
                    (420 * 0.815) * 300 / 420
                )
                const x = (560 * (0.13 + 0.775) / 2) * 400 / 560
                const y = (420 * 0.445) * 300 / 420

                this._canvasContext.font = '20px sans-serif'
                this._canvasContext.textBaseline = 'middle'
                this._canvasContext.textAlign = 'center'
                this._canvasContext.fillText('not implemented yet', x, y)
            } else {
                imcrop(imagesc(this._dataset, [cmin, cmax]), [
                    this._dataset.shape[1] * (xmin - this._datasetXlim[0]) / dx,
                    this._dataset.shape[0] * (1 - (ymax - this._datasetYlim[0]) / dy),
                    this._dataset.shape[1] * (xmax - xmin) / dx,
                    this._dataset.shape[0] * (ymax - ymin) / dy
                ]).then(im => {
                    this._canvasContext.drawImage(
                        im,
                        (560 * 0.13) * 400 / 560,
                        (420 * (1 - 0.11 - 0.815)) * 300 / 420,
                        (560 * 0.775) * 400 / 560,
                        (420 * 0.815) * 300 / 420
                    )
                    variables.canvasDataURL.assign(this._canvasContext.canvas.toDataURL())
                })
            }
        }
    }
}
