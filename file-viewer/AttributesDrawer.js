export default class {
    /**
     * @param {import('./AttributesVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {Map<string,object>} */
        this._attributes
        variables.attributes.prependListener(arg => { this._attributes = arg })
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        /** @type {string[]} */
        this._visibleKeys
        variables.visibleKeys.addListener(arg => {
            this._visibleKeys = arg
            this._operation()
        })
        this._operation = () => {
            const keys = ['_name'].concat(this._visibleKeys)
            variables.theadInnerHTML.assign(keys.map(key => `<th>${key}</th>`).join(''))
            const tmp = this._fileNames.filter(fileName => fileName.endsWith('.h5'))
                .map(fileName => {
                    const data = this._attributes.get(fileName)
                    return [
                        '<tr>',
                        `<td>${fileName}</td>`,
                        this._visibleKeys.map(key => `<td>${data[key]}</td>`).join(''),
                        '</tr>'
                    ].join('')
                }).join('')
            // const tmp = this._attributes.filter(attr => this._fileNames.includes(attr['_name']))
            //     .map(obj => [
            //         '<tr>',
            //         Object.keys(obj)
            //             .filter(key => keys.includes(key))
            //             .map(key => `<td>${obj[key]}</td>`).join(''),
            //         '</tr>'
            //     ].join('')).join('')
            variables.tbodyInnerHTML.assign(tmp)
        }
    }
}
