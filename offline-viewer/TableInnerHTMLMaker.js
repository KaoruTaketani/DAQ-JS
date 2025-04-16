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
        this._tableColumns
        variables.tableColumns.addListener(arg => {
            this._tableColumns = arg
            this._operation()
        })
        this._operation = () => {
            console.log(this._tableColumns)
            const columns = this._tableColumns.split(',')
            const keys = new Set()
            this._tableMetadata.forEach(row => {
                Object.keys(row).forEach(key => {
                    if (columns.includes(key))
                        keys.add(key)
                })
            })
            const headerInnerHTML = '<tr>' + Array.from(keys).map(key => {
                return `<th>${key}</th>`
            }).join('') + '</tr>'
            const bodyInnerHTML = this._tableMetadata.map(row => {
                return '<tr>' + Array.from(keys).map(key => {
                    const cellMap = new Map(Object.entries(row))
                    return `<td>${cellMap.get(key)}</td>`
                }).join('') + '</tr>'
            }).join('')
            console.log('table done')
            variables.clientInnerHTML.assign([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                '    <table>',
                '        <thead>',
                headerInnerHTML,
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

