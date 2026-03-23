export default class {
    /**
     * @param {import('./ClientVariablesAttributes.js').default} variables 
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
            // ''.split(',').length is 1
            if (this._fileName === '' || this._fileName.split(',').length === 0) {
                variables.divInnerText.assign('')
                variables.tableInnerHTML.assign('')
                return
            }
            fetch(`/attributes?path=${this._path}&fileName=${this._fileName}`).then(response => {
                if (this._fileName.split(',').length === 1) {
                    response.text().then(text => {
                        variables.divInnerText.assign(text)
                        variables.tableInnerHTML.assign('')
                    })
                } else {
                    response.text().then(text => {
                        variables.divInnerText.assign('')
                        variables.tableInnerHTML.assign(text)
                    })
                }
            })
        }
    }
}
