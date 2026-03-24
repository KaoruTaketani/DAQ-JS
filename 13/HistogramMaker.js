import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogramBinCounts
        variables.histogramBinCounts.addListener(arg => { this._histogramBinCounts = arg })
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            const i = Math.floor((this._randomNumber * this._histogramBinCounts.length))
            this._histogramBinCounts[i]++
            variables.histogramBinCounts.assign(this._histogramBinCounts)
        }
    }
}

