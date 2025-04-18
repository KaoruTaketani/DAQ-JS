import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {object[]} */
        this._tableMetadata
        variables.tableMetadata.prependListener(arg => { this._tableMetadata = arg })
        /** @type {string} */
        this._tableSelectedColumns
        variables.tableSelectedColumns.addListener(arg => {
            this._tableSelectedColumns = arg
            this._operation()
        })
        this._operation = () => {
            /** @type {string[]} */
            const selectedColumns = this._tableSelectedColumns.split(',')

            const bodyInnerHTML = this._tableMetadata.map(row => {
                return '<tr>'
                    + selectedColumns.map(key => {
                        const cellMap = new Map(Object.entries(row)),
                            value = cellMap.get(key)
                        if (Number.isInteger(value))
                            return `<td>${value.toLocaleString()}</td>`
                        if(Number.isFinite(value))
                            return `<td>${value.toFixed(3)}</td>`
                        return `<td>${value}</td>`
                    }).join('')
                    + '</tr>'
            }).join('')

            variables.clientInnerHTML.assign([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                '    <table>',
                '        <thead>',
                '            <tr>',
                selectedColumns.map(key => `<th>${key}</th>`).join(''),
                '            </tr>',
                '        </thead>',
                '        <tbody>',
                bodyInnerHTML,
                '        </tbody>',
                '    </table>',
                `    <script type="module" src="./AttrTable.js">`,
                `    </script>`,
                '</body>',
                '</html>'
            ].join('\n'))
        }
    }
}

