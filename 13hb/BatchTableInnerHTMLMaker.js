import Operator from '../13/Operator.js'
import sum from '../lib/sum.js'
import throttle from '../lib/throttle.js'

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
            this._batchParams.forEach(params => {
                new URLSearchParams(params).forEach((value, key) => {
                    tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                })
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

