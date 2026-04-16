export default class {
    /**
     * @param {import('./TableVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        this._operation = () => {
            if (this._fileNames.length !== 1) return
            if (this._fileNames[0].endsWith('/'))
                variables.tableInnerHTML.assign('')

            variables.offset.assign(0)
            variables.offsetValue.assign('0')
        }
    }
}
