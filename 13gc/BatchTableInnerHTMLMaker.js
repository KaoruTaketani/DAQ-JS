import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchParams
        variables.batchParams.addListener(arg => {
            this._batchParams = arg
            this._operation()
        })
        this._operation = () => {
            let tbody = ''
            Array.from(this._batchParams.entries()).forEach(params => {
                tbody += `<tr><td>${params[0]}</td><td>${params[1]}</td></tr>\n`
            })

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

