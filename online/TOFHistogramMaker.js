import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').Histogram} */
        this._tofHistogram
        variables.tofHistogram.addListener(arg => { this._tofHistogram = arg })
        this._operation = () => {
            // const i = Math.floor(this._randomNumber * this._tofHistogram.binCounts.length)
            // this._tofHistogram.binCounts[i]++
            // variables.histogram.assign(this._tofHistogram)
        }
    }
}

