export default class {
    /**
     * @param {import('./AttributesVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        this._operation = () => {
            // ''.split(',').length is 1
            if (this._fileNames.length === 0) {
                variables.tableInnerHTML.assign('')
                return
            }
            const hdf5FileNames=this._fileNames.filter(fileName=>fileName.endsWith('.h5'))
            fetch(`/attributes?path=${this._path}&${hdf5FileNames.map(fileName => `fileName=${fileName}`).join('&')}`).then(response => {
                response.text().then(text => {
                    variables.tableInnerHTML.assign(text)
                })
            })
        }
    }
}
