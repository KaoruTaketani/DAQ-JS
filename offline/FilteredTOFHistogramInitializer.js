import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.prependListener(arg => { this._frequencyVectorLength = arg })
        /** @type {number} */
        this._miezeFrequencyInKilohertz
        variables.miezeFrequencyInKilohertz.addListener(arg => {
            this._miezeFrequencyInKilohertz = arg
            this._operation()
        })
        this._operation = () => {
            /*
             * bin size is split to frequencyVectorLength bins per one MIEZE cycle
             * 0 to 80 msec, time is in nsec
             * as neutronRate is just accumulate, bin width is equal to mieze cycle
             */
            const cycleInSeconds = 1 / (this._miezeFrequencyInKilohertz * 1000)
            const binWidthInSecond = cycleInSeconds / this._frequencyVectorLength
            const nbins = Math.ceil(0.08 / binWidthInSecond)
            variables.filteredTOFHistogram.assign({
                binLimits: [0, 80_000_000],
                binCounts: new Array(nbins).fill(0)
            })
        }
    }
}
