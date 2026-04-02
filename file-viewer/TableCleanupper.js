export default class {
    /**
     * @param {import('./TableVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._fileName
        variables.fileName.addListener(arg => {
            this._fileName = arg
            this._operation()
        })
        this._operation = () => {
            if (this._fileName.endsWith('/'))
                variables.tableInnerHTML.assign('')

            variables.offset.assign(0)
            variables.offsetValue.assign('0')
        }
    }
}
