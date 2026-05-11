export default class {
    /**
     * @param {import('./FigureVariablesPNG.js').default} variables 
     */
    constructor(variables) {
        /** @type {CanvasRenderingContext2D} */
        this._canvasContext
        variables.canvasContext.prependListener(arg => { this._canvasContext = arg })
        /** @type {boolean} */
        this._customChecked
        variables.customChecked.prependListener(arg => { this._customChecked = arg })
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        this._operation = () => {
            if (this._fileNames.length !== 1) return
            if (!this._fileNames[0].endsWith('.h5')) return

            // @ts-ignore
            const pathname = window.pathname

            fetch(`${pathname}?path=${this._path}&fileName=${this._fileNames[0]}`).then(response => {
                if (!response.ok) {
                    variables.divInnerText.assign('raw image was not found')
                    variables.svgInnerHTML.assign('')
                    variables.imageSrc.assign('')
                } else {
                    response.text().then(text => {
                        variables.divInnerText.assign('')
                        // data contains 
                        // xLimInMillimeters: [0, 50],
                        // yLimInMillimeters: [0, 50],
                        // and
                        // imageSrc: /** @type {string} */
                        // or
                        // shape: /** @type {number[]} */
                        // data: /** @type {Uint32Array} */

                        const data = JSON.parse(text)

                        variables.pngXMinInMillimeters.assign(data.xLimInMillimeters[0])
                        variables.pngXMaxInMillimeters.assign(data.xLimInMillimeters[1])
                        variables.pngYMinInMillimeters.assign(data.yLimInMillimeters[0])
                        variables.pngYMaxInMillimeters.assign(data.yLimInMillimeters[1])
                        variables.xminValue.assign(data.xLimInMillimeters[0].toString())
                        variables.xmaxValue.assign(data.xLimInMillimeters[1].toString())
                        variables.yminValue.assign(data.yLimInMillimeters[0].toString())
                        variables.ymaxValue.assign(data.yLimInMillimeters[1].toString())
                        // variables.imageSrc.assign(data.imageSrc)
                        console.log(data)
                        variables.dataset.assign({
                            shape: /** @type {number[]} */(data.shape),
                            data: new Uint32Array(JSON.parse(data.data))
                        })
                        variables.divInnerText.assign(`width: ${data.shape[1]}, height: ${data.shape[0]}`)
                        variables.pngWidthInPixels.assign(data.shape[1])
                        variables.pngHeightInPixels.assign(data.shape[0])
                    })
                }
            }).catch(() => {
                variables.divInnerText.assign('failed to get')
                variables.svgInnerHTML.assign('')
                variables.imageSrc.assign('')
            })
        }
    }
}

