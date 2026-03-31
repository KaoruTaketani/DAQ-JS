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

            fetch(`/horizontalProjectionHistogramsBinCounts?path=${this._path}&fileName=${this._fileName}&type=svg`).then(response => {
                if (!response.ok) {
                    variables.divInnerText.assign('filteredImage was not found')
                    variables.svgInnerHTML.assign('')
                    variables.imageSrc.assign('')
                } else {
                    response.text().then(text => {
                        variables.divInnerText.assign('')
                        variables.svgInnerHTML.assign(text)
                        fetch(`/horizontalProjectionHistogramsBinCounts?path=${this._path}&fileName=${this._fileName}&type=png`).then(response => {
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
