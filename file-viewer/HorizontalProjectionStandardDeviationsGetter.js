export default class {
    /**
     * @param {import('./ClientVariablesImage.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string} */
        this._fileName
        variables.fileName.addListener(arg => {
            this._fileName = arg
            this._operation()
        })
        this._operation = () => {
            if(!this._fileName.endsWith('.h5'))return

            fetch(`/horizontalProjectionStandardDeviations?path=${this._path}&fileName=${this._fileName}`).then(response => {
                if (!response.ok) {
                    variables.divInnerText.assign('tofHistogram was not found')
                    variables.svgInnerHTML.assign('')
                } else {
                    response.text().then(text => {
                        variables.divInnerText.assign('')
                        variables.svgInnerHTML.assign(text)
                    })
                }
            }).catch(() => {
                variables.divInnerText.assign('failed to get')
                variables.svgInnerHTML.assign('')
            })
        }
    }
}
