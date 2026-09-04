export default class {
    /**
     * @param {import('./AttributesVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.prependListener(arg => { this._fileNames = arg })
        /** @type {Map<string,object>} */
        this._attributes
        variables.attributes.prependListener(arg => { this._attributes = arg })
        /** @type {string} */
        this._filterKey
        variables.filterKey.prependListener(arg => { this._filterKey = arg })
        /** @type {string[]} */
        this._filterValues
        variables.filterValues.addListener(arg => {
            this._filterValues = arg
            this._operation()
        })
        this._operation = () => {
            // this._fileNames.filter(fileName => fileName.endsWith('.h5'))
            /** @type {string[]} */
            const files = []
            this._attributes.forEach((object, file) => {
                for (const [key, value] of Object.entries(object)) {
                    if (key === this._filterKey) {
                        if (typeof value === 'object') {
                            if (this._filterValues.includes('"' + Object.values(value).map(v => v.toString()).join(' ') + '"'))
                                files.push(file)
                        } else {
                            if (this._filterValues.includes(value))
                                files.push(file)
                        }
                    }
                }
            })
            variables.fileNames.assign(files)
        }
    }
}
