export default class {
    /**
     * @param {import('./AttributesVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {object[]} */
        this._attributes
        variables.attributes.prependListener(arg => { this._attributes = arg })
        /** @type {string} */
        this._filterKey
        variables.filterKey.addListener(arg => {
            this._filterKey = arg
            this._operation()
        })
        this._operation = () => {
            /** @type {Set<any>} */
            const values = new Set()
            this._attributes.forEach(object => {
                for (const [key, value] of Object.entries(object)) {
                    if (key === this._filterKey) {
                        if (typeof value === 'object') {
                            values.add('"' + Object.values(value).map(v => v.toString()).join(' ') + '"')
                        } else {
                            values.add(value)
                        }
                    }
                }
            })
            variables.filterValuesInnerHTML.assign(Array.from(values).map(value => `<option>${value}</option>`).join(''))
        }
    }
}
