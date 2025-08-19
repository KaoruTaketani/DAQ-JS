import Operator from '../14/Operator.js'
import sum from '../lib/sum.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._preset
        variables.preset.addListener(arg => { this._preset = arg })
        this._histogram
        variables.histogram.addListener(arg => {
            this._histogram = arg
            this._operation()
        })
        this._operation = () => {
            if (sum(this._histogram.binCounts) < this._preset) return

            variables.randomNumberGeneratorIsBusy.assign(false)
        }
    }
}

