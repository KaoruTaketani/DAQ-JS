
export default class {
    /**
     * @param {import('./ImageVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {CanvasRenderingContext2D} */
        this._canvasContext
        variables.canvasContext.prependListener(arg => { this._canvasContext = arg })
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string[]} */
        this._selectedFileNames
        variables.selectedFileNames.addListener(arg => {
            this._selectedFileNames = arg
            this._operation()
        })
        this._operation = () => {
            if (this._selectedFileNames.length !== 1) return
            if (!this._selectedFileNames[0].endsWith('.fc')) {
                variables.svgInnerHTML.assign('')
                // see canvas size in  ImageClient.js
                this._canvasContext.clearRect(0, 0, 400, 300)
                variables.canvasDataURL.assign(this._canvasContext.canvas.toDataURL())
                return
            }

            fetch(`/fc?path=${this._path}&fileName=${this._selectedFileNames[0]}`).then(response => {
                if (!response.ok) {
                    variables.divInnerText.assign('raw image was not found')
                    variables.svgInnerHTML.assign('')
                } else {
                    response.json().then(_ => {
                    })
                }
            }).catch(() => {
                variables.divInnerText.assign('failed to get')
                variables.svgInnerHTML.assign('')
            })
        }
    }
}

