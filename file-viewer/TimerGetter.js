export default class {
    /**
     * @param {import('./ClientVariablesTable.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {number} */
        this._offset
        variables.offset.addListener(arg => {
            this._offset = arg
            this._operation()
        })
        /** @type {string} */
        this._fileName
        variables.fileName.addListener(arg => {
            this._fileName = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._fileName) return
            if (!this._fileName.endsWith('.edr')) return

            fetch(`/timer?path=${this._path}&fileName=${this._fileName}&offset=${this._offset}`).then(response => {
                response.text().then(text => {
                    variables.tableInnerHTML.assign(text)
                })
            }).catch(() => {
                variables.divInnerText.assign('failed to get')
                variables.tableInnerHTML.assign('')
            })
        }
    }
}
