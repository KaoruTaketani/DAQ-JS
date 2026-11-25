import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchProcessorState
        variables.batchProcessorState.addListener(arg => { this._batchProcessorState = arg })
        this._batchLimits
        variables.batchLimits.addListener(arg => { this._batchLimits = arg })
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
            let failed = false
            let i = 0
            for (const [key, value] of this._batchParams.entries()) {
                if (this._batchLimits.has(key)) {
                    const limits = this._batchLimits.get(key)
                    if (Array.isArray(limits)) {
                        // console.log(key, value, limits, typeof limits[0])

                        if (limits.length === 0) {
                            if (this._batchIndex === i) {
                                tbody += `<tr style="color:red"><td>${key}</td><td>${value}</td></tr>\n`
                            } else {
                                tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                            }
                        } else {
                            if (typeof limits[0] === 'string') {
                                // console.log(key, value, limits.includes(value))
                                if (limits.includes(value)) {
                                    if (this._batchIndex === i) {
                                        tbody += `<tr style="color:red"><td>${key}</td><td>${value}</td></tr>\n`
                                    } else {
                                        tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                                    }
                                } else {
                                    tbody += `<tr><td>${key}</td><td style="background-color:red">${value}</td></tr>\n`
                                    failed = true
                                }
                            }
                            if (typeof limits[0] === 'number') {
                                // console.log(key, value, limits, limits.length, parseFloat(value))
                                if (limits.length !== 2) {
                                    if (this._batchIndex === i) {
                                        tbody += `<tr style="color:red"><td>${key}</td><td>${value}</td></tr>\n`
                                    } else {
                                        tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                                    }
                                } else {
                                    const f = parseFloat(value)
                                    if (!Number.isNaN(f) && limits[0] < f && f < limits[1]) {
                                        if (this._batchIndex === i) {
                                            tbody += `<tr style="color:red"><td>${key}</td><td>${value}</td></tr>\n`
                                        } else {
                                            tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                                        }
                                    } else {
                                        tbody += `<tr><td>${key}</td><td style="background-color:red">${value}</td></tr>\n`
                                        failed = true
                                    }
                                }
                            }
                        }
                    } else {
                        if (this._batchIndex === i) {
                            tbody += `<tr style="color:red"><td>${key}</td><td>${value}</td></tr>\n`
                        } else {
                            tbody += `<tr><td>${key}</td><td>${value}</td></tr>\n`
                        }
                    }
                } else {
                    tbody += `<tr><td style="background-color:red">${key}</td><td>${value}</td></tr>\n`
                    failed = true
                }
                i++
            }

            if (this._batchProcessorState === 'idle'
                || this._batchProcessorState === 'error')
                variables.batchProcessorState.assign(failed ? 'error' : 'idle')

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

