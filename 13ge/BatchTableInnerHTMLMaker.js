import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchLimits
        variables.batchLimits.addListener(arg => { this._batchLimits = arg })
        this._batchParams
        variables.batchParams.addListener(arg => {
            this._batchParams = arg
            this._operation()
        })
        this._operation = () => {
            let tbody = ''
            for (const [key, value] of this._batchParams.entries()) {
                if (this._batchLimits.has(key)) {
                    const limits = this._batchLimits.get(key)
                    if (Array.isArray(limits)) {
                        // console.log(key, value, limits, typeof limits[0])

                        if (limits.length === 0) {
                            tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                        } else {
                            if (typeof limits[0] === 'string') {
                                // console.log(key, value, limits.includes(value))
                                if (limits.includes(value)) {
                                    tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                                } else {
                                    tbody += `<tr><td>${key}</td><td style="background-color:red">${value}</td></tr>\n`
                                    variables.batchProcessorState.assign('busy')
                                }
                            }
                            if (typeof limits[0] === 'number') {
                                // console.log(key, value, limits, limits.length, parseFloat(value))
                                if (limits.length !== 2) {
                                    tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                                } else {
                                    const f = parseFloat(value)
                                    if (!Number.isNaN(f) && limits[0] < f && f < limits[1]) {
                                        tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                                    } else {
                                        tbody += `<tr><td>${key}</td><td style="background-color:red">${value}</td></tr>\n`
                                        variables.batchProcessorState.assign('busy')
                                    }
                                }
                            }
                        }
                    } else {
                        tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                    }
                } else {
                    tbody += `<tr><td style="background-color:red">${key}</td><td>${value}</td></tr>\n`
                    variables.batchProcessorState.assign('busy')
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

