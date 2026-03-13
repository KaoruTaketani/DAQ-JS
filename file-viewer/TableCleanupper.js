export default class {
    /**
     * @param {import('./ClientVariablesTable.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._fileName
        variables.fileName.addListener(arg => {
            this._fileName = arg
            this._operation()
        })
        this._operation = () => {
            if (this._fileName.endsWith('/')) {
                variables.tableInnerText.assign('')
                return
            }
            variables.offset.assign(0)
            variables.offsetValue.assign('0')
        }
    }
}
