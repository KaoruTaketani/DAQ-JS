import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {object[]} */
        this._hdf5Attributes
        variables.hdf5Attributes.prependListener(arg => { this._hdf5Attributes = arg })
        /** @type {string[]} */
        this._tableMakerColumns
        variables.tableMakerColumns.addListener(arg => {
            this._tableMakerColumns = arg
            this._operation()
        })
        this._operation = () => {
            const header = this._tableMakerColumns.join(',')
            const data = this._hdf5Attributes.map(row => {
                return this._tableMakerColumns.map(column => {
                    const cellMap = new Map(Object.entries(row)),
                        value = cellMap.get(column)
                    return `${value}`
                }).join(',')
            }).join('\n')
            const buffer = new Buffer([header,data].join('\n'),'utf-8')

            variables.csvLinkHref.assign(`data:text/csv;base64,${buffer.toString('base64')}`)
        }
    }
}

