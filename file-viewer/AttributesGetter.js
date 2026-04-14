export default class {
    /**
     * @param {import('./AttributesVariables.js').default} variables 
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
                variables.tableInnerHTML.assign('')
                return
            }
            fetch(`/attributes?path=${this._path}&${this._fileName}`).then(response => {
                response.text().then(text => {
                    variables.tableInnerHTML.assign(text)
                })
            })
        }
    }
}
