export default class {
    /**
     * @param {import('./AttributesVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string} */
        this._extname
        variables.extname.prependListener(arg => { this._extname = arg })
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
            if (!this._fileNames) return

            variables.theadInnerHTML.assign(['_name'].concat(this._visibleKeys).map(key => `<th>${key}</th>`).join(''))

            const tmp = this._fileNames.filter(fileName => fileName.endsWith(`.${this._extname}`))
                .map(fileName => {
                    const data = this._attributes.get(fileName)
                    return [
                        '<tr>',
                        `<td>${fileName}</td>`,
                        this._visibleKeys.map(key => {
                            // @ts-ignore undefined is acceptable in the following code
                            const value = data[key]

                            if (typeof value === 'object') {
                                return '<td>"' + Object.values(value).map(v => v.toString()).join(' ') + '"</td>'
                            } else if (Number.isInteger(value)) {
                                return `<td>${value.toLocaleString()}</td>`
                            } else {
                                return `<td>${value}</td>`
                            }
                        }).join(''),
                        '</tr>'
                    ].join('')
                }).join('')

            variables.tbodyInnerHTML.assign(tmp)

            const csvHeader = ['_name'].concat(this._visibleKeys).join(',')
            const csvBody = this._fileNames.filter(fileName => fileName.endsWith('.h5'))
                .map(fileName => {
                    const data = this._attributes.get(fileName)
                    return [
                        `${fileName},`,
                        this._visibleKeys.map(key => {
                            // @ts-ignore undefined is acceptable in the following code
                            const value = data[key]

                            if (typeof value === 'object') {
                                return '"' + Object.values(value).map(v => v.toString()).join(' ') + '"'
                            } else {
                                return value
                            }
                        }).join(',')
                    ].join('')
                }).join('\n')

            variables.linkHref.assign(`data:text/csv;base64,${btoa([csvHeader, csvBody].join('\n'))}`)

        }
    }
}
