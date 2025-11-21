import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._tofMaxInMilliseconds
        variables.tofMaxInMilliseconds.addListener(arg => {
            this._tofMaxInMilliseconds = arg
            this._operation()
        })
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.addListener(arg => {
            this._frequencyVectorLength = arg
            this._operation()
        })
        /** @type {number} */
        this._miezeFrequencyInKilohertz
        variables.miezeFrequencyInKilohertz.addListener(arg => {
            this._miezeFrequencyInKilohertz = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._tofMaxInMilliseconds) return
            if (!this._frequencyVectorLength) return
            if (!this._miezeFrequencyInKilohertz) return

            const cycleInMilliseconds = 1 / this._miezeFrequencyInKilohertz
            const binWidthInMillisecond = cycleInMilliseconds / this._frequencyVectorLength
            const numBins = Math.ceil(this._tofMaxInMilliseconds / binWidthInMillisecond)//,
            // unit must be nanoseconds as used in maker
            // dt = this._tofMaxInMilliseconds * 1_000_000 / numBins

            variables.tofHistogram.assign({
                binCounts: new Array(numBins).fill(0),
                binLimits: [0, this._tofMaxInMilliseconds * 1_000_000]
            })
            variables.tofHistogramWorker.assign({
                binCounts: new Array(numBins).fill(0),
                binLimits: [0, this._tofMaxInMilliseconds * 1_000_000]
            })
        }
    }
}
