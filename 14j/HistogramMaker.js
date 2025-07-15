import Operator from '../14/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogram
        variables.histogram.addListener(arg => { this._histogram = arg })
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            const dx = (3 + 3) / this._histogram.binCounts.length,
                o = this._randomNumber + 3.0,
                i = Math.floor(o / dx)

            // console.log(`${dx}, ${this._randomNumber},${typeof this._randomNumber} ${o}, ${o / dx}, ${i}`)
            if (i >= this._histogram.binCounts.length) return
            if (i < 0) return
            this._histogram.binCounts[i]++
            variables.histogram.assign(this._histogram)
        }
    }
}

