import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchResolve
        variables.batchResolve.addListener(arg => { this._batchResolve = arg })
        this._batchParams
        variables.batchParams.addListener(arg => {
            this._batchParams = arg
            this._operation()
        })
        this._operation = () => {
            let tbody = ''
            for (const [key, value] of this._batchParams.entries()) {
                if (this._batchResolve.has(key)) {
                    tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                } else {
                    tbody += `<tr><td style="background-color:red">${key}</td><td>${value}</td></tr>\n`
                }
            }

            variables.batchTableInnerHTML.assign([
                '<thead>',
                '<tr><th>key</th><th>value</th></tr>',
                '</thead>',
                '<tbody>',
                tbody,
                '</tbody>'
            ].join('\n'))
        }
    }
}

