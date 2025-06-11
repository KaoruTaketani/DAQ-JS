import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogram
        variables.histogram.addListener(arg => {
            this._histogram = arg
            this._operation()
        })
        this._operation = () => {
            const total = this._histogram.binCounts.reduce((prev, curr) => prev + curr, 0)

            if (total === 0) return
            variables.total.assign(total)
        }
    }
}

