export default class {
    /**
     * @param {import('./FigureVariablesPNG.js').default} variables 
     */
    constructor(variables) {
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
            fetch(`${pathname}?path=${this._path}&fileName=${this._fileNames[0]}&type=svg`).then(response => {
                if (!response.ok) {
                    variables.divInnerText.assign('raw image was not found')
                    variables.svgInnerHTML.assign('')
                    variables.imageSrc.assign('')
                } else {
                    response.text().then(text => {
                        variables.divInnerText.assign('')
                        variables.svgInnerHTML.assign(text)
                        fetch(`/rawImage?path=${this._path}&fileName=${this._fileNames[0]}&type=png`).then(response => {
                            response.text().then(text => {
                                variables.imageSrc.assign(text)
                            })
                        })
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
