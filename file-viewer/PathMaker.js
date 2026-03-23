export default class {
    /**
     * @param {import('./ClientVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string} */
        this._directoryName
        variables.directoryName.addListener(arg => {
            this._directoryName = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directoryName.endsWith('/')) return

            if (this._directoryName === '../') {
                // const newPath = this._path.substring(0, this._path.lastIndexOf('/'))
                // variables.path.assign(newPath === '' ? '/' : newPath)
                // console.log(tmp) // tmp is /20250424 if path is /20250424/
                // const tmp = this._path.slice(0, -1)
                // variables.path.assign(tmp.substring(0, tmp.lastIndexOf('/') + 1))
                variables.path.assign(this._path.substring(0, this._path.lastIndexOf('/', this._path.length - 2) + 1))
            } else {
                // const newPath = (this._path === '/' ? '' : this._path) + '/' + this._directoryName.substring(0, this._directoryName.length - 1)
                // variables.path.assign(newPath)
                variables.path.assign(this._path + this._directoryName)
            }
        }
    }
}
