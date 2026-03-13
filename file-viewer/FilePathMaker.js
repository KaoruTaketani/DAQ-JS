export default class {
    /**
     * @param {import('./ClientVariables.js').default} variables 
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
            if (this._fileName.endsWith('/')) {
                variables.divInnerText.assign('')
                return
            }
            variables.filePath.assign(this._path === '/' ? `/${this._fileName}` : `${this._path}/${this._fileName}`)
        }
    }
}
