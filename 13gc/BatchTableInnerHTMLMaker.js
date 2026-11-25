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
        this._batchIndex
        variables.batchIndex.addListener(arg => {
            this._batchIndex = arg
            this._operation()
        })
        this._operation = () => {
            let tbody = ''
            let i = 0
            for (const [key, value] of this._batchParams.entries()) {
                if (i === this._batchIndex) {
                    tbody += `<tr style="color: red"><td>${key}</td><td>${value}</td></tr>\n`
                } else {
                    tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                }
                i++
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

