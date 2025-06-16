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
            const bodyInnerHTML = this._hdf5Attributes.map(row => {
                return '<tr>'
                    + this._tableMakerColumns.map(column => {
                        const cellMap = new Map(Object.entries(row)),
                            value = cellMap.get(column)
                        if (Number.isInteger(value))
                            return `<td>${value.toLocaleString()}</td>`
                        if (Number.isFinite(value))
                            return `<td>${value.toFixed(3)}</td>`
                        return `<td>${value}</td>`
                    }).join('')
                    + '</tr>'
            }).join('')

            variables.tableInnerHTML.assign([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                '    <table>',
                '        <thead>',
                '            <tr>',
                this._tableMakerColumns.map(key => `<th>${key}</th>`).join(''),
                '            </tr>',
                '        </thead>',
                '        <tbody>',
                bodyInnerHTML,
                '        </tbody>',
                '    </table>',
                '</body>',
                '</html>'
            ].join('\n'))
        }
    }
}

