import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./ServerVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {object[]} */
        this._tableMetadata
        variables.tableMetadata.prependListener(arg => { this._tableMetadata = arg })
        /** @type {string} */
        this._clientUrl
        variables.clientUrl.prependListener(arg => { this._clientUrl = arg })
        /** @type {string} */
        this._message
        variables.message.prependListener(arg => { this._message = arg })
        /** @type {import('ws').WebSocket} */
        this._clientWebSocket
        variables.clientWebSocket.addListener(arg => {
            this._clientWebSocket = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._clientUrl.endsWith('/TableClient.js')) return

            /** @type {string[]} */
            const selectedColumns = this._message.split(',')

            const bodyInnerHTML = this._tableMetadata.map(row => {
                return '<tr>'
                    + selectedColumns.map(key => {
                        const cellMap = new Map(Object.entries(row)),
                            value = cellMap.get(key)
                        if (Number.isInteger(value))
                            return `<td>${value.toLocaleString()}</td>`
                        if (Number.isFinite(value))
                            return `<td>${value.toFixed(3)}</td>`
                        return `<td>${value}</td>`
                    }).join('')
                    + '</tr>'
            }).join('')

            this._clientWebSocket.send([
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
                '</body>',
                '</html>'
            ].join('\n'))
        }
    }
}

