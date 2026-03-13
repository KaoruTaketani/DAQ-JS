export default class {
    /**
     * @param {import('./ClientVariablesImage.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._filePath
        variables.filePath.addListener(arg => {
            this._filePath = arg
            this._operation()
        })
        this._operation = () => {
            fetch(`${this._filePath}?type=svg&path=/filteredTOFHistogram`).then(response => {
                if (!response.ok) {
                    variables.divInnerText.assign('filteredTOFHistogram was not found')
                    variables.svgInnerHTML.assign('')
                } else {
                    response.text().then(text => {
                        variables.divInnerText.assign('')
                        variables.svgInnerHTML.assign(text)
                    })
                }
            })
        }
    }
}
